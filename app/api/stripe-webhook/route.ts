import { env } from "@/env"; // Environment variables including the Stripe webhook secret
import prisma from "@/lib/prisma"; // Prisma ORM instance for database interactions
import stripe from "@/lib/stripe"; // Stripe SDK instance
import { clerkClient } from "@clerk/nextjs/server"; // Clerk SDK for user management
import { NextRequest } from "next/server"; // Type for Next.js API route request
import Stripe from "stripe"; // Stripe types
// Webhook handler for POST requests from Stripe
export async function POST(req: NextRequest) {
  try {
    // Read the raw body payload from the request
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature"); // Retrieve Stripe signature from headers

    // If signature is missing, respond with error
    if (!signature) {
      return new Response("Signature is missing", { status: 400 });
    }
    console.log("🧪 Raw body:", payload);

    // Verify the event using Stripe's webhook secret
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`Received event: ${event.type}`, event.data.object);

    // Handle event based on type
    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object); // New session completed
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

// Handles when a checkout session is completed
async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId; // Extract userId from session metadata
  const client = await clerkClient(); // Clerk client instance

  if (!userId) {
    throw new Error("User ID is missing in session metadata");
  }

  // Update Clerk private metadata with Stripe customer ID
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  });
}

// Handles creation or update of a subscription
async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId); // Get full subscription object

  // If subscription is active, trialing, or past due, upsert record into DB
  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.metadata.userId,
      },
      create: {
        userId: subscription.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } else {
    // If subscription is not active, remove it from the DB
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
  }
}

// Handles subscription cancellation
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.userSubscription.deleteMany({
    where: {
      stripeCustomerId: subscription.customer as string,
    },
  });
}
