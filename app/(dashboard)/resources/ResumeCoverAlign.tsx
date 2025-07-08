"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  AlignLeft,
  Link2,
  ArrowRightLeft,
  Lightbulb,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ─── Quick-hit alignment rules ───────────────────── */
const rules = [
  {
    icon: AlignLeft,
    title: "Match the Tone & Branding",
    detail:
      "Use the same font family, header style, and color accent in both documents so they feel like a cohesive packet.",
  },
  {
    icon: Link2,
    title: "Echo Key Achievements",
    detail:
      "Reinforce one or two resume accomplishments with a short narrative in your cover letter to add context.",
  },
  {
    icon: ArrowRightLeft,
    title: "Mirror Keywords from the Job Ad",
    detail:
      "If your resume mentions 'process improvement,' your cover letter should weave that phrase into a compelling sentence.",
  },
  {
    icon: Lightbulb,
    title: "Tell the 'Why' Behind the Resume",
    detail:
      "Your resume shows what you did; the cover letter should explain *why* it matters to this specific employer.",
  },
];

/* ─── Component ───────────────────────────────────── */
const ResumeCoverAlign = () => {
  return (
    <section className="space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-red-600">
          Align Your Cover Letter With Your Resume
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Consistent branding and messaging make recruiters feel they’re reading
          a unified story—not two separate documents.
        </p>
      </div>
      {/* Accordion: Practical Checklist */}
      <Accordion
        type="single"
        collapsible
        className="bg-gray-100 rounded-xl p-6 max-w-8xl mx-auto ">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg text-red-500 font-semibold">
            🎯 Quick Alignment Checklist
          </AccordionTrigger>
          <AccordionContent asChild>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Same header: name, phone, email, LinkedIn link</li>
              <li>
                Copy your resume's primary color (e.g.,{" "}
                <span className="text-red-600">red accent</span>)
              </li>
              <li>
                Highlight 1–2 resume bullets verbatim—but add outcome context in
                the cover letter
              </li>
              <li>Show enthusiasm for this role, not a generic objective</li>
              <li>Proofread both together for voice consistency</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Rule Cards */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}>
        {rules.map((rule, idx) => (
          <motion.div
            key={rule.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
            className="bg-white shadow rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <rule.icon className="w-6 h-6 text-red-600" />
              <h3 className="font-semibold text-gray-800">{rule.title}</h3>
            </div>
            <p className="text-gray-600 text-sm">{rule.detail}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Before / After snippet */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 space-y-3">
          <h4 className="font-bold text-red-600 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Mismatch Example
          </h4>
          <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800">
            {`Resume bullet:
"Improved onboarding process, reducing ramp-up time by 30%."

Cover letter:
"I’m interested in joining your team and learning more
about HR workflows."`}
          </pre>
        </div>

        {/* After */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-5 space-y-3">
          <h4 className="font-bold text-green-700 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Aligned Example
          </h4>
          <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800">
            {`Resume bullet:
"Improved onboarding process, reducing ramp-up time by 30%."

Cover letter:
"That same focus on efficiency is why
I’m excited about your People Ops role.
I’d love to bring my 30% ramp-up reduction
expertise to streamline Acme’s onboarding."`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default ResumeCoverAlign;
