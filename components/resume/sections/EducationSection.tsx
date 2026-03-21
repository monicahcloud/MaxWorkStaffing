import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { SectionProps } from "./types";

function getSectionSpacingClass(visualStyle: SectionProps["visualStyle"]) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-2";
  if (visualStyle.sectionSpacing === "airy") return "space-y-4";
  return "space-y-3";
}

function getItemSpacingClass(visualStyle: SectionProps["visualStyle"]) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-0";
  if (visualStyle.sectionSpacing === "airy") return "space-y-1";
  return "space-y-0.5";
}

function formatEducationDate(date?: string) {
  if (!date) return "";
  try {
    return formatDate(new Date(date), "MMM yyyy");
  } catch {
    return date;
  }
}

export default function EducationSection({
  data,
  theme,
  visualStyle,
}: SectionProps) {
  const education = data.education?.filter((edu) => edu.school || edu.degree);
  if (!education?.length) return null;

  const isSidebarLayout =
    theme.layout === "sidebar-left" ||
    theme.layout === "sidebar-right" ||
    theme.layout === "modern-split";

  return (
    <div className={getSectionSpacingClass(visualStyle)}>
      <SectionHeading title="Education" visualStyle={visualStyle} />

      {education.map((edu, index) => {
        const start = formatEducationDate(edu.startDate);
        const end = formatEducationDate(edu.endDate);
        const dateRange =
          start || end
            ? `${start || ""}${start && end ? " - " : ""}${end || ""}`
            : "";

        return (
          <div
            key={index}
            className={cn(
              getItemSpacingClass(visualStyle),
              isSidebarLayout && "rounded-md",
            )}>
            {isSidebarLayout ? (
              <div className="space-y-1">
                <h3 className="text-sm font-bold leading-snug text-slate-900">
                  {edu.degree}
                </h3>

                {visualStyle.educationStyle === "inline" ? (
                  <p className="text-xs font-semibold leading-snug text-slate-500">
                    {[edu.school, edu.location].filter(Boolean).join(" • ")}
                  </p>
                ) : (
                  <>
                    <p className="text-xs font-semibold leading-snug text-slate-500">
                      {edu.school}
                    </p>

                    {edu.location && (
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        {edu.location}
                      </p>
                    )}
                  </>
                )}

                {dateRange && (
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {dateRange}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900">
                    {edu.degree}
                  </h3>

                  {visualStyle.educationStyle === "inline" ? (
                    <p className="text-xs font-semibold text-slate-500">
                      {[edu.school, edu.location].filter(Boolean).join(" • ")}
                    </p>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-slate-500">
                        {edu.school}
                      </p>

                      {edu.location && (
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">
                          {edu.location}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {dateRange && (
                  <span className="shrink-0 text-[10px] font-bold uppercase text-slate-400">
                    {dateRange}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
