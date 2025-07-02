import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "14Day" | "annual" | "trial";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
        // user: {
        //   clerkId: userId, // assuming userId is actually the Clerk ID
        // },
      },
    });

    if (
      !subscription ||
      !subscription.stripeCurrentPeriodEnd ||
      subscription.stripeCurrentPeriodEnd < new Date()
    ) {
      return "free"; // Or whatever fallback logic you'd like
    }

    if (subscription.stripePriceId === process.env.STRIPE_PRICE_ID_ANNUAL) {
      return "annual";
    }

    // Unexpected priceId — log or report here if needed
    console.warn(
      `Unknown stripePriceId for user ${userId}: ${subscription.stripePriceId}`
    );
    return "free";

    // throw new Error("Invalid subscription");
  }
);

// ✅ Add this to centralize access check logic
export function hasProAccess(level: SubscriptionLevel): boolean {
  return level === "annual" || level === "14Day" || level === "trial";
}
