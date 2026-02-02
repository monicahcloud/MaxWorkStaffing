import React from "react";
import { renderToString } from "react-dom/server";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";

export function getResumeHtml(resumeData: any) {
  const resumeValues = mapToResumeValues(resumeData);
  return renderToString(
    <div style={{ width: "210mm" }}>
      <ResumePreview resumeData={resumeValues} />
    </div>
  );
}
