import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { resumeTemplates } from "./ResumeTemplate";
import ResumeTemplateCard from "./ResumeTemplateCard";

function Page() {
  return (
    <>
      <div className="px-4">
        <SectionTitle text="Choose a Template" subtext="" />
        <div className="flex overflow-x-auto space-x-6 py-4">
          {resumeTemplates.map((template) => (
            <div key={template.title} className="flex-shrink-0 w-80">
              <ResumeTemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
