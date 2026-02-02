"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  ListOrdered,
  LayoutIcon,
} from "lucide-react";
import { motion } from "framer-motion";

/* ─── DATA ────────────────────────────────────────── */
const timelineTips = [
  {
    title: "Use Standard Headings",
    description:
      "Stick to conventional titles like “Work Experience”, “Education”, and “Skills”. ATS may skip creative alternatives like “My Journey”.",
  },
  {
    title: "Avoid Graphics and Tables",
    description:
      "ATS can’t read text inside images, charts, or tables. Keep the layout text-based.",
  },
  {
    title: "Use Keywords from the Job Description",
    description:
      "Mirror the exact wording from the posting (e.g., “budget forecasting”) when relevant.",
  },
  {
    title: "Submit as PDF or DOCX",
    description:
      "Most modern ATS read PDFs, but DOCX is always safe. Follow the employer’s instructions.",
  },
  {
    title: "Stick to Simple Fonts and Layout",
    description:
      "Use system fonts (Arial, Calibri, Times New Roman) and a single column.",
  },
];

const previewExamples = [
  {
    label: "Formatting",
    before: `📄 Used a 2-column layout with icons and graphics.

✦ Work 🛠️ | Education 🎓 | Skills ⚙️`,
    after: `✅ Switched to a clean, single-column layout with clear headings.

Work Experience | Education | Skills`,
  },
  {
    label: "Language",
    before: `Objective: Seeking a position where I can grow and develop.`,
    after: `Summary: Results-driven analyst with 3+ years in logistics; skilled in improving supply-chain performance.`,
  },
  {
    label: "Keywords",
    before: `“Managed vendor relationships” (missing “procurement”)`,
    after: `“Managed vendor relationships and led procurement strategy for enterprise software tools.”`,
  },
  {
    label: "Graphics",
    before: `Included a bar chart to show skill levels (e.g., Excel: ████░)`,
    after: `Replaced with a text-based bullet list: Excel • Data Analysis • Power BI`,
  },
];

/* ─── TOGGLE BUTTON ──────────────────────────────── */
const ToggleButton = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition
    ${
      active
        ? "bg-red-600 text-white"
        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
    }`}>
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

/* ─── MAIN COMPONENT ─────────────────────────────── */
const ResumeATS = () => {
  const [view, setView] = useState<"timeline" | "preview">("timeline");

  return (
    <section className="space-y-16">
      {/* Header & Toggle */}
      <div className="text-center space-y-6">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-red-600">
            Application Tracking System (ATS) Resume Optimization
          </h2>
          {/* <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Choose a view to learn how to make your resume ATS-friendly.
          </p> */}
          <p className="text-gray-700 max-w-2xl mx-auto text-md italic">
            Many companies use Applicant Tracking Systems (ATS) to filter
            resumes before a human even sees them. <br />
            If your resume isn’t optimized, it could be rejected automatically.
            <br />
            The good news?{" "}
            <span className="text-red-600 font-extrabold">
              You can beat the bots
            </span>
            —and we’ll show you how.
          </p>
        </div>

        <div className="inline-flex gap-2">
          <ToggleButton
            active={view === "timeline"}
            onClick={() => setView("timeline")}
            icon={ListOrdered}
            label="ATS-Proof Your Resume"
          />
          <ToggleButton
            active={view === "preview"}
            onClick={() => setView("preview")}
            icon={LayoutIcon}
            label="Before & After Preview"
          />
        </div>
      </div>

      {/* ── TIMELINE TAB ────────────────────────────── */}
      {view === "timeline" && (
        <>
          <div className="relative border-l-2 border-gray-300 pl-6 space-y-10 max-w-3xl mx-auto">
            {timelineTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative pl-6">
                <CheckCircle2 className="absolute -left-7 top-1 text-green-600 w-5 h-5 bg-white" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {tip.title}
                </h3>
                <p className="text-gray-600">{tip.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mistakes */}
          <div className="bg-red-100 border-l-4 border-red-400 p-6 rounded-xl max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-red-700 font-semibold text-lg mb-3">
              <AlertTriangle className="w-5 h-5" />
              Common ATS Mistakes to Avoid
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>Submitting a scanned image or photo of your resume</li>
              <li>Using columns, graphics, or icons to format content</li>
              <li>Leaving out critical keywords from the job description</li>
              <li>Saving your resume as JPG or PNG instead of PDF or DOCX</li>
              <li>Placing contact info in the header or footer</li>
            </ul>
          </div>

          {/* Bonus tip */}
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-5 rounded-xl text-center max-w-2xl mx-auto">
            <p className="text-gray-800 italic">
              💡 Run your resume through a free ATS checker to see how it
              performs.
            </p>
          </div>
        </>
      )}

      {/* ── PREVIEW TAB ─────────────────────────────── */}
      {view === "preview" && (
        <>
          {/* FULL RESUME COMPARISON */}
          <div className="max-w-5xl mx-auto space-y-6 mt-20">
            <h3 className="text-3xl font-bold text-center text-red-600">
              Full Resume Example: Before vs. After
            </h3>
            <p className="text-gray-700 text-center max-w-2xl mx-auto text-lg">
              A side-by-side comparison of a poorly formatted resume and an
              ATS-ready version.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="bg-red-50 border border-red-200 rounded-lg shadow p-4 space-y-3">
                <h4 className="font-bold text-red-600">
                  ❌ Before: Not ATS-Friendly
                </h4>
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {`OBJECTIVE
To obtain a position where I can grow professionally.

SKILLS
🛠 Leadership 🧠 Problem Solving
📊 Excel ████░░░
📈 PowerPoint ██████

WORK EXPERIENCE
Used table layout with two columns for job titles and dates

EDUCATION
Graphic of diploma with institution name below`}
                </pre>
              </div>

              {/* After */}
              <div className="bg-green-50 border border-green-200 rounded-lg shadow p-4 space-y-3">
                <h4 className="font-bold text-green-700">
                  ✅ After: ATS-Ready
                </h4>
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {`SUMMARY
Operations analyst with 5+ years improving workflows and reducing costs.
Skilled in automation, reporting, and cross-team collaboration.

SKILLS
Leadership | Problem Solving | Microsoft Excel | PowerPoint | Automation

WORK EXPERIENCE
Operations Analyst, Acme Corp · Jan 2021 – Present
• Reduced processing time by 30 % via automated data entries.
• Coordinated cross-department reporting for executives.

EDUCATION
B.S., Business Administration — University of Maryland`}
                </pre>
              </div>
            </div>
          </div>
          {/* Side-by-side examples */}
          <div className="space-y-12 max-w-5xl mx-auto">
            {previewExamples.map((ex, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {ex.label}
                </h3>
                <div className="grid md:grid-cols-2 gap-6 bg-white rounded-xl shadow-md overflow-hidden">
                  {/* Before */}
                  <div className="p-6 border-r border-gray-200 bg-red-50 space-y-2">
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      <AlertTriangle className="w-5 h-5" />
                      Before (Not ATS-Friendly)
                    </div>
                    <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                      {ex.before}
                    </pre>
                  </div>

                  {/* After */}
                  <div className="p-6 bg-green-50 space-y-2">
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      After (ATS-Ready)
                    </div>
                    <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
                      {ex.after}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ResumeATS;
