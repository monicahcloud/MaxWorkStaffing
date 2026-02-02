/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Link as LinkIcon, Sparkles } from "lucide-react";

import { CoverLetterServerData } from "@/lib/types";
import { CoverLetterValues } from "@/lib/validation";
import { cn, mapToCoverLetterValues } from "@/lib/utils";
import { calculateLetterStrength } from "@/lib/cover-letter-utils";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";

import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveCoverLetter from "../../coverletter/useAutoSaveCoverLetter";

import BreadcrumbsCoverLetter from "./BreadCrumbsCoverLetter";
import CoverLetterPreviewSection from "../CoverLetterPreviewSection";
import { allSteps } from "./stepsCoverLetter";
import CoverLetterFooter2 from "../templates/CoverLetterFooter2";
import SectionTitle from "@/components/SectionTitle";
import ThemePicker from "@/components/editor/ThemePicker";
import SkeletonForm from "../../editor/forms/SkeletonForm";

interface CoverLetterEditorProps {
  coverletterToEdit: CoverLetterServerData | null;
  resumes: any[];
}

function CoverLetterEditor({
  coverletterToEdit,
  resumes,
}: CoverLetterEditorProps) {
  const searchParams = useSearchParams();
  const form = useForm<CoverLetterValues>();

  // --- 1. State Initialization ---
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterValues>(
    () => {
      if (coverletterToEdit) return mapToCoverLetterValues(coverletterToEdit);

      const themeIdFromUrl = searchParams.get("themeId");
      const initialTheme =
        THEME_REGISTRY.find((t) => t.id === themeIdFromUrl) ||
        THEME_REGISTRY[0];

      return {
        companyName: "",
        themeId: initialTheme.id,
        themeColor: initialTheme.defaultColor,
        borderStyle: "squircle",
        showPhoto: true, // Ensure this matches your new schema field
      };
    }
  );
 const [isParsing, setIsParsing] = useState(false);
  // --- 2. Hooks & Logic ---
  const { isSaving, hasUnsavedChanges } =
    useAutoSaveCoverLetter(coverLetterData);
  useUnloadWarning(hasUnsavedChanges && !isSaving);

  const letterScore = useMemo(
    () => calculateLetterStrength(coverLetterData),
    [coverLetterData]
  );

  const currentStep = searchParams.get("step") || allSteps[0].key;

  const setStep = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("step", key);
      window.history.pushState(null, "", `?${params.toString()}`);
    },
    [searchParams]
  );

  const handleSyncResume = (resumeId: string) => {
    const selected = resumes.find((r) => r.id === resumeId);
    if (selected) {
      setCoverLetterData((prev) => ({
        ...prev,
        themeId: selected.themeId,
        themeColor: selected.themeColor,
        borderStyle: selected.borderStyle,
      }));
    }
  };

  const [showSmPreview, setShowSmPreview] = useState(false);
  const stepConfig = allSteps.find((s) => s.key === currentStep);

  const FormComponent = stepConfig?.component;

  // const currentTheme =
  //   THEME_REGISTRY.find((t) => t.id === coverLetterData.themeId) ||
  //   THEME_REGISTRY[0];

  return (
    <div className="flex grow flex-col">
      {/* --- HEADER: SYNC & PROGRESS --- */}
      <header className="px-8 py-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 no-print">
        {/* TOP SECTION: Page Title */}
        <div className="max-w-7xl mx-auto mb-6">
          <SectionTitle
            text="Build Your Cover Letter"
            subtext="Your progress is saved automatically as you design your future."
          />
        </div>

        {/* BOTTOM SECTION: Controls (Weighted 3-Column Layout) */}
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* COLUMN 1: Sync Resume (Compact Left) */}
          <div className="flex-[1] flex justify-start min-w-[200px]">
            <div className="hidden xl:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-2xl shadow-sm hover:bg-white transition-all">
              <LinkIcon className="size-3 text-blue-500" />
              <span className="text-[15px] font-black uppercase text-slate-500 tracking-tight">
                Sync Resume
              </span>
              <select
                className="bg-transparent text-[12px] font-bold outline-none cursor-pointer text-slate-900"
                onChange={(e) => handleSyncResume(e.target.value)}
                value={
                  resumes.find((r) => r.themeId === coverLetterData.themeId)
                    ?.id || ""
                }>
                <option value="">Manual Design ∨</option>
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.resumeTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* COLUMN 2: Theme Picker (The Widest Section - Spanned Out) */}
          <div className="flex-[2] flex justify-center">
            <button
              type="button"
              onClick={() =>
                document.getElementById("theme-picker-trigger")?.click()
              }
              className="group flex items-center justify-between w-full max-w-md bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 p-3 pr-8 rounded-3xl transition-all duration-300 text-left shadow-md hover:shadow-xl shrink-0">
              <div className="flex items-center gap-6">
                <div className="bg-slate-50 p-3 rounded-2xl shadow-sm group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                  <ThemePicker
                    currentThemeId={coverLetterData.themeId}
                    onSelect={(id) =>
                      setCoverLetterData((prev) => ({ ...prev, themeId: id }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-blue-500 transition-colors">
                    Design Archetype
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black uppercase tracking-tighter text-slate-900">
                      {THEME_REGISTRY.find(
                        (t) => t.id === coverLetterData.themeId
                      )?.name || "Select Template"}
                    </span>
                    <div className="size-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                Change
              </span>
            </button>
          </div>

          {/* COLUMN 3: Strength Meter (Compact Right) */}
          <div className="flex-[1] flex justify-end min-w-[240px]">
            <div className="w-full max-w-[280px]">
              <div className="flex justify-between items-baseline mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-green-400 fill-green-400" />
                  <span className="text-[12px] font-black uppercase text-slate-400 tracking-tight">
                    Functional Strength
                  </span>
                </div>
                <span className="text-[10px] font-black text-green-500 uppercase">
                  {letterScore < 80 ? "Good" : "Excellent"} ({letterScore}%)
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/30 shadow-inner">
                <div
                  className="h-full bg-green-400 transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                  style={{ width: `${letterScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 relative flex overflow-hidden">
        {/* LEFT PANEL: Form & Archetype Card */}
        <div
          className={cn(
            "p-6 space-y-6 overflow-y-auto w-full md:w-1/2 custom-scrollbar",
            showSmPreview && "hidden md:block"
          )}>
          <BreadcrumbsCoverLetter
            currentStep={currentStep}
            setCurrentStep={setStep}
          />

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            {/* Form Container: The rounded "Card" look */}

            {FormComponent && (
              <FormComponent
                form={form}
                coverLetterData={coverLetterData}
                setCoverLetterData={setCoverLetterData}
              />
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Live Viewport */}
        {/* <div className="hidden lg:flex lg:w-[45%] border-l bg-slate-100/50 flex-col relative">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
              <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">
                Live Viewport
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
            <div className="w-full max-w-[800px] mx-auto shadow-2xl">
              <CoverLetterPreviewSection
                coverLetterData={coverLetterData}
                setCoverLetterData={setCoverLetterData}
                className="h-full w-full"
              />
            </div>
          </div>
        </div> */}

        <div
          className={cn(
            "md:w-1/2 border-l bg-slate-100/50 relative",
            !showSmPreview && "hidden md:block"
          )}>
          {isParsing ? (
            <div className="p-12">
              <SkeletonForm />
            </div>
          ) : (
            <CoverLetterPreviewSection
              coverLetterData={coverLetterData}
              setCoverLetterData={setCoverLetterData}
              className="h-full w-full"
            />
          )}
        </div>
      </main>

      <CoverLetterFooter2
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmCoverLetterPreview={showSmPreview}
        setShowSmCoverLetterPreview={setShowSmPreview}
        isSaving={isSaving}
        coverletter={coverletterToEdit}
      />
    </div>
  );
}

export default CoverLetterEditor;
