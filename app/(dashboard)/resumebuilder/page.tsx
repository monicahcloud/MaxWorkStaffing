"use client";
import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { resumeTemplates } from "./ResumeTemplate";
import ResumeTemplateCard from "./ResumeTemplateCard";

function Page() {
  return (
    <>
      <div className="justify-center items-center mx-auto flex"></div>
      <div id="templates" className="px-4 templates">
        <SectionTitle
          text="Choose a Template"
          subtext="Create a brand new resume from scratch"
        />
      </div>
      <div>
        {/* Grid container */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
          {resumeTemplates.map((template) => (
            <div key={template.title} className="w-full">
              <ResumeTemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
