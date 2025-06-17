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
  const { userId } = await auth();
  if (!userId) return null;

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const plan = await getUserSubscriptionLevel(userId);

  const priceInfo = subscription?.stripePriceId
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  const planName =
    plan === "trial"
      ? "Trial"
      : priceInfo
      ? (priceInfo.product as Stripe.Product).name
      : "Monthly"; // Fallback

  const renewalText =
    subscription && plan !== "trial"
      ? subscription.stripeCancelAtPeriodEnd
        ? ` — Cancels on ${format(
            new Date(subscription.stripeCurrentPeriodEnd!),
            "MMM dd, yyyy"
          )}`
        : ` — Renews on ${format(
            new Date(subscription.stripeCurrentPeriodEnd!),
            "MMM dd, yyyy"
          )}`
      : "";

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-br from-green-50 to-white text-center space-y-8">
      <div className="flex justify-center">
        <CheckCircle2 className="text-green-500 w-20 h-20 animate-pulse" />
      </div>

      <div className="max-w-2xl space-y-4">
        <SectionTitle
          text="🎉 Subscription Active!"
          subtext={`Your checkout was successful, and your subscription has been activated.\nCurrent Plan: ${planName}${renewalText}`}
        />

        <p className="text-gray-600 text-lg">
          You now have full access to all premium features. Manage your
          subscription anytime using the button below.
        </p>

        <div className="flex justify-center pt-4">
          <ManageSubscriptionButton />
        </div>
      </div>
    </main>
  );
}
