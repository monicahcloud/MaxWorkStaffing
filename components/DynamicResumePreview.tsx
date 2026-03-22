"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  InterestsSection,
  PersonalInfoHeader,
  SkillsSection,
  SummarySection,
  TechnicalSkillsSection,
  WorkExperienceSection,
} from "@/components/resume/sections";
import { getResumeVisualStyle } from "@/lib/get-resume-visual-style";

interface DynamicResumePreviewProps {
  resumeData: ResumeValues;
  theme: ResumeThemeToken;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  disableAutoScale?: boolean;
}

function SidebarPhoto({ resumeData }: { resumeData?: ResumeValues }) {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  // ✅ derive safely without breaking hooks
  const photo = resumeData?.photo;
  const showPhoto = resumeData?.showPhoto;

  useEffect(() => {
    if (!photo) {
      setPhotoSrc(null);
      return;
    }

    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPhotoSrc(photo);
  }, [photo]);

  // ✅ conditional render AFTER hooks
  if (!resumeData) {
    return <div className="mb-6 h-28 w-full" />;
  }

  const shouldShowPhoto = Boolean(showPhoto && photoSrc);

  const fullName =
    `${resumeData.firstName?.trim() || "Your"} ${resumeData.lastName?.trim() || "Name"}`.trim();

  return (
    <div className="mb-6 flex justify-center">
      {shouldShowPhoto && photoSrc ? (
        <div className="relative h-28 w-28 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={photoSrc}
            alt={`${fullName} profile photo`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="h-28 w-full" />
      )}
    </div>
  );
}

export default function DynamicResumePreview({
  resumeData,
  theme,
  className,
  contentRef,
  disableAutoScale = false,
}: DynamicResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  if (!resumeData || !theme) return null;

  const palette =
    ColorPalettes[theme.paletteId as keyof typeof ColorPalettes] ||
    ColorPalettes["classic-business"];

  const fonts =
    FontPairs[theme.fontId as keyof typeof FontPairs] ||
    FontPairs["professional"];

  const visualStyle = getResumeVisualStyle(theme);
  const scale = disableAutoScale ? 1 : width ? width / 794 : 1;

  const isSidebarLayout =
    theme.layout === "sidebar-left" || theme.layout === "sidebar-right";

  const usesSidebar = isSidebarLayout || theme.layout === "modern-split";
  const showPhotoInHeader = !isSidebarLayout;

  const styleVars = {
    "--primary": palette.primary,
    "--secondary": palette.secondary,
    "--accent": palette.accent,
    "--font-heading": fonts.heading,
    "--font-body": fonts.body,
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
    "--section-gap":
      theme.category === "federal"
        ? "0.5rem"
        : theme.spacing === "compact"
          ? "0.75rem"
          : "1.25rem",
    width: "794px",
    transform: `scale(${scale})`,
  } as React.CSSProperties;

  const supportingSections = (
    <>
      <SkillsSection
        data={resumeData}
        theme={theme}
        visualStyle={visualStyle}
      />
      <TechnicalSkillsSection
        data={resumeData}
        theme={theme}
        visualStyle={visualStyle}
      />
      <InterestsSection
        data={resumeData}
        theme={theme}
        visualStyle={visualStyle}
      />
    </>
  );

  return (
    <div
      className={cn(
        "h-fit w-full aspect-[210/297] overflow-hidden bg-white text-black shadow-lg",
        className,
      )}
      ref={containerRef}>
      <div
        style={styleVars}
        className={cn(
          "resume-paper origin-top-left transition-all duration-500",
          !disableAutoScale && !width && "invisible",
        )}
        data-layout={theme.layout}
        data-category={theme.category}
        data-spacing={theme.spacing}
        data-theme-id={theme.id}
        ref={contentRef}>
        <header className="resume-header">
          <PersonalInfoHeader
            data={resumeData}
            theme={theme}
            visualStyle={visualStyle}
            showPhotoInHeader={showPhotoInHeader}
          />
        </header>

        <aside className="resume-sidebar">
          {usesSidebar && isSidebarLayout && resumeData && (
            <SidebarPhoto resumeData={resumeData} />
          )}

          {usesSidebar && theme.category === "functional" && (
            <div className="mt-6">
              <EducationSection
                data={resumeData}
                theme={theme}
                visualStyle={visualStyle}
              />
            </div>
          )}
          {usesSidebar && supportingSections}
        </aside>

        <main className="resume-main">
          <SummarySection
            data={resumeData}
            theme={theme}
            visualStyle={visualStyle}
          />

          <WorkExperienceSection
            data={resumeData}
            theme={theme}
            visualStyle={visualStyle}
          />

          {theme.category !== "functional" && (
            <div className="mt-4">
              <EducationSection
                data={resumeData}
                theme={theme}
                visualStyle={visualStyle}
              />
            </div>
          )}
          {!usesSidebar && supportingSections}
        </main>
      </div>
    </div>
  );
}
