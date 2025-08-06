"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useState } from "react";
import { toast } from "sonner";

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const [loading, setLoading] = useState(false);

  async function handlePremiumClick(plan: "7Day" | "monthly" | "quarterly") {
    try {
      setLoading(true);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to start checkout session.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(state) => !loading && setOpen(state)}>
      <DialogContent className="!max-w-none w-full sm:w-[95vw] lg:w-[90vw] xl:w-[1280px] sm:rounded-2xl rounded-lg p-0 overflow-hidden">
        <div className="w-full px-6 py-10 sm:px-10">
          <DialogHeader className="text-center mb-10">
            <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
              Get Closer to Your Next Opportunity—Faster
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
            {/* 7-Day Access Plan */}
            {/* {!hasUsed7DayAccess && ( */}
            <div className="border border-gray-200 rounded-xl p-6 shadow-md relative bg-white">
              <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow text-center mb-2">
                MOST POPULAR
              </span>
              <h3 className="text-center text-xl font-bold text-red-600 mb-2">
                7-Day Access
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
            {/* )} */}
            {/* Monthly Plan */}
            <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
              <h3 className="text-center text-xl font-bold text-red-600 mb-2">
                Monthly Subscription
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
                {/* <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  <span>
                    <strong>Upload up to 5 PDF resumes</strong> for parsing and
                    editing
                  </span>
                </li> */}
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
            <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
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
      </DialogContent>
    </Dialog>
  );
}
