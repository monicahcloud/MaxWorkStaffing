import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { resumeTemplates } from "./ResumeTemplate";
import ResumeTemplateCard from "./ResumeTemplateCard";

function page() {
  return (
    <>
      <div className="px-4">
        <SectionTitle text="Choose a Template" subtext="" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumeTemplates.map((template) => (
            <ResumeTemplateCard key={template.title} template={template} />
          ))}
        </div>
      </div>
    </>
  );
}

export default page;
