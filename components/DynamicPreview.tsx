// components/DynamicPreview.tsx
"use client";
import React from "react";
import { ResumeValues } from "@/lib/validation";
import { ResumeTheme } from "@/lib/themes";
import { ColorPalettes } from "@/lib/resume-theme-registry";

export default function DynamicPreview({
  data,
  theme,
}: {
  data: ResumeValues;
  theme: ResumeTheme;
}) {
  // We inject the theme values as CSS Variables
  const styleVars = {
    "--primary": theme.primaryColor,
    "--font-h": theme.fontHeading,
    "--font-b": theme.fontBody,
    "--gap":
      theme.spacing === "compact"
        ? "1rem"
        : theme.spacing === "relaxed"
        ? "2.5rem"
        : "1.5rem",
  } as React.CSSProperties;
  const currentPalette =
    ColorPalettes[theme.paletteId] || ColorPalettes["classic-business"];

  const cssVars = {
    "--primary": currentPalette.primary,
    "--accent": currentPalette.accent,
    "--secondary": currentPalette.secondary,
  } as React.CSSProperties;

  return (
    <div style={cssVars} className="resume-paper">
      <h1 className="text-[var(--primary)] border-b-[var(--accent)]">
        {data.firstName}
      </h1>
    </div>
  );
  return (
    <div
      style={styleVars}
      className={`resume-paper ${theme.layout}`}
      id="resume-content">
      <header className="resume-header">
        <h1 className="text-primary font-heading">
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-secondary">{data.jobTitle}</p>
      </header>

      <aside className="resume-sidebar">
        {/* Sidebar content (Skills, Education) goes here */}
        <h2 className="font-heading">Skills</h2>
        {data.skills?.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </aside>

      <main className="resume-main">
        {/* Main content (Experience, Summary) goes here */}
        <h2 className="font-heading">Experience</h2>
        {data.workExperiences?.map((exp) => (
          <div key={exp.company}>
            {exp.position} at {exp.company}
          </div>
        ))}
      </main>
    </div>
  );
}
