"use client";

import Image from "next/image";
import { useTransition, useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { resumeTemplates } from "@/app/(dashboard)/resumebuilder/ResumeTemplate";
import { updateResumeType } from "./action";
import SectionTitle from "@/components/SectionTitle";
import LoadingModal from "./LoadingDialogue";

export default function ChooseTemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const resumeId = params.id;
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (resumeType: string) => {
    setShowModal(true);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeType", resumeType);

      await updateResumeType(formData);
      // Server action handles redirect
    });
  };

  return (
    <>
      {showModal && <LoadingModal />}

      <div className="px-4 sm:px-6 lg:px-8 templates">
        <SectionTitle
          text="Choose a Template"
          subtext="Create a brand new resume using your uploaded resume."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {resumeTemplates.map((template) => (
          <button
            key={template.title}
            onClick={() => handleSelect(template.resumeType)}
            className="w-full"
            disabled={isPending}>
            <Card
              className={`cursor-pointer transition-all p-4 ${
                isPending ? "opacity-60" : "hover:shadow-lg"
              }`}>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative w-full aspect-[3/4] max-w-[300px]">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="rounded-lg object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="w-full border-t border-gray-300" />
                <CardDescription className="text-center text-sm sm:text-base">
                  {template.title}
                </CardDescription>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </>
  );
}
