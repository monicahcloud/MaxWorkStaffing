import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import { env } from "@/env";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripeCustomerId = user.privateMetadata.stripeCustomerId as
    | string
    | undefined;

  if (!stripeCustomerId) {
    const setupSession = await stripe.checkout.sessions.create({
      mode: "setup",
      customer_email: user.emailAddresses[0].emailAddress,
      success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/confirm`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
      metadata: { userId: user.id },
    });
    return NextResponse.json({ url: setupSession.url });
  }

  const schedule = await stripe.subscriptionSchedules.create({
    customer: stripeCustomerId,
    start_date: "now",
    end_behavior: "release",
    metadata: { userId: user.id },
    phases: [
      {
        items: [{ price: env.STRIPE_PRICE_ID_TRIAL, quantity: 1 }],
        iterations: 1,
      },
      {
        items: [{ price: env.STRIPE_PRICE_ID_MONTHLY, quantity: 1 }],
      },
    ],
  });

  const subscription = await stripe.subscriptions.retrieve(
    schedule.subscription as string
  );

  return NextResponse.json({
    message: "Subscription scheduled.",
    subscriptionId: subscription.id,
  });
}
