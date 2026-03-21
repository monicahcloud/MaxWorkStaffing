import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { SectionProps } from "./types";
import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";

function getSectionSpacingClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-2";
  if (visualStyle.sectionSpacing === "airy") return "space-y-4";
  return "space-y-3";
}

function getListSpacingClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-1.5";
  if (visualStyle.sectionSpacing === "airy") return "space-y-3";
  return "space-y-2";
}

export default function TechnicalSkillsSection({
  data,
  visualStyle,
}: SectionProps) {
  if (!data.techSkills?.length) return null;

  return (
    <div className={getSectionSpacingClass(visualStyle)}>
      <SectionHeading title="Technical Expertise" visualStyle={visualStyle} />

      <div className={getListSpacingClass(visualStyle)}>
        {data.techSkills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase text-slate-700">
              {skill.name}
            </span>

            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  className={cn(
                    "size-1.5 rounded-full",
                    dot <= (skill.rating || 0)
                      ? "bg-[var(--primary)]"
                      : "bg-slate-200",
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
