"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function createCheckoutSession(priceId: string, plan: string) {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const customerId = user.privateMetadata.stripeCustomerId as
    | string
    | undefined;

  // IMPORTANT: 7-Day is 'payment' (one-time), Monthly/Quarterly is 'subscription'
  const mode: "payment" | "subscription" =
    plan === "7Day" ? "payment" : "subscription";

  const session = await stripe.checkout.sessions.create({
    customer: customerId, // Stripe handles guest checkout if this is undefined
    customer_email: customerId
      ? undefined
      : user.emailAddresses[0].emailAddress,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: mode,
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    metadata: {
      userId: user.id, // This is the Clerk ID we use in the Webhook
      plan: plan, // "7Day", "monthly", or "quarterly"
    },
    // For subscriptions, we want to collect usage/details, but
    // for one-time payments, we can be more flexible.
    billing_address_collection: "auto",
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
}
