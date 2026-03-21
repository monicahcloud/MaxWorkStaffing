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
import { getValidResumeTheme } from "@/lib/get-valid-resume-theme";

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
      const mapped = mapToResumeValues(resumeToEdit);
      const validTheme = getValidResumeTheme(mapped.themeId);

      return {
        ...mapped,
        themeId: validTheme.id,
      };
    }

    const validTheme = getValidResumeTheme(themeIdFromURL);

    return {
      resumeTitle: "",
      description: "",
      resumeType: resumeTypeFromURL,
      themeId: validTheme.id,
      showPhoto: true,
    };
  });

  useEffect(() => {
    if (!themeIdFromURL) return;

    const validTheme = getValidResumeTheme(themeIdFromURL);

    setResumeData((prev) => {
      if (prev.themeId === validTheme.id) return prev;
      return {
        ...prev,
        themeId: validTheme.id,
      };
    });
  }, [themeIdFromURL]);

  // 3. Memoize Steps
  const steps = useMemo(
    () => getSteps(resumeData.resumeType),
    [resumeData.resumeType],
  );
  const validStepKeys = useMemo(() => steps.map((s) => s.key), [steps]);
  const activeTheme = useMemo(() => {
    return getValidResumeTheme(resumeData.themeId);
  }, [resumeData.themeId]);
  // const themeCategory = activeTheme.category;

  const [currentStep, setCurrentStep] = useState(steps[0]?.key || "");

  // 4. AI Design Intelligence: Auto-suggest theme based on Job Title
  useEffect(() => {
    const currentTheme = getValidResumeTheme(resumeData.themeId);
    const isUsingInitialTheme = !resumeToEdit?.themeId;

    if (!isUsingInitialTheme || !resumeData.jobTitle) return;

    const title = resumeData.jobTitle.toLowerCase();
    let suggestedThemeId = currentTheme.id;

    if (title.includes("tech") || title.includes("engineer")) {
      suggestedThemeId = "engineering-steel";
    } else if (title.includes("gov") || title.includes("federal")) {
      suggestedThemeId = "government-slate";
    } else if (title.includes("data") || title.includes("analyst")) {
      suggestedThemeId = "data-graphite";
    } else if (title.includes("marketing") || title.includes("brand")) {
      suggestedThemeId = "marketing-purple";
    }

    if (suggestedThemeId !== resumeData.themeId) {
      setResumeData((prev) => ({
        ...prev,
        themeId: suggestedThemeId,
      }));
    }
  }, [resumeData.jobTitle, resumeData.themeId, resumeToEdit?.themeId]);

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

        <div className="mt-4 flex w-full items-center gap-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() =>
              document.getElementById("theme-picker-trigger")?.click()
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                document.getElementById("theme-picker-trigger")?.click();
              }
            }}
            className="group flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 pr-4 text-left shadow-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50">
            <div className="rounded-xl bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <ThemePicker
                currentThemeId={resumeData.themeId}
                onSelect={(id) =>
                  setResumeData((prev) => ({ ...prev, themeId: id }))
                }
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-blue-500">
                Design Template
              </span>

              <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-tight text-slate-900">
                  {activeTheme.name}
                </span>
                <div className="size-1.5 animate-pulse rounded-full bg-blue-500" />
              </div>
            </div>

            <span className="ml-4 text-[10px] font-bold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
              Edit
            </span>
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
