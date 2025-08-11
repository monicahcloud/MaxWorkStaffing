// app/(dashboard)/billing/page.tsx
export const dynamic = "force-dynamic"; // or: export const revalidate = 0

import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { env } from "@/env";
import BillingPlans from "./BillingPlans";

export default async function BillingPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const dbUser = await prisma.user.findUnique({ where: { clerkId } });

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

  // Optional: see what we're sending
  console.log("BillingPage subscription:", subscription);

  const user = await (await clerkClient()).users.getUser(clerkId);
  const hasUsed7DayAccess = user.privateMetadata?.hasUsed7DayAccess === true;

  const priceIds = {
    monthly: env.STRIPE_PRICE_ID_MONTHLY!,
    quarterly: env.STRIPE_PRICE_ID_QUARTERLY!,
    sevenDay: env.STRIPE_PRICE_7_DAY_ACCESS!,
  };

  // Make Date serializable for the client component
  const subForClient = subscription
    ? {
        ...subscription,
        stripeCurrentPeriodEnd:
          subscription.stripeCurrentPeriodEnd?.toISOString() ?? null,
      }
    : null;

  return (
    <BillingPlans
      subscription={subForClient}
      hasUsed7DayAccess={hasUsed7DayAccess}
      priceIds={priceIds}
    />
  );
}
