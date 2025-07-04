import { CoverLetterValues } from "@/lib/validation";
import { Ref } from "react";
import Zamar from "../coverletterbuilder/templates/Zamar";
import { TodahTemplate } from "../coverletterbuilder/templates/TodahTemplate";
import { ShabachTemplate } from "../coverletterbuilder/templates/ShabachTemplate";
import ClassicTemplate from "../coverletterbuilder/templates/ClassicTemplate";

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterValues;
  className?: string;
  contentRef?: Ref<HTMLDivElement>;
}

export default function CoverLetterPreview({
  coverLetterData,
  className,
  contentRef,
}: CoverLetterPreviewProps) {
  const { template } = coverLetterData;
  switch (template) {
    case "Zamar":
      return (
        <Zamar
          coverletterData={coverLetterData}
          className={className}
          contentRef={contentRef}
        />
      );
    case "Classic":
      return (
        <ClassicTemplate
          coverletterData={coverLetterData}
          className={className}
          contentRef={contentRef}
        />
      );
    case "Todah":
      return (
        <TodahTemplate
          coverletterData={coverLetterData}
          className={className}
          contentRef={contentRef}
        />
      );
    case "Shabach":
    default:
      return (
        <ShabachTemplate
          coverletterData={coverLetterData}
          className={className}
          contentRef={contentRef}
        />
      );
  }
}
