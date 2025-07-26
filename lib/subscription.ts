import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "7Day" | "monthly" | "quarterly";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    console.log("🔍 Subscription record for user:", userId);
    console.log("➡️ subscription:", subscription);

    if (
      !subscription ||
      !subscription.stripeCurrentPeriodEnd ||
      subscription.stripeCurrentPeriodEnd < new Date()
    ) {
      console.log("❌ No active subscription — returning 'free'");
      return "free";
    }

    console.log(
      "✅ stripeCurrentPeriodEnd:",
      subscription.stripeCurrentPeriodEnd
    );
    console.log("📦 stripePriceId:", subscription.stripePriceId);
    console.log(
      "📦 Expected STRIPE_PRICE_ID_QUARTERLY:",
      process.env.STRIPE_PRICE_ID_QUARTERLY
    );

    if (subscription.stripePriceId === process.env.STRIPE_PRICE_ID_QUARTERLY) {
      return "quarterly";
    }

    // Add any other plan logic here
    if (subscription.stripePriceId === process.env.STRIPE_PRICE_ID_MONTHLY) {
      return "monthly";
    }

    if (
      subscription.stripePriceId === process.env.STRIPE_PRICE_ID_7_DAY_ACCESS
    ) {
      return "7Day";
    }

    console.warn(
      `⚠️ Unknown stripePriceId for user ${userId}: ${subscription.stripePriceId}`
    );
    return "free";
  }
);

// Add this to centralize access check logic
export function hasProAccess(level: SubscriptionLevel): boolean {
  return level === "quarterly" || level === "7Day" || level === "monthly";
}
