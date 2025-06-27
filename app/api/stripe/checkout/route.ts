import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { env } from "@/env";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await req.json();

  let priceId: string | undefined;

  if (plan === "annual") {
    priceId = env.STRIPE_PRICE_ID_ANNUAL;
  } else if (plan === "14Day") {
    priceId = env.STRIPE_PRICE_ID_TRIAL;
  } else {
    return NextResponse.json(
      { error: "Invalid plan selected" },
      { status: 400 }
    );
  }

  const stripeCustomerId = user.privateMetadata.stripeCustomerId as
    | string
    | undefined;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer: stripeCustomerId,
    customer_email: stripeCustomerId
      ? undefined
      : user.emailAddresses[0].emailAddress,
    success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
    metadata: { userId: user.id },
    subscription_data: {
      metadata: { userId: user.id },
    },
  });

  return NextResponse.json({ url: session.url });
}
