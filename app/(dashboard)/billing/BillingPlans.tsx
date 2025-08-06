"use client";

import React, { useState } from "react";
import {
  Brain,
  FileText,
  TrendingUp,
  Target,
  Pencil,
  Briefcase,
  // DollarSign,
  Globe2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

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
  // {
  //   icon: <DollarSign className="w-6 h-6 text-primary" />,
  //   text: "Money-Back Guarantee:",
  //   subtext:
  //     "Not satisfied in the first 14 days? We'll issue a full refund—no hassle",
  // },
  {
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    text: "Career Tools and Resources:",
    subtext:
      "Discover insights on resumes, salaries, and job hunting strategies",
  },
];

type SubscriptionType = {
  stripeCurrentPeriodEnd: Date | null;
  stripeCancelAtPeriodEnd: boolean;
  stripePriceId: string | null;
} | null;

type Props = {
  subscription?: SubscriptionType;
  hasUsed7DayAccess?: boolean;
};

export default function BillingPlans({
  subscription,
  hasUsed7DayAccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  let planName = "No Active Plan";
  let renewalText = "";

  if (subscription?.stripePriceId) {
    const { stripePriceId } = subscription;
    if (stripePriceId === process.env.STRIPE_PRICE_ID_QUARTERLY) {
      planName = "Quarterly Plan";
    } else if (stripePriceId === process.env.STRIPE_PRICE_ID_MONTHLY) {
      planName = "Monthly Plan";
    } else if (stripePriceId === process.env.STRIPE_PRICE_7_DAY_ACCESS) {
      planName = "7-Day Access";
    } else {
      planName = "Free";
    }

    if (subscription.stripeCurrentPeriodEnd instanceof Date) {
      const formattedDate =
        subscription.stripeCurrentPeriodEnd.toLocaleDateString();
      renewalText = subscription.stripeCancelAtPeriodEnd
        ? `— Cancels on ${formattedDate}`
        : `— Renews on ${formattedDate}`;
    }
  }

  async function handlePremiumClick(plan: "7Day" | "monthly" | "quarterly") {
    try {
      setLoading(true);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Checkout failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-10 max-w-6xl mx-auto space-y-6">
        <h2 className="text-center text-2xl font-medium text-gray-800 mb-5">
          Current Plan: {planName} {renewalText && `— ${renewalText}`}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 7-Day Plan */}
          {!hasUsed7DayAccess && (
            <div className="border border-gray-200 rounded-lg p-4 shadow-md relative bg-white">
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-center text-xl font-bold text-red-600 m-2 ">
                7–Day Access
              </h3>
              <p className="text-center text-3xl font-bold text-gray-900 mb-4">
                $5.95<span className="text-sm font-medium"> (one-time)</span>
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
                {/* <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  <span>
                    <strong>Upload 1 PDF resumes</strong> for parsing and
                    editing
                  </span>
                </li> */}
              </ul>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
                onClick={() => handlePremiumClick("7Day")}
                disabled={loading}>
                Start 7-Day Access
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Just $5.95 — the perfect short-term option
              </p>
            </div>
          )}

          {/* Monthly Plan */}
          <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-center text-xl font-bold text-red-600 mb-2">
              Monthly Plan
            </h3>
            <p className="text-center text-3xl font-bold text-gray-900 mb-2">
              $23.95<span className="text-sm font-medium">/month</span>
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
                  {" "}
                  <strong>Search jobs</strong> across industries with smart
                  filters
                </span>
              </li>
            </ul>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() => handlePremiumClick("monthly")}
              disabled={loading}>
              Subscribe Monthly
            </Button>
            <p className="text-xs text-center text-gray-500 mt-2">
              Same as 4 weekly passes — but no interruptions.
            </p>
          </div>

          {/* Quarterly Plan */}
          <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-center text-xl font-bold text-red-600 mb-2">
              Quarterly Access
            </h3>
            <p className="text-center text-3xl font-bold text-gray-900 mb-2">
              $16.65<span className="text-sm font-medium">/month</span>
            </p>
            <p className="text-center text-xs text-gray-500 mb-4">
              Billed $49.95 every 3 months — save over 30%
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
                  <span>
                    <strong>Just $16.65/month</strong> — billed as $49.95
                    quarterly
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-red-500" />
                <span>
                  <strong>Save 30%+</strong> vs monthly subscription
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
              disabled={loading}>
              Quarterly Plan
            </Button>
            <p className="text-xs text-center text-gray-500 mt-2">
              Best value — billed $49.95 every 3 months.
            </p>
          </div>
        </div>
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
