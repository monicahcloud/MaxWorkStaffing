import React from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import SectionTitle from "@/components/SectionTitle";
import comingSoon from "../../../assets/comingsoon.jpg";
import Image from "next/image";
// import GetSubscriptionButton from "./GetSubscriptionButton";
// import ManageSubscriptionButton from "./ManageSubscriptionButton";
// import { formatDate } from "date-fns";

export const metadata: Metadata = {
  title: "Billing",
};
async function BillingPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;
  return (
    <main className="">
      <div className="mx-auto text-center justify-center item-center">
        <SectionTitle
          text="Billing"
          subtext={`Subscription Level: ${
            priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"
          }`}
        />
      </div>
      <Image
        src={comingSoon}
        alt="Coming Soon"
        width={300}
        height={300}
        priority
      />
      {/* <div className="mt-5">
        {subscription ? (
          <>
            {subscription.stripeCancelAtPeriodEnd && (
              <p className="text-destructive">
                Your subscription will be canceled on{" "}
                {formatDate(
                  subscription.stripeCurrentPeriodEnd,
                  "MMMM dd, yyyy"
                )}{" "}
              </p>
            )}{" "}
            <ManageSubscriptionButton />
          </>
        ) : (
          <GetSubscriptionButton />
        )}
      </div> */}
    </main>
  );
}

export default BillingPage;
