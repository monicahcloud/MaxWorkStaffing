"use client";

import React, { useRef } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
// Ensure these matches your export/import names in sections.tsx
import {
  EducationSection,
  SkillsSection,
  SummarySection,
  WorkExperienceSection,
  PersonalInfoHeader, // Added this
  TechnicalSkillsSection, // Added this
  InterestsSection, // Added this
} from "./sections";

export interface ResumeStyleToken {
  layout: "classic" | "modern-sidebar" | "minimalist" | "brutalist";
  fontPrimary: string;
  fontSecondary: string;
  spacing: "compact" | "normal" | "relaxed";
  primaryColor: string;
  headerStyle: "centered" | "left" | "split";
  borderStyle: "none" | "thin" | "bold";
  category: "federal" | "chronological" | "functional" | "combination"; // Added category to token
}

export default function UniversalResumePreview({
  resumeData,
  styleToken,
  className,
  contentRef,
}: {
  resumeData: ResumeValues;
  styleToken: ResumeStyleToken;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  const dynamicStyles = {
    "--primary": styleToken.primaryColor,
    "--font-main": styleToken.fontPrimary,
    "--font-header": styleToken.fontSecondary,
    width: "794px",
    transform: `scale(${width / 794})`,
  } as React.CSSProperties;

  const isSidebar = styleToken.layout === "modern-sidebar";

  return (
    <div
      className={cn(
        "bg-slate-50 text-black w-full aspect-[210/297] overflow-hidden",
        className
      )}
      ref={containerRef}>
      <div
        ref={contentRef}
        style={dynamicStyles}
        className={cn(
          "origin-top-left transition-all p-12 bg-white min-h-[1123px]",
          styleToken.spacing === "compact" ? "space-y-4" : "space-y-6",
          !width && "invisible"
        )}>
        {/* 1. Header is now style-aware */}
        <div
          className={cn(
            styleToken.headerStyle === "centered" ? "text-center" : "text-left",
            "border-b-2 pb-6"
          )}
          style={{ borderBottomColor: "var(--primary)" }}>
          <PersonalInfoHeader data={resumeData} />
        </div>

        {/* 2. Main Content Grid */}
        <div
          className={cn(
            "grid gap-8",
            isSidebar ? "grid-cols-[1fr_2.5fr]" : "grid-cols-1"
          )}>
          {/* Sidebar (Left) */}
          {isSidebar && (
            <div className="space-y-6">
              <TechnicalSkillsSection data={resumeData} />
              <EducationSection data={resumeData} />
              <SkillsSection data={resumeData} />
              <InterestsSection data={resumeData} />
            </div>
          )}

          {/* Body (Right or Full Width) */}
          <div className="space-y-6">
            <SummarySection data={resumeData} />

            {/* 3. The WorkExperienceSection now uses the category from the token */}
            <WorkExperienceSection data={resumeData} />

            {/* If NOT sidebar, move these to the bottom of the main flow */}
            {!isSidebar && (
              <div className="grid grid-cols-2 gap-8">
                <EducationSection data={resumeData} />
                <TechnicalSkillsSection data={resumeData} />
              </div>
            )}
            {!isSidebar && <InterestsSection data={resumeData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
