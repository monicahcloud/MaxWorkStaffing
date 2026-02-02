"use client";

import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { ColorPalettes, THEME_REGISTRY } from "@/lib/resume-theme-registry";
import ResumeTemplateCard from "./ResumeTemplateCard";

function Page() {
  // We can show a curated slice of the 50+ templates or all of them
  // const featuredThemes = THEME_REGISTRY.slice(0, 12);
  // Logic to pick the first layout ('top-header') for every unique palette
  const diverseThemes = Object.keys(ColorPalettes)
    .map((paletteId) => THEME_REGISTRY.find((t) => t.paletteId === paletteId))
    .filter(Boolean);
  return (
    <div className="max-w-400 mx-auto px-6 py-12 space-y-12">
      <header className="border-b border-slate-100 pb-8">
        <SectionTitle
          text="Build Your Resume"
          subtext="Choose a professional template to begin"
        />
      </header>

      {/* Grid container expanded for better spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {diverseThemes.map((theme) => (
          <ResumeTemplateCard key={theme!.id} theme={theme!} />
        ))}
      </div>
    </div>
  );
}

export default Page;
