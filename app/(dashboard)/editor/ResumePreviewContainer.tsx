"use client";

import { useMemo, useRef } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import DynamicResumePreview from "@/components/DynamicResumePreview";
import { getValidResumeTheme } from "@/lib/get-valid-resume-theme";

interface ResumePreviewContainerProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}
const PREVIEW_FALLBACK_DATA: ResumeValues = {
  resumeTitle: "Professional Resume",
  description: "",
  resumeType: "chronological",
  themeId: "chronological-classic",
  showPhoto: true,
  firstName: "Alex",
  lastName: "Rivera",
  jobTitle: "Senior Operations Director",
  email: "a.rivera@example.com",
  phone: "555-0199",
  address: "Chicago, IL",
  summary:
    "Accomplished leader with 15 years of experience specializing in organizational efficiency, operational strategy, and large-scale team leadership.",
  skills: ["Strategic Planning", "Operations", "Team Leadership", "Execution"],
  workExperiences: [
    {
      position: "Lead Architect",
      company: "Tech Global",
      startDate: "2020-01-01",
      endDate: "",
      location: "Chicago, IL",
      description:
        "Directed the architectural vision for high-traffic platforms serving millions of users and improved cross-functional delivery standards.",
      duties: "",
      responsibilities: "",
      accomplishments: "",
      clearance: "",
      status: "",
      grade: "",
      hours: "",
    },
    {
      position: "Regional Director",
      company: "Global Logistics Corp",
      startDate: "2018-06-01",
      endDate: "",
      location: "Illinois",
      description:
        "Optimized regional operations and reduced annual overhead through improved routing, reporting, and team coordination.",
      duties: "",
      responsibilities: "",
      accomplishments: "",
      clearance: "",
      status: "",
      grade: "",
      hours: "",
    },
  ],
  education: [
    {
      school: "Northwestern University",
      degree: "M.S. Management",
      startDate: "",
      endDate: "",
      location: "",
    },
  ],
  techSkills: [
    { name: "Excel", rating: 4 },
    { name: "SQL", rating: 4 },
    { name: "Dashboard Reporting", rating: 5 },
  ],
  interest: ["Leadership", "Innovation"],
  themeColor: "",
  borderStyle: "",
  shareToken: "",
};

function pickText(value: string | undefined, fallback: string) {
  return value && value.trim() ? value : fallback;
}

export default function ResumePreviewContainer({
  resumeData,
  className,
}: ResumePreviewContainerProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const activeTheme = useMemo(() => {
    return getValidResumeTheme(resumeData.themeId);
  }, [resumeData.themeId]);

  const previewData = useMemo<ResumeValues>(() => {
    return {
      ...PREVIEW_FALLBACK_DATA,
      ...resumeData,
      firstName: pickText(
        resumeData.firstName,
        PREVIEW_FALLBACK_DATA.firstName || "",
      ),
      lastName: pickText(
        resumeData.lastName,
        PREVIEW_FALLBACK_DATA.lastName || "",
      ),
      jobTitle: pickText(
        resumeData.jobTitle,
        PREVIEW_FALLBACK_DATA.jobTitle || "",
      ),
      email: pickText(resumeData.email, PREVIEW_FALLBACK_DATA.email || ""),
      phone: pickText(resumeData.phone, PREVIEW_FALLBACK_DATA.phone || ""),
      address: pickText(
        resumeData.address,
        PREVIEW_FALLBACK_DATA.address || "",
      ),
      summary: pickText(
        resumeData.summary,
        PREVIEW_FALLBACK_DATA.summary || "",
      ),
      skills:
        resumeData.skills && resumeData.skills.length > 0
          ? resumeData.skills
          : PREVIEW_FALLBACK_DATA.skills,
      workExperiences:
        resumeData.workExperiences && resumeData.workExperiences.length > 0
          ? resumeData.workExperiences
          : PREVIEW_FALLBACK_DATA.workExperiences,
      education:
        resumeData.education && resumeData.education.length > 0
          ? resumeData.education
          : PREVIEW_FALLBACK_DATA.education,
      techSkills:
        resumeData.techSkills && resumeData.techSkills.length > 0
          ? resumeData.techSkills
          : PREVIEW_FALLBACK_DATA.techSkills,
      interest:
        resumeData.interest && resumeData.interest.length > 0
          ? resumeData.interest
          : PREVIEW_FALLBACK_DATA.interest,
      themeId: activeTheme.id,
    };
  }, [resumeData, activeTheme.id]);

  const category = activeTheme.category;

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center overflow-y-auto bg-slate-100/50 p-6 custom-scrollbar",
        className,
      )}>
      <div className="mb-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm animate-in fade-in zoom-in duration-300">
        <div
          className={cn(
            "size-2 rounded-full animate-pulse",
            category === "federal" ? "bg-red-600" : "bg-blue-600",
          )}
        />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
          {category} Viewport
        </span>
      </div>

      <div
        className={cn(
          "relative min-h-[1123px] w-full bg-white shadow-2xl transition-all duration-500 ease-in-out",
          category === "federal" ? "max-w-[800px]" : "max-w-[794px]",
        )}>
        <DynamicResumePreview
          resumeData={previewData}
          theme={activeTheme}
          contentRef={contentRef}
          className="shadow-none"
        />
      </div>

      <div className="mt-8 max-w-[400px] space-y-1 text-center">
        <p className="text-[10px] font-bold uppercase text-slate-400">
          {category} Layout Engine
        </p>
        <p className="text-[11px] italic leading-relaxed text-slate-500">
          {category === "federal"
            ? "Compliance-first layout: Single column, high density, and GS-compliant spacing."
            : "Creative-first layout: Visual balance with sidebar integration and white-space optimization."}
        </p>
      </div>
    </div>
  );
}
