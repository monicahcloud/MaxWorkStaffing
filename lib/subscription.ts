import { cache } from "react";
import prisma from "./prisma";
import { env } from "@/env";

export type SubscriptionLevel =
  | "trial"
  | "trial_expired"
  | "monthly"
  | "annual";

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
      return "trial_expired"; // Or whatever fallback logic you'd like
    }

    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
    ) {
      return "monthly";
    }

    if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL) {
      return "annual";
    }

    // Unexpected priceId — log or report here if needed
    console.warn(
      `Unknown stripePriceId for user ${userId}: ${subscription.stripePriceId}`
    );
    return "trial";

    // throw new Error("Invalid subscription");
  }
);
