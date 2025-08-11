import prisma from "./prisma";

export type SubscriptionLevel = "free" | "7Day" | "monthly" | "quarterly";

export async function getUserSubscriptionLevel(
  userId: string
): Promise<SubscriptionLevel> {
  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  if (
    !subscription ||
    !subscription.stripeCurrentPeriodEnd ||
    subscription.stripeCurrentPeriodEnd < new Date()
  ) {
    console.log("❌ No active subscription — returning 'free'");
    return "free";
  }

  // Recognize 7-Day by interval/plan name OR price id
  const planNameLc = subscription.stripePlanName?.toLowerCase() ?? "";
  const isSevenDayByName = /7[\s\-]?day/.test(planNameLc);
  if (subscription.stripeInterval === "one_time" || isSevenDayByName) {
    return "7Day";
  }

  // --- Price ID-based detection ---
  const id = subscription.stripePriceId ?? "";

  if (id && id === process.env.STRIPE_PRICE_ID_QUARTERLY) {
    return "quarterly";
  }
  if (id && id === process.env.STRIPE_PRICE_ID_MONTHLY) {
    return "monthly";
  }
  if (id && id === process.env.STRIPE_PRICE_7_DAY_ACCESS) {
    return "7Day";
  }

  // --- Fallbacks when priceId/envs are missing ---
  if (planNameLc.includes("quarter")) return "quarterly";
  if (planNameLc.includes("month")) return "monthly";

  console.warn(
    `⚠️ Unknown stripePriceId for user ${userId}: ${subscription.stripePriceId} (planName="${subscription.stripePlanName}", interval="${subscription.stripeInterval}")`
  );
  return "free";
}

// Add this to centralize access check logic
export function hasProAccess(level: SubscriptionLevel): boolean {
  return level === "quarterly" || level === "7Day" || level === "monthly";
}
