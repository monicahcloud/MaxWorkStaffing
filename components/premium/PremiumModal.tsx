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
            <div className="border border-gray-200 rounded-xl p-6 shadow-md relative bg-white">
              <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow text-center mb-2">
                MOST POPULAR
              </span>
              <h3 className="text-center text-xl font-bold text-red-600 mb-2">
                7-Day Access
              </h3>
              <p className="text-center text-3xl font-bold text-gray-900 mb-4">
                $5.95
              </p>
              <ul className="text-sm text-gray-700 pl-5 space-y-2">
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  Build and export <strong>3 custom AI-powered resumes</strong>
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  Create and download{" "}
                  <strong>3 personalized cover letters</strong>
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  <strong>Unlimited access</strong> to all resume-building tools
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  <strong>Track unlimited jobs</strong> with our application
                  tracker
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  <strong>Search jobs</strong> across industries with smart
                  filters
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
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
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  <strong>Unlimited access</strong> to all resume and cover
                  letter tools
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  <strong>Upload up to 5 PDF resumes</strong> for parsing and
                  editing
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  Includes job tracking, downloads, and smart suggestions
                </li>
                <li>
                  <Check className="w-5 h-5 text-red-500" />
                  <strong>Search jobs</strong> across industries with smart
                  filters
                </li>
              </ul>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
                onClick={() => handlePremiumClick("monthly")}
                disabled={loading}>
                Subscribe Monthly
              </Button>
            </div>

            {/* Quarterly Plan */}
            <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
              <h3 className="text-center text-xl font-bold text-red-600 mb-2">
                Quarterly Access
              </h3>
              <p className="text-center text-3xl font-bold text-gray-900 mb-2">
                $49.95<span className="text-sm font-medium">/3 months</span>
              </p>
              <p className="text-center text-xs text-gray-500 mb-4">
                Billed quarterly — save 17%
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Full access to all resume and job tools for 3 months
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Save 17% compared to monthly billing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Upload up to 5 PDFs + unlimited downloads and edits
                </li>
                <li>
                  <strong>Search jobs</strong> across industries with smart
                  filters
                </li>
              </ul>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
                onClick={() => handlePremiumClick("quarterly")}
                disabled={loading}>
                Quarterly Plan
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
