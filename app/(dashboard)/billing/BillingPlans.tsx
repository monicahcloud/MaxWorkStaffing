/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Brain,
  FileText,
  TrendingUp,
  Target,
  Pencil,
  Briefcase,
  Globe2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    text: "Use our A.I. to help build your resume",
    subtext: "Smart suggestions to make your resume stand out",
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    text: "Download or email your resume",
    subtext: "Send or save your resume instantly as a PDF",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    text: "Track your job application status",
    subtext: "Monitor your applications all in one place",
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    text: "Career Advice Blog",
    subtext:
      "Practical guidance to improve your job search and grow professionally",
  },
  {
    icon: <Pencil className="w-6 h-6 text-primary" />,
    text: "Create a custom cover letter in minutes",
    subtext: "Easily adapt your letter for any opportunity",
  },
  {
    icon: <Globe2 className="w-6 h-6 text-primary" />,
    text: "Search for jobs",
    subtext: "Find listings from reliable sources tailored to your interests",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    text: "Career Tools and Resources:",
    subtext:
      "Discover insights on resumes, salaries, and job hunting strategies",
  },
];

type SubscriptionType = {
  stripeCurrentPeriodEnd: Date | string | null;
  stripeCancelAtPeriodEnd: boolean;
  stripePriceId: string | null;
  stripeInterval?: string | null;
  stripePlanName?: string | null;
} | null;

type Props = {
  subscription?: SubscriptionType;
  hasUsed7DayAccess?: boolean;
  priceIds: { monthly: string; quarterly: string; sevenDay: string };
};

