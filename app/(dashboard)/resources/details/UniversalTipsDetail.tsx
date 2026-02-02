"use client";

import React from "react";
import Image from "next/image";

const UniversalTipsDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <section className="space-y-5 max-w-4xl mx-auto px-4">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline font-medium">
        ← Back to Resume Tips
      </button>

      <h2 className="text-3xl font-bold text-red-600">
        Universal Resume Strategies
      </h2>
      <p className="text-gray-700">
        These essential tips apply to every resume—whether you’re a student, a
        senior executive, or somewhere in between.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🔑 Step 1: Tailor for Every Job
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Mirror keywords from the job description—especially in the summary
              and experience sections.
            </li>
            <li>
              Example: <br />
              <span className="italic text-gray-600">
                Job mentions “client presentations”? Include: “Delivered monthly
                client presentations and demos to executive stakeholders.”
              </span>
            </li>
          </ul>
        </div>
        <Image
          src="/blog/universaltips.png"
          alt="Man transitioning from military to civilian career"
          width={400}
          height={300}
          className="rounded-lg shadow mx-auto absolute  bottom-50 right-10 z-90 bg-white text-gray-800 border p-1 hover:bg-gray-100 transition"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            📐 Step 2: Keep the Format Clean
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Use one font family throughout (Arial, Calibri, or Times).</li>
            <li>
              Keep font sizes readable: 11–12 pt for body text, 14–16 pt for
              section headers.
            </li>
            <li>Avoid columns, graphics, or tables for ATS compatibility.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            📊 Step 3: Use Metrics to Show Impact
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Numbers stand out. Use them whenever possible.</li>
            <li>
              Instead of: “Helped manage social media,” try:
              <br />
              <span className="italic text-gray-600">
                “Grew Instagram engagement by 45% in 3 months.”
              </span>
            </li>
            <li>Results matter more than responsibilities.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🔍 Step 4: Start Bullets with Action Verbs
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Replace “Responsible for…” with:
              <br />
              <span className="italic text-gray-600">
                “Led,” “Created,” “Implemented,” “Streamlined,” “Coordinated”
              </span>
            </li>
            <li>
              Example:
              <br />
              <span className="italic text-gray-600">
                “Implemented a new CRM tool, reducing client onboarding time by
                30%.”
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🔁 Step 5: Proofread… Then Proofread Again
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Typos and formatting errors are the top reasons resumes are
              rejected.
            </li>
            <li>
              Use a tool like Grammarly, or read it out loud to catch small
              mistakes.
            </li>
            <li>
              Consistency matters: Dates, punctuation, bullet style—keep it
              uniform.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UniversalTipsDetail;
