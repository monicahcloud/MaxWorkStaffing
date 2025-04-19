import { ResumeValues } from "@/lib/validation";
import { Ref } from "react";
import ChronologicalResumePreview from "./resumeTemplates/ChronologicalResumePreview";
import FederalResumePreview from "./resumeTemplates/FederalResumePreview";
interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: Ref<HTMLDivElement>;
}

export default function ResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const { resumeType } = resumeData;

  switch (resumeType) {
    case "federal":
      return (
        <FederalResumePreview
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
    case "chronological":
    default:
      return (
        <ChronologicalResumePreview
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
  }
}
