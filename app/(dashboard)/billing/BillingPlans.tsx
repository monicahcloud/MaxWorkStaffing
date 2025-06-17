"use client";

import React, { useState } from "react";
import {
  Brain,
  FileText,
  TrendingUp,
  Target,
  Pencil,
  Briefcase,
  DollarSign,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import createCheckoutSession from "@/components/premium/actions";
import { toast } from "sonner";

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    text: "Use our A.I. to help build your resume",
    subtext: "Get personalized content suggestions",
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    text: "Download or email your resume",
    subtext: "Easily share your resume in PDF format",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    text: "Track your job application status",
    subtext: "Stay organized with a visual tracker",
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    text: "Career Advice Blog",
    subtext:
      "Get expert tips on job searching, interviews, and professional growth to boost your career.",
  },
  {
    icon: <Pencil className="w-6 h-6 text-primary" />,
    text: "Create a custom cover letter in minutes",
    subtext: "Tailor it to every job application",
  },
  {
    icon: <Globe2 className="w-6 h-6 text-primary" />,
    text: "Search for jobs",
    subtext: "Access curated job boards",
  },
  {
    icon: <DollarSign className="w-6 h-6 text-primary" />,
    text: "Money-Back Guarantee:",
    subtext:
      "If you are unhappy for any reason during the first 14 days, just let us know - we'll refund your money",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    text: "Career Tools and Resources:",
    subtext:
      "Get access to resume tips, salary insights, and career-building resources to support your job hunt.",
  },
];
type SubscriptionType = {
  stripeCurrentPeriodEnd: Date | null;
  stripeCancelAtPeriodEnd: boolean;
  stripePriceId: string | null;
} | null;

type Props = {
  subscription?: SubscriptionType;
};
export default function BillingPlans({ subscription }: Props) {
  const [loading, setLoading] = useState(false);
  let planName = "No Active Plan";
  let renewalText = "";

  if (subscription?.stripePriceId) {
    if (
      subscription.stripePriceId ===
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL
    ) {
      planName = "Annual Plan";
    } else if (
      subscription.stripePriceId ===
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
    ) {
      planName = "Monthly Plan";
    } else {
      planName = "Trial";
    }
    if (subscription.stripeCurrentPeriodEnd instanceof Date) {
      const formattedDate =
        subscription.stripeCurrentPeriodEnd.toLocaleDateString();
      renewalText = subscription.stripeCancelAtPeriodEnd
        ? `— Cancels on ${formattedDate}`
        : `— Renews on ${formattedDate}`;
    }
  }

  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-10 max-w-4xl mx-auto space-y-6">
        <h2 className="text-center text-2xl font-medium text-gray-800 mb-5">
          Current Plan: {planName} {renewalText && `— ${renewalText}`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4 shadow-md relative">
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
              MOST POPULAR
            </div>
            <h3 className="font-semibold text-gray-700 text-2xl text-center mb-1">
              14–Day Access
            </h3>
            <p className="text-center text-2xl font-bold text-gray-900 mb-4">
              $2.95
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Unlimited</span> edits,
                downloads & emails
              </li>
              <li>
                Create & customize{" "}
                <span className="font-semibold">unlimited resumes</span>
              </li>
              <li>
                Create matching{" "}
                <span className="font-semibold">cover letters</span>
              </li>
              <li>Cancel anytime</li>
              <li>After 14 days, auto-renews at $22.95 billed every 4 weeks</li>
              <li className="font-semibold text-blue-700">
                Money-Back Guarantee
              </li>
            </ul>
            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() =>
                handlePremiumClick(
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!
                )
              }
              disabled={loading}>
              Get Started
            </Button>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-gray-700 text-2xl text-center mb-1">
              Annual Access
            </h3>
            <p className="text-center text-2xl font-bold text-gray-900 mb-4">
              $7.95<span className="text-sm">/mo</span>
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>Billed annually</li>
              <li>Pay $95.40 up-front and save 69%</li>
              <li>
                Full access to all features including cover letters unlimited
                printing and downloads
              </li>
              <li>Automatically renews each year, cancel anytime</li>
              <li>Pay once, use all year long</li>
              <li className="text-white">Pay once, use all year long</li>
            </ul>
            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() =>
                handlePremiumClick(
                  process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL!
                )
              }
              disabled={loading}>
              Annual Plan
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-6xl mx-auto">
        <Card className="rounded-xl shadow-lg border border-gray-300">
          <CardTitle className="text-center text-2xl sm:text-2xl font-bold text-blue-900 p-2 border-b border-gray-200">
            All Subscription Features
          </CardTitle>

          <CardContent className="p-2 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-blue-900">
              {features.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="pt-1">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-base">{item.text}</p>
                    {item.subtext && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.subtext}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