export default function BillingPlans({
  subscription,
  hasUsed7DayAccess,
  priceIds,
}: Props) {
  const [loading, setLoading] = useState(false);

  // active window
  const end = subscription?.stripeCurrentPeriodEnd
    ? new Date(subscription.stripeCurrentPeriodEnd as any)
    : null;
  const isActive = !!end && !isNaN(end.getTime()) && end.getTime() > Date.now();

  // plan detection (same as SuccessPage)
  const id = subscription?.stripePriceId ?? "";
  const isSevenDay =
    !!subscription &&
    (id === priceIds.sevenDay ||
      subscription.stripeInterval === "one_time" ||
      (subscription.stripePlanName ?? "").toLowerCase().includes("7-day"));

  let planName = "Free";
  let renewalText = "";
  if (subscription && isActive) {
    if (isSevenDay) {
      planName = "7-Day Access";
      renewalText = `Ends on ${end!.toLocaleDateString()}`;
    } else if (id === priceIds.monthly) {
      planName = "Monthly Plan";
      renewalText = subscription.stripeCancelAtPeriodEnd
        ? `Cancels on ${end!.toLocaleDateString()}`
        : `Renews on ${end!.toLocaleDateString()}`;
    } else if (id === priceIds.quarterly) {
      planName = "Quarterly Plan";
      renewalText = subscription.stripeCancelAtPeriodEnd
        ? `Cancels on ${end!.toLocaleDateString()}`
        : `Renews on ${end!.toLocaleDateString()}`;
    } else {
      planName = "Active Plan";
      renewalText = subscription.stripeCancelAtPeriodEnd
        ? `Cancels on ${end!.toLocaleDateString()}`
        : `Renews on ${end!.toLocaleDateString()}`;
    }
  }

  // disable current sub (monthly/quarterly) unless cancel_at_period_end
  const disableMonthly =
    isActive &&
    id === priceIds.monthly &&
    !subscription?.stripeCancelAtPeriodEnd;
  const disableQuarterly =
    isActive &&
    id === priceIds.quarterly &&
    !subscription?.stripeCancelAtPeriodEnd;

  // show portal manage button only for active monthly/quarterly
  const hasActiveSubscription =
    isActive &&
    !isSevenDay &&
    (id === priceIds.monthly || id === priceIds.quarterly);

  // 7-day visibility
  const canShow7Day = !hasUsed7DayAccess;
  const sevenDayDisabled = !!hasUsed7DayAccess;

  async function handlePremiumClick(plan: "7Day" | "monthly" | "quarterly") {
    if (plan === "7Day" && hasUsed7DayAccess) {
      toast.error("7-Day access can only be purchased once.");
      return;
    }
    if (
      (plan === "monthly" && disableMonthly) ||
      (plan === "quarterly" && disableQuarterly)
    ) {
      toast.error(
        "You're already on this plan. You can cancel in the portal and repurchase after."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const raw = await res.text();
      let data: any = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {}

      if (!res.ok) {
        toast.error(data?.error || `Checkout failed (${res.status}).`);
        return;
      }
      if (data?.url) window.location.href = data.url;
      else toast.error("No checkout URL returned.");
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-10 max-w-6xl mx-auto space-y-4">
        <h2 className="text-center text-2xl font-medium text-gray-800">
          Current Plan: {planName} {renewalText && `— ${renewalText}`}
        </h2>

        {hasActiveSubscription && (
          <div className="flex justify-center">
            <ManageSubscriptionButton />
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 7-Day Plan */}
          {canShow7Day && (
            <div className="border border-gray-200 rounded-lg p-4 shadow-md relative bg-white">
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-center text-xl font-bold text-red-600 m-2">
                7–Day Access
              </h3>
              <p className="text-center text-3xl font-bold text-gray-900 mb-2">
                $2.95<span className="text-sm font-medium"> (one-time)</span>
              </p>
              <p className="text-center text-xs text-gray-500 mb-4">
                Try it out with no commitment.
              </p>
              <ul className="text-sm text-gray-700 ">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  <span>
                    <strong>Build & download 3 resumes</strong> using AI tools
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  <span>
                    <strong>Create 3 custom cover letters</strong> instantly
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  <span>
                    <strong>7 days unlimited access</strong> to all features
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  <span>Track unlimited jobs with our smart dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  <span>Search job listings with intelligent filters</span>
                </li>
              </ul>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
                onClick={() => handlePremiumClick("7Day")}
                disabled={loading || sevenDayDisabled}>
                Start 7-Day Access
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Just $2.95 — the perfect short-term option
              </p>
            </div>
          )}

          {/* Monthly Plan */}
          <div
            className={`border border-gray-300 rounded-lg p-4 shadow-md bg-white relative ${
              isActive && id === priceIds.monthly ? "opacity-60" : ""
            }`}>
            {isActive && id === priceIds.monthly && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-400 text-white px-3 py-1 text-xs font-semibold rounded-full">
                CURRENT PLAN
              </div>
            )}
            <h3 className="text-center text-xl font-bold text-red-600 mb-2">
              Monthly Plan
            </h3>
            <p className="text-center text-3xl font-bold text-gray-900 mb-2">
              $19.99<span className="text-sm font-medium">/month</span>
            </p>
            <p className="text-center text-xs text-gray-500 mb-4">
              Billed monthly, cancel anytime
            </p>

            <ul className="text-sm text-gray-700  pl-5 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>
                  <strong>Unlimited access</strong> to all tools for 30 days
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>Download unlimited resumes and cover letters</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>
                  <strong>Search jobs</strong> across industries with smart
                  filters
                </span>
              </li>
            </ul>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() => handlePremiumClick("monthly")}
              disabled={
                loading ||
                (isActive &&
                  id === priceIds.monthly &&
                  !subscription?.stripeCancelAtPeriodEnd)
              }>
              {isActive &&
              id === priceIds.monthly &&
              !subscription?.stripeCancelAtPeriodEnd
                ? "Current Plan"
                : "Subscribe Monthly"}
            </Button>

            {isActive && id === priceIds.monthly && (
              <div className="mt-3 flex justify-center">
                <ManageSubscriptionButton />
              </div>
            )}
          </div>

          {/* Quarterly Plan */}
          <div
            className={`border border-gray-300 rounded-lg p-4 shadow-md bg-white relative ${
              isActive && id === priceIds.quarterly ? "opacity-60" : ""
            }`}>
            {isActive && id === priceIds.quarterly && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-400 text-white px-3 py-1 text-xs font-semibold rounded-full">
                CURRENT PLAN
              </div>
            )}
            <h3 className="text-center text-xl font-bold text-red-600 mb-2">
              Quarterly Access
            </h3>
            <p className="text-center text-3xl font-bold text-gray-900 mb-2">
              $11.65<span className="text-sm font-medium">/month</span>
            </p>
            <p className="text-center text-xs text-gray-500 mb-4">
              Billed $34.95 every 3 months — save over 40%
            </p>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>
                  <strong>Full access for 3 months</strong> — uninterrupted
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>
                  <strong>Just $11.65/month</strong> — billed as $34.95
                  quarterly
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>
                  <strong>Save 40%+</strong> vs monthly subscription
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>
                  Full access to job search, tracker, and smart resume tools
                </span>
              </li>
            </ul>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() => handlePremiumClick("quarterly")}
              disabled={
                loading ||
                (isActive &&
                  id === priceIds.quarterly &&
                  !subscription?.stripeCancelAtPeriodEnd)
              }>
              {isActive &&
              id === priceIds.quarterly &&
              !subscription?.stripeCancelAtPeriodEnd
                ? "Current Plan"
                : "Quarterly Plan"}
            </Button>

            {isActive && id === priceIds.quarterly && (
              <div className="mt-3 flex justify-center">
                <ManageSubscriptionButton />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="items-center justify-center flex mt-4">
        <h3 className="font-bold">
          “No hidden fees. Cancel anytime. Risk-free — full refund in first 3
          days if you’re not satisfied.”
        </h3>
      </div>

      <div className="mt-14 max-w-6xl mx-auto">
        <Card className="rounded-xl shadow-lg border border-gray-300">
          <CardTitle className="text-center text-2xl font-bold text-blue-900 p-2 border-b border-gray-200">
            Subscription Package Features
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
