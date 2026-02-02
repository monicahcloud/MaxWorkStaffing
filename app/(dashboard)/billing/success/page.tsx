// app/(dashboard)/billing/success/page.tsx
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SectionTitle from "@/components/SectionTitle";
import ManageSubscriptionButton from "../ManageSubscriptionButton";
import Stripe from "stripe";

export default async function SuccessPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  // Resolve DB user
  const dbUser = await prisma.user.findUnique({ where: { clerkId } });

  // Grab the subscription row by either key
  const subscription = await prisma.userSubscription.findFirst({
    where: {
      OR: [
        { clerkId },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(dbUser?.id ? ([{ userId: dbUser.id }] as any) : []),
      ],
    },
    orderBy: { updatedAt: "desc" },
  });

  // Derive the plan using your existing helper (make sure you removed cache() in that helper)
  const plan = await getUserSubscriptionLevel(clerkId);

  // Only fetch Stripe product name for non-7Day subscriptions
  let priceInfo: Stripe.Price | null = null;
  if (subscription?.stripePriceId && plan !== "7Day") {
    try {
      priceInfo = await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      });
    } catch (e) {
      console.error("Failed to retrieve Stripe price:", e);
    }
  }

  const planName =
    plan === "7Day"
      ? "7-Day Access"
      : priceInfo
      ? (priceInfo.product as Stripe.Product).name
      : "Free";

  let renewalText = "";
  if (subscription?.stripeCurrentPeriodEnd) {
    const ends = new Date(subscription.stripeCurrentPeriodEnd);
    if (!isNaN(ends.getTime())) {
      if (plan === "7Day") {
        // One-time pass: show end date instead of renew/cancel
        renewalText = ` — Ends on ${format(ends, "MMM dd, yyyy")}`;
      } else {
        renewalText = subscription.stripeCancelAtPeriodEnd
          ? ` — Cancels on ${format(ends, "MMM dd, yyyy")}`
          : ` — Renews on ${format(ends, "MMM dd, yyyy")}`;
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-br from-green-50 to-white text-center space-y-8">
      <div className="flex justify-center ">
        <CheckCircle2 className="text-green-500 w-20 h-20 animate-pulse" />
      </div>

      <div className="max-w-2xl space-y-4 ">
        <SectionTitle
          text="🎉 Subscription Plan Active!"
          subtext={
            <>
              Your checkout was successful, and your subscription has been
              activated.
              <br />
              <strong>
                Current Plan: {planName}
                {renewalText}
              </strong>
            </>
          }
        />

        <p className="text-gray-600 text-lg">
          You now have full access to all subscription features. Manage your
          subscription anytime using the button below.
        </p>

        <div className="flex justify-center pt-4">
          <ManageSubscriptionButton />
        </div>
      </div>
    </main>
  );
}
