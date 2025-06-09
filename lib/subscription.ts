import { cache } from "react";
import prisma from "./prisma";
import { env } from "@/env";

export type SubscriptionLevel = "trial" | "monthly" | "annual";

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

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "trial";
    }

    if (
      subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
    ) {
      return "monthly";
    }

    if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL) {
      return "annual";
    }

    throw new Error("Invalid subscription");
  }
);
