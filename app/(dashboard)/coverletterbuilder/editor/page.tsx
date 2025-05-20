"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/SectionTitle";
import { CoverLetterFormBuilder } from "./CoverLetterFormBuilder";
import { templateMap } from "../templates/templateMap";
import BackToTemplatesButton from "../templates/BackToTemplatesButton";

export default function CoverLetterBuilder() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "Shabach";
  const TemplateComponent = templateMap[templateId];

  const form = useForm({
    defaultValues: {
      recipientName: "",
      companyName: "",
      jobTitle: "",
      body: "",
      userName: "",
      userEmail: "",
      userPhone: "",
      userAddress: "",
      userPhoto: undefined,
      signatureUrl: "",
      date: "",
    },
  });

  const watched = form.watch();

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text="Create Your Cover Letter"
          subtext={`Using "${templateId}" template`}
        />
        <div className="mt-4 px-1">
          <BackToTemplatesButton />
        </div>
      </header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="p-3 space-y-6 overflow-y-auto w-full md:w-1/2">
            <CoverLetterFormBuilder form={form} />
          </div>
          <div className="md:block md:w-1/2 border-l p-4 overflow-y-auto bg-secondary">
            {TemplateComponent && (
              <TemplateComponent
                {...watched}
                userPhoto={
                  watched.userPhoto
                    ? URL.createObjectURL(watched.userPhoto)
                    : undefined
                }
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
