"use client";

import React, { useRef } from "react";
import { ResumeValues } from "@/lib/validation";
import {
  ColorPalettes,
  FontPairs,
  ResumeThemeToken,
} from "@/lib/resume-theme-registry";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import {
  EducationSection,
  PersonalInfoHeader,
  SkillsSection,
  SummarySection,
  WorkExperienceSection,
} from "./sections";

interface DynamicResumePreviewProps {
  resumeData: ResumeValues;
  theme: ResumeThemeToken;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function DynamicResumePreview({
  resumeData,
  theme,
  className,
  contentRef,
}: DynamicResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  // 1. Safe lookup for palette and font data from your Registry
  const palette =
    ColorPalettes[theme.paletteId as keyof typeof ColorPalettes] ||
    ColorPalettes["classic-business"];
  const fonts =
    FontPairs[theme.fontId as keyof typeof FontPairs] ||
    FontPairs["professional"];

  // 2. Map Registry tokens to CSS Variables
  const styleVars = {
    "--primary": palette.primary,
    "--secondary": palette.secondary,
    "--accent": palette.accent,
    "--font-heading": fonts.heading,
    "--font-body": fonts.body,

    // Density & Spacing Logic
    "--resume-padding":
      theme.spacing === "compact"
        ? "1.25rem"
        : theme.spacing === "relaxed"
        ? "3rem"
        : "2rem",

    "--line-height":
      theme.spacing === "compact"
        ? "1.15"
        : theme.spacing === "relaxed"
        ? "1.6"
        : "1.4",

    "--section-gap": theme.spacing === "compact" ? "0.75rem" : "1.5rem",

    // Scale logic to maintain A4 proportions (794px width)
    width: "794px",
    transform: `scale(${width / 794})`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297] shadow-lg overflow-hidden",
        className
      )}
      ref={containerRef}>
      <div
        style={styleVars}
        className={cn(
          "resume-paper origin-top-left transition-all duration-500",
          !width && "invisible"
        )}
        // These data attributes trigger the specific CSS archetypes you wrote
        data-layout={theme.layout}
        data-category={theme.category}
        data-spacing={theme.spacing}
        ref={contentRef}>
        {/* --- Header Section --- */}
        <header className="resume-header">
          <PersonalInfoHeader data={resumeData} />
        </header>

        {/* --- Sidebar (Moves via grid-area: sidebar) --- */}
        <aside className="resume-sidebar">
          <SkillsSection data={resumeData} />
          {/* Functional designs prioritize skills and often move education here */}
          {theme.category === "functional" && (
            <div className="mt-6">
              <EducationSection data={resumeData} />
            </div>
          )}
        </aside>

        {/* --- Main Content (Moves via grid-area: main) --- */}
        <main className="resume-main">
          <SummarySection data={resumeData} />
          <WorkExperienceSection data={resumeData} />

          {/* Non-functional designs keep education in the main flow */}
          {theme.category !== "functional" && (
            <div className="mt-4">
              <EducationSection data={resumeData} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
