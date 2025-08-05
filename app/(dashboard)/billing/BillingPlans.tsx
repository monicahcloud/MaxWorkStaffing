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
            <div className="border border-gray-300 rounded-lg p-4 shadow-md relative bg-white">
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-semibold text-center text-gray-700 mb-1 mt-4">
                7–Day Plan
              </h3>
              <p className="text-center text-2xl font-bold text-gray-900 mb-4">
                $5.95
              </p>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>
                  Build and export <strong>3 custom AI-powered resumes</strong>
                </li>
                <li>
                  Create and download{" "}
                  <strong>3 personalized cover letters</strong>
                </li>
                <li>
                  <strong>Unlimited access</strong> to all resume-building tools
                </li>
                <li>
                  <strong>Track unlimited jobs</strong> with our application
                  tracker
                </li>
                <li>
                  <strong>Search jobs</strong> across industries with smart
                  filters
                </li>
                <li>
                  <strong>Upload 1 PDF resumes</strong> for parsing and editing
                </li>
              </ul>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
                onClick={() => handlePremiumClick("7Day")}
                disabled={loading}>
                Start 7-Day Access
              </Button>
            </div>
          )}

          {/* Monthly Plan */}
          <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-1">
              Monthly Plan
            </h3>
            <p className="text-center text-2xl font-bold text-gray-900 mb-4">
              $23.95 <span className="text-sm">/mo</span>
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>
                <strong>Unlimited access</strong> to all resume and cover letter
                tools
              </li>
              <li>
                <strong>Upload up to 5 PDF resumes</strong> for parsing and
                editing
              </li>
              <li>Includes job tracking, downloads, and smart suggestions</li>
              <li>Cancel anytime — no contracts, no pressure</li>
            </ul>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() => handlePremiumClick("monthly")}
              disabled={loading}>
              Subscribe Monthly
            </Button>
          </div>

          {/* Quarterly Plan */}
          <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-1">
              Quarterly Plan
            </h3>
            <p className="text-center text-2xl font-bold text-gray-900 mb-4">
              $16.65 <span className="text-sm">/mo</span>
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>Save 17% over monthly billing</li>
              <li>Full access to all tools and downloads</li>
              <li>Renews @ $49.95 every 3 months unless canceled</li>
            </ul>
            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() => handlePremiumClick("quarterly")}
              disabled={loading}>
              Choose Quarterly
            </Button>
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
