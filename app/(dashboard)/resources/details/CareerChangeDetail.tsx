"use client";

import React from "react";
import Image from "next/image";

const CareerChangersDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <section className="space-y-5 max-w-4xl mx-auto px-4">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline font-medium">
        ← Back to Resume Tips
      </button>

      <h2 className="text-3xl font-bold text-red-600">
        Career Change Resume Guide
      </h2>
      <p className="text-gray-700">
        Shifting careers? Your prior experience still matters—you just need to
        reframe it. This guide helps you connect the dots for employers.
      </p>
      <Image
        src="/blog/office.webp"
        alt="career changes"
        width={250}
        height={300}
        className="rounded-lg shadow mx-auto absolute top-95 right-30 z-100 bg-white text-gray-800 border p-1 hover:bg-gray-100 transition"
      />
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🔍 Step 1: Start With a Strong Career Summary
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Explain the shift and what value you bring to the new field.
            </li>
            <li>
              Example: <br />
              <span className="italic text-gray-600">
                “Former educator transitioning into UX design—bringing deep
                empathy, communication skills, and a passion for user-centered
                solutions.”
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🧩 Step 2: Use a Combination Resume Format
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Start with a “Core Skills” section before listing work history.
            </li>
            <li>
              This draws attention to transferable skills first—before job
              titles.
            </li>
            <li>
              Example:
              <ul className="list-inside list-disc pl-5 text-gray-600">
                <li>Project Management</li>
                <li>Process Improvement</li>
                <li>Client Communication</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🔄 Step 3: Translate Past Experience Into Relevant Language
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              “Taught high school biology” → “Designed and delivered
              instructional content to diverse learners.”
            </li>
            <li>
              “Managed a retail team” → “Led and coached staff in a fast-paced,
              customer-facing environment.”
            </li>
            <li>
              Avoid jargon tied to your old field—focus on outcomes and skills.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            📈 Step 4: Include Results That Demonstrate Your Value
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Numbers still matter! Show impact, even if from a different
              industry.
            </li>
            <li>
              Example: <br />
              <span className="italic text-gray-600">
                “Improved customer satisfaction scores by 20% by implementing a
                new service feedback loop.”
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            ✍️ Step 5: Use Your Cover Letter to Tell the Story
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Your resume should show you're qualified—your cover letter should
              show why you're passionate.
            </li>
            <li>
              Address the career change clearly, briefly, and with intention.
            </li>
            <li>
              Be confident: you’re not starting over—you’re building on a strong
              foundation.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CareerChangersDetail;
