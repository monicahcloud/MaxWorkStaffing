/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";
import { ResumeValues } from "@/lib/validation";
import {
  THEME_REGISTRY,
  ColorPalettes,
  FontPairs,
} from "@/lib/resume-theme-registry";
import { formatDate } from "date-fns";
import { cn } from "@/lib/utils";
import { SkillsSection } from "./sections";
import NextImage from "next/image";

interface SectionProps {
  data: ResumeValues;
}

/* ---------- SUB-COMPONENTS ---------- */

function PersonalInfoHeader({ data }: SectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    address,
    website,
    linkedin,
    gitHub,
    showPhoto, // Ensure this is destructured from data
  } = data;

  const photoSrc = useMemo(() => {
    if (!photo) return null;
    if (photo instanceof File) return URL.createObjectURL(photo);
    return photo;
  }, [photo]);

  const formatHandle = (url?: string) => {
    if (!url) return "";
    return (
      url
        .replace(/^(https?:\/\/)?(www\.)?/, "")
        .split("/")
        .pop() || url
    );
  };

  return (
    <div className="flex items-start gap-6">
      {/* 1. Corrected Photo Transition Wrapper */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden transition-all duration-500 ease-in-out",
          photoSrc && showPhoto
            ? "size-24 opacity-100 mr-0"
            : "size-0 opacity-0 -mr-6"
        )}>
        {photoSrc && (
          <div
            className="relative size-24 overflow-hidden rounded-2xl border-2 border-white shadow-md"
            style={{ borderColor: "var(--primary)" }}>
            <NextImage
              src={photoSrc}
              alt={`${firstName} ${lastName}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* 2. Text Content Area */}
      <div className="flex-1 space-y-2">
        <h1
          className="text-4xl font-black uppercase tracking-tighter leading-none transition-colors duration-300"
          style={{ color: "var(--primary)" }}>
          {firstName} {lastName}
        </h1>
        <p className="text-xl font-bold uppercase tracking-widest text-slate-500">
          {jobTitle}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold uppercase text-slate-400">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {address && <span>{address}</span>}
          {website && <span>{website}</span>}
          {linkedin && <span>LI: {formatHandle(linkedin)}</span>}
          {gitHub && <span>GH: {formatHandle(gitHub)}</span>}
        </div>
      </div>
    </div>
  );
}

function SummarySection({ data }: SectionProps) {
  if (!data.summary) return null;
  return (
    <div className="space-y-2">
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Profile
      </h2>
      <p className="text-[10px] leading-relaxed whitespace-pre-line text-slate-700">
        {data.summary}
      </p>
    </div>
  );
}

function WorkExperienceSection({ data }: SectionProps) {
  const theme = THEME_REGISTRY.find((t) => t.id === data.themeId);
  const isFederal = theme?.category === "federal";
  const experiences = data.workExperiences?.filter(
    (exp) => exp.position || exp.company
  );

  if (!experiences?.length) return null;

  return (
    <div className="space-y-4">
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Experience
      </h2>
      {experiences.map((exp, index) => (
        <div key={index} className="resume-section space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-[11px] text-slate-900">
              {exp.position}
            </h3>
            <span className="text-[9px] font-bold text-slate-400 uppercase">
              {exp.startDate
                ? formatDate(new Date(exp.startDate), "MMM yyyy")
                : ""}{" "}
              -
              {exp.endDate
                ? formatDate(new Date(exp.endDate), "MMM yyyy")
                : "Present"}
            </span>
          </div>
          <p className="text-[10px] font-bold text-blue-600 uppercase">
            {exp.company}
          </p>

          {isFederal && (
            <div className="flex flex-wrap gap-x-3 text-[8px] font-black uppercase text-slate-500 bg-slate-50 p-1 rounded border border-slate-100">
              {exp.grade && <span>Grade: {exp.grade}</span>}
              {exp.hours && <span>Hrs: {exp.hours}/wk</span>}
              {exp.status && <span>Series: {exp.status}</span>}
              {exp.clearance && <span>Clearance: {exp.clearance}</span>}
            </div>
          )}

          <div className="text-[10px] text-slate-600 whitespace-pre-line leading-normal">
            {isFederal ? (
              <div className="space-y-2 mt-1">
                {exp.duties && (
                  <div>
                    <span className="font-bold text-slate-800 underline block mb-0.5">
                      Duties:
                    </span>
                    <p>{exp.duties}</p>
                  </div>
                )}
                {exp.responsibilities && (
                  <div>
                    <span className="font-bold text-slate-800 underline block mb-0.5">
                      Responsibilities:
                    </span>
                    <p>{exp.responsibilities}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-1">{exp.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationSection({ data }: SectionProps) {
  const education = data.education?.filter((edu) => edu.school || edu.degree);
  if (!education?.length) return null;

  return (
    <div className="space-y-3">
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Education
      </h2>
      {education.map((edu, index) => (
        <div
          key={index}
          className="flex resume-section justify-between items-baseline">
          <div>
            <h3 className="text-[10px] font-bold text-slate-900 uppercase">
              {edu.degree}
            </h3>
            <p className="text-[9px] font-medium text-slate-500">
              {edu.school}
            </p>
          </div>
          <span className="text-[9px] text-slate-400">
            {edu.endDate ? formatDate(new Date(edu.endDate), "yyyy") : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function TechnicalSkillsSection({ data }: SectionProps) {
  if (!data.techSkills?.length) return null;
  return (
    <div className="space-y-2">
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Technical
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {data.techSkills.map((skill, i) => (
          <div key={i} className="flex items-center justify-between group">
            <span className="text-[9px] font-bold uppercase text-slate-600">
              {skill.name}
            </span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={cn(
                    "size-1 rounded-full",
                    star <= (skill.rating || 0) ? "bg-blue-500" : "bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterestsSection({ data }: SectionProps) {
  if (!data.interest?.length) return null;
  return (
    <div className="space-y-1">
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Interests
      </h2>
      <p className="text-[9px] text-slate-500 italic uppercase font-bold tracking-tighter">
        {data.interest.join(" • ")}
      </p>
    </div>
  );
}

/* ---------- MAIN EXPORT ---------- */

export default function ResumePreview({
  resumeData,
  contentRef,
}: {
  resumeData: ResumeValues;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const theme = useMemo(
    () =>
      THEME_REGISTRY.find((t) => t.id === resumeData.themeId) ||
      THEME_REGISTRY[0],
    [resumeData.themeId]
  );

  const palette = ColorPalettes[theme.paletteId as keyof typeof ColorPalettes];
  const fonts = FontPairs[theme.fontId as keyof typeof FontPairs];

  const isSidebarLayout =
    theme.layout.includes("sidebar") || theme.layout === "modern-split";

  return (
    <div
      ref={contentRef as any}
      className={cn(
        "relative w-full bg-white transition-all overflow-hidden",
        // Removed shadow-lg and aspect ratio to let it spread naturally
        "min-h-[297mm]",
        theme.spacing === "compact" ? "leading-tight" : "leading-normal"
      )}
      style={
        {
          fontFamily: fonts?.body || "sans-serif",
          /* FIX: Priority order 
           1. custom themeColor (from picker)
           2. palette default primary
           3. black fallback
        */
          "--primary": resumeData.themeColor || palette?.primary || "#000",
        } as React.CSSProperties
      }>
      {/* --- RESUME CONTENT --- */}
      <div className="p-12 space-y-8 print:p-0">
        <PersonalInfoHeader data={resumeData} />

        <div
          className={cn(
            "grid gap-8",
            isSidebarLayout ? "grid-cols-[1fr_2.5fr]" : "grid-cols-1"
          )}>
          {/* Sidebar Area */}
          {isSidebarLayout && (
            <aside className="space-y-6">
              <TechnicalSkillsSection data={resumeData} />
              <SkillsSection data={resumeData} />
              <EducationSection data={resumeData} />
              <InterestsSection data={resumeData} />
            </aside>
          )}

          {/* Main Body Area */}
          <main className="space-y-8">
            <SummarySection data={resumeData} />
            <WorkExperienceSection data={resumeData} />

            {/* Layout-specific bottom sections */}
            {!isSidebarLayout && (
              <>
                <div className="grid grid-cols-2 gap-8">
                  <EducationSection data={resumeData} />
                  <TechnicalSkillsSection data={resumeData} />
                </div>
                <InterestsSection data={resumeData} />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
