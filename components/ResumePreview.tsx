"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import { ResumeValues } from "@/lib/validation";
import {
  THEME_REGISTRY,
  ColorPalettes,
  FontPairs,
  ResumeThemeToken,
} from "@/lib/resume-theme-registry";
import { cn } from "@/lib/utils";
import { getResumeVisualStyle } from "@/lib/get-resume-visual-style";
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

type ResumePreviewProps = {
  resumeData: ResumeValues;
  theme?: ResumeThemeToken;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  disableAutoScale?: boolean;
  useAutoScale?: boolean;
};

function SidebarPhoto({ resumeData }: { resumeData: ResumeValues }) {
  const [photoSrc, setPhotoSrc] = React.useState<string | null>(null);

  const photo = resumeData.photo;
  const showPhoto = resumeData.showPhoto;

  React.useEffect(() => {
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

export default function ResumePreview({
  resumeData,
  theme: themeProp,
  className,
  contentRef,
  disableAutoScale = true,
  useAutoScale = false,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  const theme = useMemo(
    () =>
      themeProp ??
      THEME_REGISTRY.find((t) => t.id === resumeData.themeId) ??
      THEME_REGISTRY[0],
    [themeProp, resumeData.themeId],
  );

  const palette =
    ColorPalettes[theme.paletteId as keyof typeof ColorPalettes] ||
    ColorPalettes["classic-business"];

  const fonts =
    FontPairs[theme.fontId as keyof typeof FontPairs] ||
    FontPairs["professional"];

  const visualStyle = getResumeVisualStyle(theme);

  const shouldScale = useAutoScale && !disableAutoScale;
  const scale = shouldScale ? (width ? width / 794 : 1) : 1;

  const isSidebarLayout =
    theme.layout === "sidebar-left" || theme.layout === "sidebar-right";

  const usesSidebar = isSidebarLayout || theme.layout === "modern-split";
  const showPhotoInHeader = !isSidebarLayout;

  const styleVars = {
    "--primary": resumeData.themeColor || palette.primary,
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
    fontFamily: fonts.body,
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
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden bg-white text-black",
        shouldScale && "aspect-[210/297]",
        className,
      )}>
      <div
        ref={contentRef}
        style={styleVars}
        data-layout={theme.layout}
        data-category={theme.category}
        data-spacing={theme.spacing}
        data-theme-id={theme.id}
        className={cn(
          "resume-paper origin-top-left",
          shouldScale && "transition-all duration-500",
          shouldScale && !width && "invisible",
        )}>
        <header className="resume-header">
          <PersonalInfoHeader
            data={resumeData}
            theme={theme}
            visualStyle={visualStyle}
            showPhotoInHeader={showPhotoInHeader}
          />
        </header>

        <aside className="resume-sidebar">
          {usesSidebar && isSidebarLayout && (
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
