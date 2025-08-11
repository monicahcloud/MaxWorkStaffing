import { env } from "@/env"; //
import prisma from "@/lib/prisma"; //
import stripe from "@/lib/stripe"; //
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET() {
  console.log("✅ Stripe webhook GET hit");
  return new Response("Webhook is connected", { status: 200 });
}

export async function POST(req: NextRequest) {
  console.log("📩 Incoming stripe webhook");

  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Stripe signature is missing", { status: 400 });
    }
    console.log("🧪 Raw body:", payload);

    // Verify the event using Stripe's webhook secret
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`Received stripe event: ${event.type}`, event.data.object);
    console.log("✅ Stripe Webhook Secret:", !!env.STRIPE_WEBHOOK_SECRET);

    // Handle event based on type
    switch (event.type) {
      case "checkout.session.completed":
        console.log("🎯 Event is checkout.session.completed");
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("🎯 Session metadata:", session.metadata);
        await handleSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        ); // New session completed
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id); // Subscription created or updated
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object); // Subscription deleted
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return new Response("Event received", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
async function getDbUserOrNull(clerkId: string) {
  return prisma.user.findUnique({ where: { clerkId } });
}
// Handles when a checkout session is completed
async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  const clerkId = session.metadata?.userId; // Extract userId from session metadata

  if (!clerkId) {
    throw new Error("User ID is missing in stripe session metadata");
  }
  const dbUser = await getDbUserOrNull(clerkId);
  if (!dbUser) {
    console.warn("⚠️ DB user not found – ignoring session", { clerkId });
    return;
  }
  // ✅ Save customer ID to Clerk
  (await clerkClient()).users.updateUserMetadata(clerkId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  });
  // ✅ 7-Day access logic
  if (
    session.mode === "payment" &&
    session.metadata?.plan === "7Day" &&
    session.metadata.userId
  ) {
    const sess = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price"],
    });
    // Compute 7-day expiration

    const linePriceId = sess.line_items?.data?.[0]?.price?.id ?? null;
    const sevenDayPriceId =
      linePriceId ?? process.env.STRIPE_PRICE_7_DAY_ACCESS ?? null;
    // const sevenDayPriceId = process.env.STRIPE_PRICE_7_DAY_ACCESS ?? null;
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // Upsert the user's "subscription" record for 7-day access
    await prisma.userSubscription.upsert({
      // You marked clerkId as @unique in your schema; using it is fine here
      where: { clerkId },
      create: {
        clerkId,
        userId: dbUser.id,
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: null, // one-time purchase, not a sub
        stripePriceId: sevenDayPriceId,
        stripeCurrentPeriodEnd: expires, // when access ends
        stripeCancelAtPeriodEnd: true, // semantic for one-time
        stripePlanName: "7-Day Access",
        stripeInterval: "one_time",
        status: "active",
      },
      update: {
        stripeCustomerId: (session.customer as string) ?? null,
        stripePriceId: sevenDayPriceId,
        stripeCurrentPeriodEnd: expires,
        stripeCancelAtPeriodEnd: true,
        stripePlanName: "7-Day Access",
        stripeInterval: "one_time",
        status: "active",
      },
    });

    (await clerkClient()).users.updateUserMetadata(session.metadata.userId, {
      privateMetadata: {
        hasUsed7DayAccess: true,
        stripeCustomerId: (session.customer as string) ?? undefined,
      },
    });
    console.log("✅ Marked user as having used 7-Day Access");
  }

  // ✅ Process subscription using the ID from session
  if (session.subscription) {
    await handleSubscriptionCreatedOrUpdated(session.subscription as string);
  } else {
    console.warn("No subscription found in session");
  }

  if (!clerkId) {
    throw new Error("User ID is missing in stripe session metadata");
  }
}

// Handles creation or update of a subscription
async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const clerkId = subscription.metadata?.userId;
  if (!clerkId) {
    console.warn("⚠️ Metadata userId missing. Looking up by customer ID…");
    throw new Error("Missing Clerk ID in metadata.");
  }
  const dbUser = await getDbUserOrNull(clerkId);
  if (!dbUser) {
    console.warn("⚠️ DB user not found – ignoring subscription", {
      clerkId,
      subscriptionId,
    });
    return;
  }
  // optional: keep customer id on User in sync
  if (subscription.customer) {
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { stripeCustomerId: subscription.customer as string },
    });
  }

  const item = subscription.items.data[0];
  const price = item?.price;
  const product = price?.product as Stripe.Product | null;
  const planName = price?.nickname ?? product?.name ?? null;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    throw new Error("User not found for Clerk ID.");
  }

  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    console.log("💾 Creating subscription with:", {
      userId: user.id,
      clerkId: user.clerkId,
      stripeSubscriptionId: subscription.id,
    });

    await prisma.userSubscription.upsert({
      where: { stripeSubscriptionId: subscription.id },
      create: {
        clerkId,
        userId: user.id,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
        stripePlanName: subscription.items.data[0].price.nickname ?? planName,
        stripeInterval:
          subscription.items.data[0].price.recurring?.interval ?? "",
        status: subscription.status,
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
        stripePlanName: subscription.items.data[0].price.nickname ?? planName,
        stripeInterval:
          subscription.items.data[0].price.recurring?.interval ?? "",
        status: subscription.status,
      },
    });
  } else {
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
  }
}

// Handles subscription cancellation
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("handleSubscriptionDeleted");
  await prisma.userSubscription.deleteMany({
    where: {
      stripeCustomerId: subscription.customer as string,
    },
  });
}
