"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/SectionTitle";
import { CoverLetterFormBuilder } from "./CoverLetterFormBuilder";
import BackToTemplatesButton from "../templates/BackToTemplatesButton";
import { useEffect, useState } from "react";
import CoverLetterFooter from "../CoverLetterFooter";

import { coverLetterSchema, CoverLetterValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import CoverLetterPreviewSection from "../CoverLetterPreviewSection";
import useAutoSaveCoverLetter from "../../coverletter/useAutoSaveCoverLetter";

const steps = [
  { key: "user", label: "Personal Info" },
  { key: "employer", label: "Employer Info" },
  { key: "body", label: "Letter Body" },
  { key: "signature", label: "Signature" },
];

export default function CoverLetterBuilder() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "Shabach";
  const [stepIndex, setStepIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState("");
  const [coverletterData, setCoverLetterData] = useState<CoverLetterValues>({});
  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      // Populate all default values here
      firstName: coverletterData.firstName || "",
      lastName: coverletterData.lastName || "",
      jobTitle: coverletterData.jobTitle || "",
      userEmail: coverletterData.userEmail || "",
      userPhone: coverletterData.companyPhone || "",
      userAddress: coverletterData.userAddress || "",
      website: coverletterData.website || "",
      linkedin: coverletterData.linkedin || "",
      gitHub: coverletterData.gitHub || "",
      recipientName: coverletterData.recipientName || "",
      companyName: coverletterData.companyName || "",
      companyEmail: coverletterData.companyEmail || "",
      companyPhone: coverletterData.companyPhone || "",
      companyAddress: coverletterData.companyAddress || "",
      themeColor: coverletterData.themeColor || "#000000", // or any default color
      borderStyle: coverletterData.borderStyle || "solid", // also required
      body: coverletterData.body || "",
      signatureUrl: coverletterData.signatureUrl || "",
      userPhoto:
        coverletterData.userPhoto instanceof File
          ? coverletterData.userPhoto
          : undefined,
    },
  });
  useEffect(() => {
    const debouncedUpdate = debounce((values: CoverLetterValues) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    }, 300);

    const subscription = form.watch((values) => {
      debouncedUpdate(values);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel(); // Clean up debounce
    };
  }, [form, setCoverLetterData]);

  const watched = form.watch();
  const { isSaving } = useAutoSaveCoverLetter(watched);

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text="Design Your Cover Letter"
          subtext={`Using "${templateId}" template`}
        />
        <div className="mt-4 px-1">
          <BackToTemplatesButton />
        </div>
      </header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="p-3 space-y-6 overflow-y-auto w-full md:w-1/2">
            <CoverLetterFormBuilder
              form={form}
              stepIndex={stepIndex}
              setSignatureUrl={setSignatureUrl}
              signatureUrl={signatureUrl}
              selectedTemplate={templateId}
              coverletterData={coverletterData}
              setCoverLetterData={setCoverLetterData}
            />
          </div>
          <div className="grow md:border-right"></div>
          <div className="hidden md:flex md:w-1/2 border-l p-4 overflow-y-auto bg-secondary">
            <CoverLetterPreviewSection
              coverLetterData={watched}
              setCoverLetterData={(data) => {
                for (const key in data) {
                  form.setValue(key as keyof CoverLetterValues, data[key]);
                }
              }}
            />
          </div>
        </div>
      </main>

      <CoverLetterFooter
        currentStep={steps[stepIndex].key}
        setCurrentStep={(key) => {
          const index = steps.findIndex((step) => step.key === key);
          if (index !== -1) setStepIndex(index);
        }}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        isSaving={isSaving}
        steps={steps}
      />
    </div>
  );
}
