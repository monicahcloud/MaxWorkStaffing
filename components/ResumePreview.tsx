import { ResumeValues } from "@/lib/validation";
import { Ref } from "react";
import ChronologicalResumePreview from "./resumeTemplates/ChronologicalResumePreview";
import FederalResumePreview from "./resumeTemplates/FederalResumePreview";
import CombinationResumePreview from "./resumeTemplates/CombinationResumePreview";
import FunctionalResumePreview from "./resumeTemplates/FunctionalResumePreview";

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
    case "Combination Resume":
      return (
        <CombinationResumePreview
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
    case "functional":
      return (
        <FunctionalResumePreview
          resumeData={resumeData}
          contentRef={contentRef}
          className={className}
        />
      );
  }
}
