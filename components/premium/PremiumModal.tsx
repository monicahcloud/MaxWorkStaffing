"use client";

import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useState } from "react";
import { toast } from "sonner";
import createCheckoutSession from "./actions";
import { env } from "@/env";

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const [loading, setLoading] = useState(false);

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
    <Dialog
      open={open}
      onOpenChange={(newState) => {
        if (!loading) setOpen(newState);
      }}>
      <DialogContent className="w-full max-w-[90vw] sm:p-12 p-6">
        <div className="mx-auto w-full max-w-[1200px]">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl sm:text-2xl text-center font-bold text-gray-900 mb-6">
              Get Closer to Your Next Opportunity—Faster
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 14-Day Access Card */}
            <div className="border border-gray-200 rounded-xl p-6 shadow-md relative bg-white">
              <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow text-center mb-2">
                MOST POPULAR
              </span>
              <h3 className="text-center text-xl font-bold text-red-600 mb-2">
                14-Day Access
              </h3>
              <p className="text-center text-3xl font-bold text-gray-900 mb-4">
                $2.95
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Unlimited edits, downloads & emails
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Create & customize unlimited resumes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  After 14 days, auto-renews at $23.95 billed every 4 weeks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Money-Back Guarantee
                </li>
              </ul>
              <Button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
                onClick={() =>
                  handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY)
                }
                disabled={loading}>
                Get Started
              </Button>
            </div>

            {/* Annual Access Card */}
            <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
              <h3 className="text-center text-xl font-bold text-red-600 mb-2">
                Annual Access
              </h3>
              <p className="text-center text-3xl font-bold text-gray-900 mb-2">
                $7.95<span className="text-sm font-medium">/month</span>
              </p>
              <p className="text-center text-xs text-gray-500 mb-4">
                Billed yearly at $95.40 (save 69%)
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Billed annually
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Pay $95.40 up-front and save 69%
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Automatically renews each year, cancel anytime
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-red-500" />
                  Pay once, use all year long
                </li>
              </ul>
              <Button
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold text-lg"
                onClick={() =>
                  handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL)
                }
                disabled={loading}>
                Annual Plan
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
