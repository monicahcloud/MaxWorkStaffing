"use client";

import React from "react";
import Link from "next/link";
import FAQSection from "../support/FAQSection";
import SectionTitle from "@/components/SectionTitle";

export default function FAQPage() {
  return (
    <div className="w-full mx-auto py-12 px-4">
      <SectionTitle text="Frequently Asked Questions" subtext="" />
      <span className="text-muted-foreground text-md mt-2 block">
        Still need assistance?{" "}
        <Link href="/support" className="text-blue-600 underline">
          Contact Support
        </Link>
      </span>
      <FAQSection />
    </div>
  );
}
