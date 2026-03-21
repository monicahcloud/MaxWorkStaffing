import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";
import SectionHeading from "./SectionHeading";
import { SectionProps } from "./types";

function getSectionSpacingClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-2";
  if (visualStyle.sectionSpacing === "airy") return "space-y-4";
  return "space-y-3";
}
export default function InterestsSection({ data, visualStyle }: SectionProps) {
  if (!data.interest?.length) return null;
  const textSize =
    visualStyle.sectionSpacing === "airy"
      ? "text-[14px]"
      : visualStyle.sectionSpacing === "tight"
        ? "text-[13px]"
        : "text-[13px]";
  return (
    <div className={getSectionSpacingClass(visualStyle)}>
      <SectionHeading title="Interests" visualStyle={visualStyle} />
      <p
        className={`${textSize} italic font-medium leading-relaxed text-slate-500`}>
        {data.interest.join(" • ")}
      </p>
    </div>
  );
}
