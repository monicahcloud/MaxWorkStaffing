"use client";

import React from "react";
import Link from "next/link";
import FAQSection from "../support/FAQSection";

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <FAQSection />
      <div className="text-center mt-12">
        <Link href="/support" className="text-blue-600 hover:underline text-lg">
          ← Back to Support
        </Link>
      </div>
    </div>
  );
}
