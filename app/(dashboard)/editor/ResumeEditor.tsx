"use client";

import SectionTitle from "@/components/SectionTitle";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSteps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./forms/Footer";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewContainer from "./ResumePreviewContainer";
import { cn, mapToResumeValues } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "./useAutoSaveResume";
import { ResumeServerData } from "@/lib/types";
import { parseResumeWithAI, saveParsedResumeData } from "./forms/action";
import SkeletonForm from "./forms/SkeletonForm";
import ThemePicker from "@/components/editor/ThemePicker";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import StrengthMeter from "@/components/editor/StrengthMeter";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Capture URL params
  const themeIdFromURL = searchParams.get("themeId");
  const resumeTypeFromURL = searchParams.get("resumeType") || "";
  const stepParam = searchParams.get("step");

  const [isParsing, setIsParsing] = useState(false);
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  // 2. Initialize State with Theme Awareness
  const [resumeData, setResumeData] = useState<ResumeValues>(() => {
    if (resumeToEdit) {
      return mapToResumeValues(resumeToEdit);
    }
    return {
      resumeTitle: "",
      description: "",
      resumeType: resumeTypeFromURL,
      themeId: themeIdFromURL || "chronological-master", // Default to gallery selection
      showPhoto: true,
    };
  });

  // 3. Memoize Steps
  const steps = useMemo(
    () => getSteps(resumeData.resumeType),
    [resumeData.resumeType],
  );
  const validStepKeys = useMemo(() => steps.map((s) => s.key), [steps]);
  const themeCategory = useMemo(() => {
    const theme = THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
    return theme?.category || "chronological";
  }, [resumeData.themeId]);

  const [currentStep, setCurrentStep] = useState(steps[0]?.key || "");

  // 4. AI Design Intelligence: Auto-suggest theme based on Job Title
  useEffect(() => {
    // Only suggest if:
    // - User is NOT currently editing an existing resume with a set theme
    // - The current theme is still the default and a job title exists
    const isDefaultTheme =
      resumeData.themeId?.includes("-master") || !resumeData.themeId;

    if (isDefaultTheme && resumeData.jobTitle && !resumeToEdit?.themeId) {
      const title = resumeData.jobTitle.toLowerCase();
      let suggestedTheme = resumeData.themeId;

      if (title.includes("tech") || title.includes("engineer")) {
        suggestedTheme = "combination-modern-tech-professional";
      } else if (title.includes("gov") || title.includes("federal")) {
        suggestedTheme = "federal-government-slate-professional";
      }

      if (suggestedTheme !== resumeData.themeId) {
        setResumeData((prev) => ({ ...prev, themeId: suggestedTheme }));
      }
    }
  }, [resumeData.jobTitle, resumeData.themeId, resumeToEdit]);

  // 5. Handle AI Parsing Logic
  useEffect(() => {
    const controller = new AbortController();
    const shouldParse =
      resumeToEdit &&
      resumeToEdit.rawTextContent &&
      !resumeToEdit.education?.length &&
      !resumeToEdit.workExperience?.length &&
      !resumeToEdit.techSkills?.length;

    const parse = async () => {
      if (shouldParse && resumeToEdit?.rawTextContent) {
        setIsParsing(true);
        try {
          const parsed = await parseResumeWithAI(resumeToEdit.rawTextContent);
          if (parsed && !controller.signal.aborted) {
            setResumeData((prev) => ({
              ...prev,
              ...parsed,
              resumeType: resumeTypeFromURL || prev.resumeType,
            }));
            await saveParsedResumeData(resumeToEdit.id, parsed);
          }
        } finally {
          if (!controller.signal.aborted) setIsParsing(false);
        }
      }
    };

    parse();
    return () => controller.abort();
  }, [resumeToEdit, resumeTypeFromURL]);

  // 6. Step Management Logic
  useEffect(() => {
    if (stepParam && validStepKeys.includes(stepParam)) {
      setCurrentStep(stepParam);
    } else {
      const defaultStep = steps[0]?.key || "";
      setCurrentStep(defaultStep);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("step", defaultStep);
      router.replace(`?${newParams.toString()}`);
    }
  }, [stepParam, validStepKeys, steps, router, searchParams]);

  const updateStep = useCallback(
    (key: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("step", key);
      window.history.pushState(null, "", `?${newParams.toString()}`);
      setCurrentStep(key);
    },
    [searchParams],
  );

  // 7. Auto-save & Unload Warning
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges && !isSaving);

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="px-6 py-4 border-b bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <SectionTitle
          text="Build Your Resume"
          subtext="Your progress is saved automatically as you design your future."
        />

        <div className="flex items-center gap-4 mt-4 w-full">
          {/* The Interactive Design Pill - Fixed width (shrink-0) */}
          <button
            type="button"
            onClick={() =>
              document.getElementById("theme-picker-trigger")?.click()
            }
            className="group flex items-center gap-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 p-2 pr-4 rounded-2xl transition-all duration-300 text-left shadow-sm shrink-0">
            <div className="bg-white p-2 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
              <ThemePicker
                currentThemeId={resumeData.themeId}
                onSelect={(id) =>
                  setResumeData((prev) => ({ ...prev, themeId: id }))
                }
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors">
                Design Template
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-tight text-slate-900">
                  {THEME_REGISTRY.find((t) => t.id === resumeData.themeId)
                    ?.name || "Select Theme"}
                </span>
                <div className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>

            <span className="ml-4 text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Edit
            </span>
          </button>

          {/* The Strength Meter - Spreading across (flex-1) */}
          <div className="flex-1 min-w-0">
            <StrengthMeter resumeData={resumeData} category={themeCategory} />
          </div>
        </div>
      </header>

      <main className="relative grow bg-slate-50/30">
        <div className="absolute inset-0 flex flex-col md:flex-row">
          {/* Left Side: Form */}
          <div
            className={cn(
              "p-6 space-y-6 overflow-y-auto w-full md:w-1/2 custom-scrollbar",
              showSmResumePreview && "hidden md:block",
            )}>
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={updateStep}
              resumeType={resumeData.resumeType}
            />
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              {FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}
            </div>
          </div>

          {/* Right Side: Preview */}
          <div
            className={cn(
              "md:w-1/2 border-l bg-slate-100/50 relative",
              !showSmResumePreview && "hidden md:block",
            )}>
            {isParsing ? (
              <div className="p-12">
                <SkeletonForm />
              </div>
            ) : (
              <ResumePreviewContainer
                resumeData={resumeData}
                setResumeData={setResumeData}
                className="h-full w-full"
              />
            )}
          </div>
        </div>
      </main>

      <Footer
        currentStep={currentStep}
        setCurrentStep={updateStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
        resumeType={resumeData.resumeType}
        resume={resumeToEdit ?? undefined}
      />
    </div>
  );
}

export default ResumeEditor;
