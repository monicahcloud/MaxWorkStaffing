"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

// This function creates a Stripe Checkout Session for a subscription
export async function createCheckoutSession(
  priceId: string,
  plan: "7Day" | "monthly" | "quarterly"
) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const isSubscription = plan !== "7Day";
  let stripeCustomerId = user.privateMetadata?.stripeCustomerId as
    | string
    | undefined;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      metadata: {
        userId: user.id,
      },
    });

    stripeCustomerId = customer.id;
    // Save it to Clerk
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        stripeCustomerId,
      },
    });
  }
  const session = await stripe.checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer: stripeCustomerId,
    customer_email: stripeCustomerId
      ? undefined
      : user.emailAddresses[0].emailAddress,
    metadata: {
      userId: user.id,
      plan,
    },
    ...(isSubscription && {
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
    }),
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read MaxResumeBuilder's [terms of services](${env.NEXT_PUBLIC_BASE_URL}/tos) and agree to them.`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session.");
  }

  return session.url;
}
