// FILE: app/(dashboard)/billing/page.tsx
import React from "react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import SectionTitle from "@/components/SectionTitle";
import BillingPlans from "./BillingPlans";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import Link from "next/link";

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

  let planName = "No Active Plan";
  let renewalText = "";

  if (subscription?.stripePriceId) {
    try {
      const priceInfo = await stripe.prices.retrieve(
        subscription.stripePriceId,
        {
          expand: ["product"],
        }
      );

      planName =
        plan === "trial"
          ? "Trial"
          : (priceInfo.product as Stripe.Product)?.name ?? "Monthly";

      if (subscription.stripeCurrentPeriodEnd) {
        const formattedDate = format(
          new Date(subscription.stripeCurrentPeriodEnd),
          "MMM dd, yyyy"
        );
        renewalText = subscription.stripeCancelAtPeriodEnd
          ? ` — Cancels on ${formattedDate}`
          : ` — Renews on ${formattedDate}`;
      }
    } catch (err) {
      console.error("Failed to fetch Stripe price info:", err);
    }
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        text="Explore Your Benefits"
        subtext={
          subscription?.stripePriceId && subscription.stripeCurrentPeriodEnd
            ? `Current Plan: ${planName} ${renewalText}`
            : "No active plan"
        }
      />

      {subscription?.stripePriceId && subscription.stripeCurrentPeriodEnd && (
        <div className="flex justify-center my-4">
          <ManageSubscriptionButton />
        </div>
      )}

      <div className="text-start mt-8">
        <Link href="/home" className="text-blue-600 hover:underline text-lg">
          ← Back to Dashboard
        </Link>
      </div>

      <BillingPlans subscription={subscription} />
    </main>
  );
}
