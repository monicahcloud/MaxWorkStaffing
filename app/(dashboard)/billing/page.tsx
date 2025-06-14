// // app/(dashboard)/billing/page.tsx
// import React from "react";
// import { Metadata } from "next";
// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import stripe from "@/lib/stripe";
// import Stripe from "stripe";
// import { format } from "date-fns";
// import SectionTitle from "@/components/SectionTitle";
// import BillingPlans from "./BillingPlans";

// export const metadata: Metadata = {
//   title: "All Subscription Features",
// };

// export default async function BillingPage() {
//   const { userId } = await auth();
//   if (!userId) return null;

//   const subscription = await prisma.userSubscription.findUnique({
//     where: { userId },
//   });

//   const priceInfo = subscription
//     ? await stripe.prices.retrieve(subscription.stripePriceId, {
//         expand: ["product"],
//       })
//     : null;

//   return (
//     <main className="px-4 sm:px-6 lg:px-8 py-10">
//       <SectionTitle
//         text="Explore Your Benefits"
//         subtext={`Current Plan: ${
//           priceInfo ? (priceInfo.product as Stripe.Product).name : "Monthly"
//         }${
//           subscription
//             ? subscription.stripeCancelAtPeriodEnd
//               ? ` — Cancels on ${format(
//                   new Date(subscription.stripeCurrentPeriodEnd),
//                   "MMM dd, yyyy"
//                 )}`
//               : ` — Renews on ${format(
//                   new Date(subscription.stripeCurrentPeriodEnd),
//                   "MMM dd, yyyy"
//                 )}`
//             : ""
//         }`}
//       />
//       <BillingPlans subscription={subscription} />
//     </main>
//   );
// }
import React from "react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

import SectionTitle from "@/components/SectionTitle";
import BillingPlans from "./BillingPlans";
import { getUserSubscriptionLevel } from "@/lib/subscription"; // Adjust import path if needed

export const metadata: Metadata = {
  title: "All Subscription Features",
};

export default async function BillingPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const plan = await getUserSubscriptionLevel(userId);

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  const planName =
    plan === "trial"
      ? "Trial"
      : priceInfo
      ? (priceInfo.product as Stripe.Product).name
      : "Monthly"; // Fallback

  const renewalText =
    subscription && plan !== "trial"
      ? subscription.stripeCancelAtPeriodEnd
        ? ` — Cancels on ${format(
            new Date(subscription.stripeCurrentPeriodEnd),
            "MMM dd, yyyy"
          )}`
        : ` — Renews on ${format(
            new Date(subscription.stripeCurrentPeriodEnd),
            "MMM dd, yyyy"
          )}`
      : "";
  console.log("in billiing page", subscription, planName, renewalText);
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        text="Explore Your Benefits"
        subtext={`Current Plan: ${planName}${renewalText}`}
      />
      <BillingPlans subscription={subscription} />
    </main>
  );
}
