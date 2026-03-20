"use client";

import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import ResumeTemplateCard from "./ResumeTemplateCard";

function Page() {
  return (
    <>
      <SectionTitle
        text="Build Your Resume"
        subtext="Choose a professional template to begin."
      />
      <main className="">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {THEME_REGISTRY.map((theme) => (
            <ResumeTemplateCard key={theme.id} theme={theme} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Page;
