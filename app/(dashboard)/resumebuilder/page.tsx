"use client";

import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { resumeTemplates } from "./ResumeTemplate";
import ResumeTemplateCard from "./ResumeTemplateCard";

function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      {/* Section Title */}
      <div id="templates" className="py-6">
        <SectionTitle
          text="Choose a Template"
          subtext="Create a brand new resume from scratch"
        />
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeTemplates.map((template) => (
          <div key={template.title} className="w-full">
            <ResumeTemplateCard template={template} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
