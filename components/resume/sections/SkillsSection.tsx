import { Badge } from "@/components/ui/badge";
import SectionHeading from "./SectionHeading";
import { SectionProps } from "./types";
import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";
import { cn } from "@/lib/utils";

function getSectionSpacingClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-2";
  if (visualStyle.sectionSpacing === "airy") return "space-y-4";
  return "space-y-3";
}

function getListSpacingClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-1";
  if (visualStyle.sectionSpacing === "airy") return "space-y-2";
  return "space-y-1.5";
}

function getCompactGapClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "gap-1";
  if (visualStyle.sectionSpacing === "airy") return "gap-2";
  return "gap-1.5";
}

function getChipGapClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "gap-1.5";
  if (visualStyle.sectionSpacing === "airy") return "gap-2.5";
  return "gap-2";
}

export default function SkillsSection({ data, visualStyle }: SectionProps) {
  if (!data.skills?.length) return null;

  return (
    <div className={getSectionSpacingClass(visualStyle)}>
      <SectionHeading title="Competencies" visualStyle={visualStyle} />

      {visualStyle.skillsStyle === "list" ? (
        <ul
          className={cn(
            "text-xs font-medium text-slate-600",
            getListSpacingClass(visualStyle),
          )}>
          {data.skills.map((skill, index) => (
            <li key={index}>• {skill}</li>
          ))}
        </ul>
      ) : visualStyle.skillsStyle === "compact" ? (
        <div
          className={cn("grid grid-cols-1", getCompactGapClass(visualStyle))}>
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className="rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold uppercase text-slate-700">
              {skill}
            </div>
          ))}
        </div>
      ) : (
        <div className={cn("flex flex-wrap", getChipGapClass(visualStyle))}>
          {data.skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md border-none bg-slate-100 text-[10px] font-bold uppercase text-slate-700 hover:bg-slate-200">
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
