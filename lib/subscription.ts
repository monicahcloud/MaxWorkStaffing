// lib/subscription.ts
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "7Day" | "monthly" | "quarterly";

export async function getUserSubscriptionLevel(
  userId: string,
): Promise<SubscriptionLevel> {
  const subscription = await prisma.userSubscription.findFirst({
    where: {
      OR: [{ userId }, { clerkId: userId }],
    },
    orderBy: { updatedAt: "desc" },
  });

  const now = new Date();
  if (
    !subscription ||
    !subscription.stripeCurrentPeriodEnd ||
    subscription.stripeCurrentPeriodEnd < now
  ) {
    return "free";
  }

  const id = subscription.stripePriceId ?? "";

  // Exact Price ID Mapping
  if (id === "price_1RoweAGBcKoQWKay2PfMDVpa") return "quarterly";
  if (id === "price_1RowdBGBcKoQWKayytw2IYt7") return "monthly";
  if (id === "price_1Rowc1GBcKoQWKayrNZ1WhWb") return "7Day";

  // Fallback to Plan Name checks
  const planNameLc = subscription.stripePlanName?.toLowerCase() ?? "";
  if (planNameLc.includes("quarter")) return "quarterly";
  if (planNameLc.includes("month")) return "monthly";
  if (planNameLc.includes("7-day") || isSevenDayByName(planNameLc))
    return "7Day";

  return "free";
}

function isSevenDayByName(name: string) {
  return /7[\s\-]?day/.test(name);
}
