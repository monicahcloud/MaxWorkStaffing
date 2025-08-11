// FILE: app/(dashboard)/billing/page.tsx
export const dynamic = "force-dynamic"; // avoid stale cache

import React from "react";
import { Metadata } from "next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import SectionTitle from "@/components/SectionTitle";
import BillingPlans from "./BillingPlans";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import Link from "next/link";
import { env } from "@/env";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "All Subscription Features",
};

export default async function BillingPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  // Clerk user (for hasUsed7DayAccess)
  const user = await (await clerkClient()).users.getUser(clerkId);
  const hasUsed7DayAccess =
    (user.privateMetadata?.hasUsed7DayAccess as boolean) ?? false;

  // Resolve DB user (so we can query by either key)
  const dbUser = await prisma.user.findUnique({ where: { clerkId } });

  // Find the most recent subscription row by clerkId OR userId
  const subscription = await prisma.userSubscription.findFirst({
    where: {
      OR: [{ clerkId }, ...(dbUser?.id ? [{ userId: dbUser.id }] : [])],
    },
    orderBy: { updatedAt: "desc" },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCancelAtPeriodEnd: true,
      stripePriceId: true,
      stripeInterval: true,
      stripePlanName: true,
    },
  });

  // Compute header text similar to SuccessPage
  let planName = "No Active Plan";
  let renewalText = "";

  // Only look up Stripe price name for non 7-Day subs
  let priceInfo: Stripe.Price | null = null;
  const ends = subscription?.stripeCurrentPeriodEnd
    ? new Date(subscription.stripeCurrentPeriodEnd)
    : null;
  const isActive =
    !!ends && !isNaN(ends.getTime()) && ends.getTime() > Date.now();

  // 7-day heuristics
  const priceIds = {
    monthly: env.STRIPE_PRICE_ID_MONTHLY!,
    quarterly: env.STRIPE_PRICE_ID_QUARTERLY!,
    sevenDay: env.STRIPE_PRICE_7_DAY_ACCESS!,
  };
  const id = subscription?.stripePriceId ?? "";
  const isSevenDay =
    !!subscription &&
    (id === priceIds.sevenDay ||
      subscription.stripeInterval === "one_time" ||
      (subscription.stripePlanName ?? "").toLowerCase().includes("7-day"));

  if (subscription && isActive) {
    if (isSevenDay) {
      planName = "7-Day Access";
      renewalText = ends ? `— Ends on ${format(ends, "MMM dd, yyyy")}` : "";
    } else {
      // fetch the product name (best-effort)
      if (subscription.stripePriceId) {
        try {
          priceInfo = await stripe.prices.retrieve(subscription.stripePriceId, {
            expand: ["product"],
          });
        } catch (e) {
          console.error("Failed to retrieve Stripe price:", e);
        }
      }
      planName =
        id === priceIds.monthly
          ? "Monthly Plan"
          : id === priceIds.quarterly
          ? "Quarterly Plan"
          : (priceInfo?.product as Stripe.Product | undefined)?.name ??
            "Active Plan";

      renewalText = subscription.stripeCancelAtPeriodEnd
        ? ends
          ? `— Cancels on ${format(ends, "MMM dd, yyyy")}`
          : ""
        : ends
        ? `— Renews on ${format(ends, "MMM dd, yyyy")}`
        : "";
    }
  }

  // Only show Manage button for true subscriptions (not 7-Day)
  const showManage =
    subscription &&
    isActive &&
    !isSevenDay &&
    (id === priceIds.monthly || id === priceIds.quarterly);

  // Serialize date for the client component
  const subForClient = subscription
    ? {
        ...subscription,
        stripeCurrentPeriodEnd: subscription.stripeCurrentPeriodEnd
          ? subscription.stripeCurrentPeriodEnd.toISOString()
          : null,
      }
    : null;

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-10">
      <SectionTitle
        text="Explore Your Benefits"
        subtext={
          subscription && isActive
            ? `Current Plan: ${planName} ${renewalText}`
            : "No active plan"
        }
      />

      {showManage && (
        <div className="flex justify-center my-4">
          <ManageSubscriptionButton />
        </div>
      )}

      <div className="text-start mt-8">
        <Link href="/home" className="text-blue-600 hover:underline text-lg">
          ← Back to Dashboard
        </Link>
      </div>

      <BillingPlans
        subscription={subForClient}
        hasUsed7DayAccess={hasUsed7DayAccess}
        priceIds={priceIds}
      />
    </main>
  );
}
