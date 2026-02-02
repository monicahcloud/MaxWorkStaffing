"use client";

import { EditorFormProps } from "@/lib/types";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { useMemo } from "react";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinalReviewForm({ resumeData }: EditorFormProps) {
  const theme = useMemo(
    () => THEME_REGISTRY.find((t) => t.id === resumeData.themeId),
    [resumeData.themeId]
  );

  const category = theme?.category || "chronological";

  const auditResults = useMemo(() => {
    const checks = [
      {
        section: "Personal Info",
        status: resumeData.firstName && resumeData.email ? "pass" : "fail",
        message: resumeData.firstName
          ? "Contact details are set."
          : "Missing core contact info.",
      },
      {
        section: "Professional Summary",
        status: (resumeData.summary?.length ?? 0) > 50 ? "pass" : "warn",
        message:
          (resumeData.summary?.length ?? 0) > 50
            ? "Summary is engaging."
            : "Summary is a bit short for impact.",
      },
      {
        section: "Work Experience",
        status:
          (resumeData.workExperiences?.length ?? 0) >= 2 ? "pass" : "warn",
        message:
          (resumeData.workExperiences?.length ?? 0) >= 2
            ? "Good experience density."
            : "Try adding at least 2 roles.",
      },
      // NEW: Education Check
      {
        section: "Education",
        status: (resumeData.education?.length ?? 0) >= 1 ? "pass" : "fail",
        message:
          (resumeData.education?.length ?? 0) >= 1
            ? "Academic history verified."
            : "Add at least one degree or certificate.",
      },
      // NEW: Tech Skills Check
      {
        section: "Technical Skills",
        status: (resumeData.techSkills?.length ?? 0) >= 3 ? "pass" : "warn",
        message:
          (resumeData.techSkills?.length ?? 0) >= 3
            ? "Technical stack is strong."
            : "Consider adding more specific tools.",
      },
    ];

    // Category Specific Checks
    if (category === "federal") {
      const federalCheck = resumeData.workExperiences?.every(
        (exp) => exp.grade && exp.hours
      );
      checks.push({
        section: "Federal Compliance",
        status: federalCheck ? "pass" : "fail",
        message: federalCheck
          ? "GS-Grade and Hours included."
          : "Federal roles must include Grade and Hours.",
      });
    }

    return checks;
  }, [resumeData, category]);

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-2">
          <Sparkles className="size-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-wide italic">
          AI Final Audit
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Reviewing your content against the{" "}
          <span className="text-blue-600 font-bold">{theme?.name}</span>{" "}
          archetype.
        </p>
      </div>

      <div className="grid gap-3">
        {auditResults.map((result, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center justify-between p-4 rounded-2xl border transition-all",
              result.status === "pass"
                ? "bg-white border-slate-100"
                : "bg-red-50/5 border-red-100"
            )}>
            <div className="flex items-center gap-3">
              {result.status === "pass" ? (
                <CheckCircle2 className="size-5 text-green-500" />
              ) : (
                <AlertCircle
                  className={cn(
                    "size-5",
                    result.status === "fail"
                      ? "text-red-500"
                      : "text-yellow-500"
                  )}
                />
              )}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {result.section}
                </p>
                <p className="text-xs font-medium text-slate-700">
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 bg-slate-900 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            AI Career Coach Advice
          </p>
          <p className="text-xs leading-relaxed opacity-90 italic">
            "Your {category} resume looks{" "}
            {auditResults.every((r) => r.status === "pass")
              ? "highly competitive and ATS-optimized"
              : "structured well, but has room for improvement"}
            .
            {category === "federal"
              ? " Federal HR specialists spend only seconds looking for your GS-grade; ensure it stands out."
              : " Remember to keep your most relevant skills in the top third of the page."}
            "
          </p>
        </div>
        <Sparkles className="absolute -right-4 -bottom-4 size-24 text-white/5 rotate-12" />
      </div>
    </div>
  );
}
