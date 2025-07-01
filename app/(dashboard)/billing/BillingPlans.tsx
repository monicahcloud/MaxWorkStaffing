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
  {
    icon: <DollarSign className="w-6 h-6 text-primary" />,
    text: "Money-Back Guarantee:",
    subtext:
      "Not satisfied in the first 14 days? We'll issue a full refund—no hassle",
  },
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
};
export default function BillingPlans({ subscription }: Props) {
  const [loading, setLoading] = useState(false);
  let planName = "No Active Plan";
  let renewalText = "";

  if (subscription?.stripePriceId) {
    if (subscription.stripePriceId === process.env.STRIPE_PRICE_ID_ANNUAL) {
      planName = "Annual Plan";
    } else if (
      subscription.stripePriceId === process.env.STRIPE_PRICE_ID_MONTHLY
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

  async function handlePremiumClick(plan: "14Day" | "annual") {
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
      <div className="mt-10 max-w-4xl mx-auto space-y-6">
        <h2 className="text-center text-2xl font-medium text-gray-800 mb-5">
          Current Plan: {planName} {renewalText && `— ${renewalText}`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4 shadow-md relative">
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1  text-xs font-semibold rounded-full">
              MOST POPULAR
            </div>
            <h3 className="font-semibold text-gray-700 text-2xl text-center mb-1 mt-4">
              14–Day Plan
            </h3>
            <p className="text-center text-2xl font-bold text-gray-900 mb-4">
              $2.95
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Make unlimited changes</span>{" "}
                and send or save as needed
              </li>
              <li>
                Build as many{" "}
                <span className="font-semibold">custom resumes</span> as you
                like
              </li>
              <li>
                Design{" "}
                <span className="font-semibold">coordinated cover letters</span>{" "}
                for each role
              </li>
              <li>End your plan anytime — no commitment</li>
              <li>After 14 days, renews at $22.95 every 4 weeks</li>
              <li className="font-semibold text-blue-700">
                Full refund if you’re not satisfied
              </li>
            </ul>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() => handlePremiumClick("14Day")}
              disabled={loading}>
              Get Started
            </Button>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-gray-700 text-2xl text-center mb-1">
              Annual Plan
            </h3>
            <p className="text-center text-2xl font-bold text-gray-900 mb-4">
              $7.95<span className="text-sm">/mo</span>
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-2">
              <li>One-time payment billed yearly</li>
              <li>Pay $95.40 now and keep 69% in savings</li>
              <li>
                Access everything — unlimited letters, downloads, and resume
                tools
              </li>
              <li>Renews automatically each year unless canceled</li>
              <li>One payment covers an entire year of usage</li>
              <li>Use freely with no monthly fees</li>
            </ul>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
              onClick={() => handlePremiumClick("annual")}
              disabled={loading}>
              Annual Plan
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-6xl mx-auto">
        <Card className="rounded-xl shadow-lg border border-gray-300">
          <CardTitle className="text-center text-2xl sm:text-2xl font-bold text-blue-900 p-2 border-b border-gray-200">
            Subscription Package
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
