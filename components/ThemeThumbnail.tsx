/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ResumeThemeToken } from "@/lib/resume-theme-registry";
import DynamicResumePreview from "./DynamicResumePreview";

// High-quality mock data for the gallery
const GALLERY_PREVIEW_DATA = {
  firstName: "Alex",
  lastName: "Rivera",
  jobTitle: "Senior Operations Director",
  email: "a.rivera@example.com",
  phone: "555-0199",
  address: "Chicago, IL",
  summary:
    "Accomplished leader with 15 years of experience specializing in organizational efficiency and large-scale project management.",
  workExperiences: [
    {
      position: "Lead Architect",
      company: "TECH GLOBAL",
      startDate: "2020-01-01",
      description:
        "Directed the architectural vision for high-traffic platforms serving millions of users.",
    },
    {
      position: "Regional Director",
      company: "Global Logistics Corp",
      startDate: "2018-06-01",
      description:
        "Optimized supply chain routes resulting in a 20% reduction in annual overhead.",
    },
  ],
  education: [{ school: "Northwestern University", degree: "M.S. Management" }],
  skills: ["Strategic Planning", "P&L Management", "Team Leadership"],
};

export default function ThemeThumbnail({ theme }: { theme: ResumeThemeToken }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-50/50 p-6">
      {/* The Shadow and Border container represents the 'Paper'.
         origin-center + flex centering on parent keeps the preview perfectly aligned.
      */}
      <div className="relative aspect-[210/297] h-full w-full overflow-hidden rounded-sm border border-slate-200 bg-white shadow-2xl transition-all duration-500 group-hover:scale-[1.03]">
        <div className="absolute inset-0 flex items-start justify-center">
          <div className="origin-top scale-[0.25] w-[794px] h-[1123px] shrink-0">
            <DynamicResumePreview
              resumeData={GALLERY_PREVIEW_DATA as any}
              theme={theme}
            />
          </div>
        </div>

        {/* Subtle paper texture/gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-black/5" />
      </div>
    </div>
  );
}
