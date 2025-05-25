import { CoverLetterValues } from "@/lib/validation";
import Zamar from "../coverletterbuilder/templates/Zamar";
import { TodahTemplate } from "../coverletterbuilder/templates/TodahTemplate";
import { ShabachTemplate } from "../coverletterbuilder/templates/ShabachTemplate";

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function CoverLetterPreview({
  coverLetterData,
  className,
  contentRef,
}: CoverLetterPreviewProps) {
  switch (coverLetterData.template) {
    case "Zamar":
      return (
        <Zamar
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
