"use client";

import { useState, useEffect } from "react";
import Slider from "@/components/Slider";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, ChevronUp } from "lucide-react";

export default function ResumeTypes() {
  /* ── back-to-top visibility ─────────────────────── */
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-red-600">
            Understanding Resume Types
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Choosing the right resume format can make a huge difference in how
            your experience is perceived. Learn which type fits your background
            and goals best.
          </p>
        </div>

        <Separator className="my-4" />

        <Slider />

        {/* Practical tips section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              When to Use Each Type
            </h2>
          </div>
          <ul className="list-disc list-inside space-y-4 text-gray-700 text-base">
            <li>
              <strong>Chronological:</strong> Ideal for those with a consistent
              work history and a clear career progression.
            </li>
            <li>
              <strong>Functional:</strong> Best for career changers or gaps in
              employment—focuses on skills over timeline.
            </li>
            <li>
              <strong>Combination:</strong> Showcases both skills and solid
              employment history.
            </li>
            <li>
              <strong>Federal:</strong> Required for government roles—includes
              clearance levels &amp; hours per week.
            </li>
            <li>
              <strong>Creative:</strong> Great for designers/marketers; use only
              if the company welcomes non-traditional formats.
            </li>
          </ul>
        </div>
      </div>

      {/* ── Back-to-Top Arrow ───────────────────────── */}
      {showTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8
                     p-3 rounded-full bg-red-600 text-white shadow-lg
                     hover:bg-red-700 transition"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}
