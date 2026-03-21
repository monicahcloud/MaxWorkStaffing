import SectionHeading from "./SectionHeading";
import { SectionProps } from "./types";

function getSectionSpacingClass(visualStyle: SectionProps["visualStyle"]) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-2";
  if (visualStyle.sectionSpacing === "airy") return "space-y-4";
  return "space-y-3";
}

export default function SummarySection({ data, visualStyle }: SectionProps) {
  if (!data.summary) return null;

  return (
    <div className={getSectionSpacingClass(visualStyle)}>
      <SectionHeading title="Professional Summary" visualStyle={visualStyle} />
      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
        {data.summary}
      </p>
    </div>
  );
}
