import { formatDate } from "date-fns";
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
  if (visualStyle.sectionSpacing === "tight") return "space-y-4";
  if (visualStyle.sectionSpacing === "airy") return "space-y-8";
  return "space-y-6";
}

function getItemSpacingClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.experienceStyle === "minimal") return "space-y-1";
  if (visualStyle.sectionSpacing === "airy") return "space-y-3";
  return "space-y-2";
}

export default function WorkExperienceSection({
  data,
  visualStyle,
}: SectionProps) {
  const experiences = data.workExperiences?.filter(
    (exp) => exp.position || exp.company,
  );

  if (!experiences?.length) return null;

  return (
    <section className={getSectionSpacingClass(visualStyle)}>
      <SectionHeading title="Experience" visualStyle={visualStyle} />

      <div className={getListSpacingClass(visualStyle)}>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={cn(
              "experience-item break-inside-avoid page-break-inside-avoid",
              getItemSpacingClass(visualStyle),
            )}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900">
                  {exp.position}
                </h3>

                <p
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    visualStyle.experienceStyle === "timeline"
                      ? "text-slate-500"
                      : "text-[var(--primary)]",
                  )}>
                  {exp.company}
                </p>
              </div>

              <span className="shrink-0 pt-0.5 text-[10px] font-bold uppercase text-slate-400">
                {exp.startDate
                  ? formatDate(new Date(exp.startDate), "MMM yyyy")
                  : ""}{" "}
                -{" "}
                {exp.endDate
                  ? formatDate(new Date(exp.endDate), "MMM yyyy")
                  : "Present"}
              </span>
            </div>

            {exp.location && (
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                {exp.location}
              </p>
            )}

            {exp.description && (
              <div className="whitespace-pre-line text-[11px] leading-relaxed text-slate-600">
                {exp.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
