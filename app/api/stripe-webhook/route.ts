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
        await handleSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        ); // New session completed
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id); // Subscription created or updated
        break;
      case "subscription_schedule.updated":
      case "subscription_schedule.released":
        await handleSubscriptionScheduleUpdated(event.data.object);
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

// Handles when a checkout session is completed
async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("handleSessionCompleted");
  const userId = session.metadata?.userId; // Extract userId from session metadata

  if (!userId) {
    throw new Error("User ID is missing in stripe session metadata");
  }
  const client = await clerkClient(); // Clerk client instance

  // ✅ Save customer ID to Clerk
  await client.users.updateUserMetadata(userId, {
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
    await client.users.updateUserMetadata(session.metadata.userId, {
      privateMetadata: {
        hasUsed7DayAccess: true,
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

  if (!userId) {
    throw new Error("User ID is missing in stripe session metadata");
  }

  console.log("📦 Subscription ID:", session.subscription);
  console.log("🧠 Clerk User ID:", userId);
}

// Handles creation or update of a subscription
async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  console.log("handleSubscriptionCreatedOrUpdated");
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const clerkId = subscription.metadata?.userId;
  if (!clerkId) {
    console.warn("⚠️ Metadata userId missing. Looking up by customer ID…");
    throw new Error("Missing Clerk ID in metadata.");
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) {
    throw new Error("User not found for Clerk ID.");
  }

  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    await prisma.userSubscription.upsert({
      where: { clerkId: subscription.metadata?.userId }, // Clerk ID is in metadata
      create: {
        clerkId: subscription.metadata.userId,
        userId: subscription.metadata.userId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,

        stripePlanName: subscription.items.data[0].price.nickname ?? "", // or use product.name via Stripe API if not set
        stripeInterval:
          subscription.items.data[0].price.recurring?.interval ?? "",
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,

        stripePlanName: subscription.items.data[0].price.nickname ?? "",
        stripeInterval:
          subscription.items.data[0].price.recurring?.interval ?? "",
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
async function handleSubscriptionScheduleUpdated(
  schedule: Stripe.SubscriptionSchedule
) {
  const subscription = schedule.subscription;

  if (!subscription) return;

  const subscriptionId =
    typeof subscription === "string" ? subscription : subscription.id;

  const activeSubscription = await stripe.subscriptions.retrieve(
    subscriptionId
  );
  const clerkId = activeSubscription.metadata?.userId;

  if (!clerkId) {
    throw new Error("Missing Clerk ID from subscription schedule.");
  }

  await handleSubscriptionCreatedOrUpdated(subscriptionId); // re-use your logic
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
