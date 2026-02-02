"use client";

import { useMemo, useRef } from "react"; // Added useRef
import { ResumeValues } from "@/lib/validation";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { cn } from "@/lib/utils";
import ResumePreview from "@/components/ResumePreview";

interface ResumePreviewContainerProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewContainer({
  resumeData,
  className,
}: ResumePreviewContainerProps) {
  // Fixes ts(2322): Create a real RefObject instead of passing null
  const contentRef = useRef<HTMLDivElement>(null);

  const theme = useMemo(() => {
    return THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
  }, [resumeData.themeId]);

  const category = theme?.category || "chronological";

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center overflow-y-auto bg-slate-100/50 p-6 custom-scrollbar",
        className
      )}>
      {/* Archetype Badge */}
      <div className="mb-4 flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm border border-slate-200 animate-in fade-in zoom-in duration-300">
        <div
          className={cn(
            "size-2 rounded-full animate-pulse",
            category === "federal" ? "bg-red-600" : "bg-blue-600"
          )}
        />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
          {category} Viewport
        </span>
      </div>

      <div
        className={cn(
          "relative bg-white shadow-2xl transition-all duration-500 ease-in-out",
          category === "federal"
            ? "max-w-[800px] w-full"
            : "max-w-[794px] w-full",
          "min-h-[1123px]"
        )}>
        {/* Pass the actual ref object here */}
        <ResumePreview resumeData={resumeData} contentRef={contentRef} />
      </div>

      {/* Design-Aware Floating Tip */}
      <div className="mt-8 max-w-[400px] text-center space-y-1">
        <p className="text-[10px] font-bold uppercase text-slate-400">
          {category} Layout Engine
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed italic">
          {category === "federal"
            ? "Compliance-first layout: Single column, high density, and GS-compliant spacing."
            : "Creative-first layout: Visual balance with sidebar integration and white-space optimization."}
        </p>
      </div>
    </div>
  );
}
