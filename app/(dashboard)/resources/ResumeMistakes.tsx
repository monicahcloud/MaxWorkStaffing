"use client";

import React from "react";
import { XCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const mistakes = [
  {
    mistake: "Using an Objective Statement",
    fix: "Replace it with a clear, concise Summary that highlights your value.",
    example: {
      bad: "Objective: Seeking a challenging position to grow my skills.",
      good: "Summary: Administrative professional with 5+ years in healthcare, known for streamlining front desk workflows and improving patient satisfaction.",
    },
  },
  {
    mistake: "Listing Job Duties Instead of Achievements",
    fix: "Focus on accomplishments and results, not just responsibilities.",
    example: {
      bad: "Managed schedules for employees.",
      good: "Streamlined scheduling, reducing overtime by 18% and improving shift coverage.",
    },
  },
  {
    mistake: "Too Long or Too Short",
    fix: "Keep it to 1 page if you’re early career; 2 pages max if experienced.",
    example: {
      bad: "Four-page resume for an entry-level role.",
      good: "One-page resume focused on relevant internships and projects.",
    },
  },
  {
    mistake: "Poor Formatting and Layout",
    fix: "Use clear headings, bullet points, and consistent spacing.",
    example: {
      bad: "Tiny font, no section spacing, dense paragraphs.",
      good: "12pt font, ample white space, and clear section breaks.",
    },
  },
  {
    mistake: "Typos and Grammar Errors",
    fix: "Proofread thoroughly or use a tool like Grammarly before sending.",
    example: {
      bad: "Detail-orieneted team memeber.",
      good: "Detail-oriented team member.",
    },
  },
];

const ResumeMistakes = () => {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-red-600">
          Common Resume Mistakes to Avoid
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Small errors can cost you big opportunities. Here's what to watch
          for—and how to fix it.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {/* ⬅️ Image takes first slot in right column */}
        <div className="col-span-1 md:col-start-2">
          <Image
            src="/blog/avoid.png"
            alt="career changes"
            width={500}
            height={300}
            className="rounded-lg shadow bg-white text-gray-800 border p-1 hover:bg-gray-100 transition"
          />
        </div>
        {/* Mistakes Grid */}
        {/* <div className="grid gap-8 md:grid-cols-2"> */}
        {mistakes.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <XCircle className="text-red-500 w-5 h-5" />
              {item.mistake}
            </div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Fix:</span> {item.fix}
            </p>

            {/* Example */}
            <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
              <p className="text-red-500 flex items-center gap-1">
                <XCircle className="w-4 h-4" />{" "}
                <span className="font-medium">Don’t:</span> {item.example.bad}
              </p>
              <p className="text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />{" "}
                <span className="font-medium">Do:</span> {item.example.good}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ResumeMistakes;
