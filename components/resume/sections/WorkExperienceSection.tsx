import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { SectionProps } from "./types";
import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";

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

function safeFormatMonthYear(value?: string | Date | null) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return formatDate(date, "MMM yyyy");
}

export default function WorkExperienceSection({
  data,
  visualStyle,
}: SectionProps) {
  const theme = THEME_REGISTRY.find((t) => t.id === data.themeId);
  const isFederal = theme?.category === "federal";

  const experiences = data.workExperiences?.filter(
    (exp) =>
      exp.position ||
      exp.company ||
      exp.description ||
      exp.duties ||
      exp.responsibilities,
  );

  if (!experiences?.length) return null;

  return (
    <section className={getSectionSpacingClass(visualStyle)}>
      <SectionHeading
        title={isFederal ? "Professional Experience" : "Experience"}
        visualStyle={visualStyle}
      />

      <div className={getListSpacingClass(visualStyle)}>
        {experiences.map((exp, index) => {
          const federalDetails = [exp.duties, exp.responsibilities]
            .filter(Boolean)
            .join("\n\n");

          const bodyText = isFederal
            ? federalDetails || exp.description || ""
            : exp.description || "";

          return (
            <div
              key={index}
              className={cn(
                "experience-item break-inside-avoid page-break-inside-avoid",
                getItemSpacingClass(visualStyle),
              )}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "text-sm font-bold uppercase tracking-wider",
                      visualStyle.experienceStyle === "timeline"
                        ? "text-slate-500"
                        : "text-[var(--primary)]",
                    )}>
                    {exp.position}
                  </h3>
                  <p className="text-xs font-bold text-slate-900">
                    {exp.company}
                  </p>
                </div>

                <span className="shrink-0 pt-0.5 text-[12px] font-bold uppercase text-slate-400">
                  {safeFormatMonthYear(exp.startDate)} -{" "}
                  {exp.endDate ? safeFormatMonthYear(exp.endDate) : "Present"}
                </span>
              </div>

              {exp.location && (
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  {exp.location}
                </p>
              )}

              {isFederal &&
                (exp.grade || exp.status || exp.hours || exp.clearance) && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {exp.grade && <span>Grade: {exp.grade}</span>}
                    {exp.status && <span>Series: {exp.status}</span>}
                    {exp.hours && <span>Hours/Week: {exp.hours}</span>}
                    {exp.clearance && <span>Clearance: {exp.clearance}</span>}
                  </div>
                )}

              {bodyText && (
                <div className="whitespace-pre-line text-[11px] leading-relaxed text-slate-600">
                  {bodyText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
