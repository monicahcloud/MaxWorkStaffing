"use client";

import React from "react";
import Image from "next/image";

const CollegeToCareerDetail = ({ onBack }: { onBack: () => void }) => {
  return (
    <section className="space-y-5 max-w-4xl mx-auto px-4">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline font-medium">
        ← Back to Resume Tips
      </button>

      <h2 className="text-3xl font-bold text-red-600">
        College to Career Resume Guide
      </h2>
      <p className="text-gray-700">
        Just graduated or about to? You can still craft a powerful resume—even
        without years of experience. Here's how to spotlight your potential.
      </p>
      <Image
        src="/blog/transition.jpg"
        alt="Man transitioning from military to civilian career"
        width={250}
        height={300}
        className="rounded-lg shadow mx-auto absolute bottom-0 right-5 z-90 bg-white text-gray-800 border p-1 hover:bg-gray-100 transition"
      />
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🎯 Step 1: Lead with a Strong Summary
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Highlight your degree, key strengths, and what you’re looking for.
            </li>
            <li>
              Example: <br />
              <span className="italic text-gray-600">
                “Motivated marketing graduate with hands-on experience in
                digital campaigns and data analytics. Eager to contribute to a
                fast-paced agency environment.”
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🛠️ Step 2: Emphasize Internships & Projects
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>List internships—even unpaid—under work experience.</li>
            <li>
              Class projects that involved research, teamwork, or presentations
              are valuable!
            </li>
            <li>
              Quantify what you did: “Led a 4-person team to develop a business
              plan presented to local investors.”
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🧠 Step 3: Showcase Soft Skills with Examples
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Don’t just say “communication skills”—prove it:
              <br />
              <span className="italic text-gray-600">
                “Presented final UX research findings to a panel of 5 industry
                professionals.”
              </span>
            </li>
            <li>
              Other great skills to mention: collaboration, adaptability,
              time-management, leadership.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            🧾 Step 4: Include Coursework and Certifications
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Especially important if you're applying to a specialized field.
            </li>
            <li>
              Example: <br />
              <span className="italic text-gray-600">
                “Relevant Coursework: Data Structures, Financial Modeling,
                Environmental Policy”
              </span>
            </li>
            <li>
              Add tools: “Proficient in Figma, Excel, Adobe Suite, Python”
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            📄 Step 5: Keep It to One Page
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              Only go to two pages if you have extensive research or work.
            </li>
            <li>
              Focus on your most recent and relevant achievements—quality over
              quantity!
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CollegeToCareerDetail;
