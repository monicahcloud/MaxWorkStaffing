/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { env } from "@/env";
import { createCheckoutSession } from "@/components/premium/actions";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();
    console.log("🛒 Incoming checkout for plan:", plan);

    let priceId: string | undefined;
    if (plan === "7Day") {
      if (user.privateMetadata.hasUsed7DayAccess) {
        return NextResponse.json(
          { error: "7-Day access can only be purchased once." },
          { status: 403 }
        );
      }
      priceId = env.STRIPE_PRICE_7_DAY_ACCESS; // <-- see note below about name consistency
    } else if (plan === "monthly") {
      priceId = env.STRIPE_PRICE_ID_MONTHLY;
    } else if (plan === "quarterly") {
      priceId = env.STRIPE_PRICE_ID_QUARTERLY;
    } else {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    if (!priceId) {
      console.error("❌ Missing priceId for plan:", plan, {
        monthly: env.STRIPE_PRICE_ID_MONTHLY,
        quarterly: env.STRIPE_PRICE_ID_QUARTERLY,
        sevenDay: env.STRIPE_PRICE_7_DAY_ACCESS,
      });
      return NextResponse.json(
        { error: "Price not configured." },
        { status: 500 }
      );
    }

    const url = await createCheckoutSession(priceId, plan);
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("❌ /api/stripe/checkout failed:", err);
    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// const stripeCustomerId = user.privateMetadata.stripeCustomerId as
//   | string
//   | undefined;

// const session = await stripe.checkout.sessions.create({
//   mode,
//   line_items: [{ price: priceId, quantity: 1 }],
//   customer: stripeCustomerId,
//   customer_email: stripeCustomerId
//     ? undefined
//     : user.emailAddresses[0].emailAddress,
//   success_url: `${env.NEXT_PUBLIC_BASE_URL}/billing/success`,
//   cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
//   metadata: { userId: user.id, plan },
//   ...(mode === "subscription"
//     ? {
//         subscription_data: {
//           metadata: { userId: user.id },
//         },
//       }
//     : {}),
// });
//   const url = await createCheckoutSession(priceId, plan); // Add plan to metadata

//   return NextResponse.json({ url });
// }
