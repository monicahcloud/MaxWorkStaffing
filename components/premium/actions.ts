"use server";

import { env } from "@/env";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

// This function creates a Stripe Checkout Session for a subscription
export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    // Redirect URLs after successful or canceled checkout
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer_email: user.emailAddresses[0].emailAddress,
    subscription_data: {
      metadata: {
        userId: user.id,
      },
    },
    // Display custom text about terms of service during checkout
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read MaxResumeBuilder's [terms of services](${env.NEXT_PUBLIC_BASE_URL}/tos) and agree to them.`,
      },
    },
    // Require the user to accept terms of service before subscribing
    consent_collection: {
      terms_of_service: "required",
    },
  });
  // If Stripe doesn’t return a valid URL, throw an error
  if (!session.url) {
    throw new Error("Failed to create checkout session.");
  }

  // Return the Checkout URL so the frontend can redirect the user
  return session.url;
}

//
// async function createCheckoutSession(
//   lineItems: { price: string; quantity: number }[]
// ) {
//   const user = await currentUser();

//   if (!user) {
//     throw new Error("Unauthorized");
//   }

//   // Try to get the Stripe customer ID from the user's private metadata in Clerk
//   const stripeCustomerId = user.privateMetadata.stripeCustomerId as
//     | string
//     | undefined;
//   console.log("stripeCustomerId", stripeCustomerId);
//   // Create the Stripe Checkout Session
//   const session = await stripe.checkout.sessions.create({
//     mode: "subscription", // This is for recurring subscriptions
//     // line_items: [{ price: priceId, quantity: 1 }], // The price plan ID and quantity
//     line_items: lineItems,
//     // Redirect URLs after successful or canceled checkout
//     success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
//     cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,

//     // Attach the existing Stripe customer if available, or use user's email if new
//     customer: stripeCustomerId,
//     customer_email: stripeCustomerId
//       ? undefined // If customer exists, don't pass email
//       : user.emailAddresses[0].emailAddress, // Otherwise, use Clerk email

//     // Metadata to help link this session to a user in Stripe and webhooks
//     metadata: {
//       userId: user.id, // Add Clerk userId to the session metadata
//     },
//     subscription_data: {
//       metadata: {
//         userId: user.id, // Add the same metadata to the resulting subscription
//       },
//     },

//     // Display custom text about terms of service during checkout
//     custom_text: {
//       terms_of_service_acceptance: {
//         message: `I have read MaxResumeBuilder's [terms of services](${env.NEXT_PUBLIC_BASE_URL}/tos) and agree to them.`,
//       },
//     },
//     // Require the user to accept terms of service before subscribing
//     consent_collection: {
//       terms_of_service: "required",
//     },
//   });

//   // If Stripe doesn’t return a valid URL, throw an error
//   if (!session.url) {
//     throw new Error("Failed to create checkout session.");
//   }

//   // Return the Checkout URL so the frontend can redirect the user
//   return session.url;
// }

// export default createCheckoutSession;
