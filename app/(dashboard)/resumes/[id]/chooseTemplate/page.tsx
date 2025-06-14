"use client";

import Image from "next/image";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      <div className="px-4 templates">
        <SectionTitle
          text="Choose a Template"
          subtext="Create a brand new resume using your uploaded resume."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8">
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
                <div className="relative w-[300px] h-[400px]">
                  <Image
                    src={template.image}
                    alt={template.title}
                    className="rounded-lg object-contain w-full h-full"
                  />
                </div>
                <div className="w-full border-t border-gray-300" />
                <CardDescription className="text-center">
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
