import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  visualStyle: ResumeVisualStyle;
}

function getSectionSpacingClass(visualStyle: ResumeVisualStyle) {
  if (visualStyle.sectionSpacing === "tight") return "space-y-2";
  if (visualStyle.sectionSpacing === "airy") return "space-y-4";
  return "space-y-3";
}

export default function SectionHeading({
  title,
  visualStyle,
}: SectionHeadingProps) {
  const spacingClass =
    visualStyle.sectionSpacing === "tight"
      ? "mb-2"
      : visualStyle.sectionSpacing === "airy"
        ? "mb-4"
        : "mb-3";

  const alignClass =
    visualStyle.headingAlign === "center" ? "justify-center text-center" : "";

  if (visualStyle.sectionTitleStyle === "boxed") {
    return (
      <div className={cn(spacingClass, "flex", alignClass)}>
        <div className="inline-flex rounded-md bg-[var(--primary)] px-3 py-1.5">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
            {title}
          </h2>
        </div>
      </div>
    );
  }

  if (visualStyle.sectionTitleStyle === "bar") {
    return (
      <div className={cn(spacingClass, "flex items-center gap-3", alignClass)}>
        <div className="h-5 w-1 rounded-full bg-[var(--primary)]" />
        <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-900">
          {title}
        </h2>
      </div>
    );
  }

  if (visualStyle.sectionTitleStyle === "caps") {
    return (
      <h2
        className={cn(
          spacingClass,
          "text-[11px] font-black uppercase tracking-[0.24em] text-slate-500",
          visualStyle.headingAlign === "center" && "text-center",
        )}>
        {title}
      </h2>
    );
  }

  return (
    <h2
      className={cn(
        spacingClass,
        "border-b-2 pb-1 text-sm font-black uppercase tracking-[0.2em]",
        visualStyle.headingAlign === "center" && "text-center",
      )}
      style={{ borderBottomColor: "var(--primary)" }}>
      {title}
    </h2>
  );
}
