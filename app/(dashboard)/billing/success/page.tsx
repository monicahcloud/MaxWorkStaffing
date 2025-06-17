"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import ManageSubscriptionButton from "../ManageSubscriptionButton";

function Page() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-br from-green-50 to-white text-center space-y-8">
      {/* Success Icon with animation */}
      <div className="flex justify-center">
        <CheckCircle2 className="text-green-500 w-20 h-20 animate-pulse" />
      </div>

      <div className="max-w-2xl space-y-4">
        <SectionTitle
          text="🎉 Subscription Active!"
          subtext="Your checkout was successful, and your subscription has been activated. Welcome aboard!"
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

export default Page;
