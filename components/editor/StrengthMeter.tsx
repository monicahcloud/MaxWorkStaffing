"use client";

import { useMemo } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { ShieldCheck, Zap, AlertCircle } from "lucide-react";

interface StrengthMeterProps {
  resumeData: ResumeValues;
  category: string;
}

export default function StrengthMeter({
  resumeData,
  category,
}: StrengthMeterProps) {
  const score = useMemo(() => {
    let total = 0;

    // 1. Core Data (Universal)
    if (resumeData.firstName && resumeData.lastName) total += 10;
    if (resumeData.email && resumeData.phone) total += 10;
    if (resumeData.summary && (resumeData.summary?.length ?? 0) > 50)
      total += 15;

    // 2. Experience Check
    const expCount = resumeData.workExperiences?.length || 0;
    if (expCount >= 1) total += 10;
    if (expCount >= 3) total += 10;

    // 3. Archetype Specific "Design DNA" Scoring
    // We use theme category to ensure federal fields like duties/hours are rewarded
    if (category === "federal") {
      const hasFederalFields = resumeData.workExperiences?.every(
        (exp) => (exp.duties || exp.description) && exp.hours && exp.grade
      );
      if (hasFederalFields) total += 30;
      if (
        resumeData.workExperiences?.some(
          (exp) =>
            (exp.description?.length ?? 0) > 300 ||
            (exp.duties?.length ?? 0) > 300
        )
      )
        total += 15;
    } else if (category === "functional" || category === "creative") {
      if (resumeData.skills && (resumeData.skills?.length ?? 0) >= 5)
        total += 20;
      if (resumeData.photo) total += 25;
    } else {
      // Combination / Chronological
      if (resumeData.techSkills && (resumeData.techSkills?.length ?? 0) >= 3)
        total += 25;
      if (resumeData.education && (resumeData.education?.length ?? 0) >= 1)
        total += 20;
    }

    return Math.min(total, 100);
  }, [resumeData, category]);

  // Unified color mapping to prevent "mixed up" styles
  const config = useMemo(() => {
    if (score < 40)
      return {
        label: "Weak",
        color: "text-red-600",
        bg: "bg-red-600",
        icon: <Zap className="size-4 text-red-500" />,
      };
    if (score < 70)
      return {
        label: "Good",
        color: "text-yellow-600",
        bg: "bg-yellow-500",
        icon: <Zap className="size-4 text-yellow-500" />,
      };
    return {
      label: "Strong",
      color: "text-green-600",
      bg: "bg-green-600",
      icon: <ShieldCheck className="size-4 text-green-600" />,
    };
  }, [score]);

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {config.icon}
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            {category} Strength
          </span>
        </div>
        <span
          className={cn(
            "text-xs font-black uppercase tracking-tight",
            config.color
          )}>
          {config.label} ({score}%)
        </span>
      </div>

      {/* CUSTOM PROGRESS BAR: Replacing <Progress /> to fix color bugs */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-out",
            config.bg
          )}
          style={{ width: `${score}%` }}
        />
      </div>

      {score < 80 && (
        <div className="flex items-start gap-2 pt-1 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="size-3 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[9px] text-slate-500 leading-tight font-medium">
            <span className="font-bold">Pro Tip:</span>{" "}
            {category === "federal"
              ? "Ensure Grade (GS-XX) and Hours per week are listed for all roles."
              : "Increase your skill count to at least 8 to boost your ATS score."}
          </p>
        </div>
      )}
    </div>
  );
}
