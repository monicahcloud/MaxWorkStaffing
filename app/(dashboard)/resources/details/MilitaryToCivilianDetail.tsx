"use client";

import React from "react";
import Image from "next/image";

const MilitaryToCivilianDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <section className="space-y-5 max-w-4xl mx-auto px-4 relative">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline font-medium">
        ← Back to Resume Tips
      </button>

      <h2 className="text-3xl font-bold text-red-600">
        Military to Civilian Resume Guide
      </h2>
      <p className="text-gray-700">
        Transitioning your military experience into civilian job language can be
        challenging—but it's entirely doable. Here's how to do it step by step.
      </p>

      <Image
        src="/blog/handshake.webp"
        alt="Man transitioning from military to civilian career"
        width={270}
        height={300}
        className="rounded-lg shadow mx-auto absolute -right-2 z-95 bg-white text-gray-800 border p-1 hover:bg-gray-100 transition"
      />

      <div className="space-y-6">
        {/* Step 1 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🪖 Step 1: Translate Your Titles
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Use tools like O*NET’s Military Crosswalk or Military.com’s
              translator.
            </li>
            <li>
              Convert "Operations NCO" to “Operations Manager” or "Team
              Supervisor."
            </li>
            <li>
              Avoid acronyms unless you explain them in parentheses the first
              time.
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🧭 Step 2: Focus on Transferable Skills
          </h3>
          <p className="text-gray-700">Highlight your experience in:</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Leadership: Team supervision, morale, task delegation</li>
            <li>Logistics: Inventory, supply chain, procurement</li>
            <li>
              Training: Mentorship, onboarding, standard operating procedures
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            💬 Step 3: Use Civilian-Friendly Language
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              “Managed mission-critical operations” → “Oversaw complex projects
              with tight deadlines”
            </li>
            <li>
              “Led a platoon of 30 soldiers” → “Managed and trained a team of 30
              personnel”
            </li>
          </ul>
        </div>

        {/* Step 4 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            ✅ Step 4: Show Measurable Results
          </h3>
          <p className="text-gray-700">Wherever possible, include metrics:</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>“Reduced maintenance backlog by 40%”</li>
            <li>“Improved equipment readiness from 65% to 92%”</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MilitaryToCivilianDetail;
