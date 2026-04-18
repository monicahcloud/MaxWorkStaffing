"use client";

import Image from "next/image";
import { useTransition, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import SectionTitle from "@/components/SectionTitle";
import LoadingModal from "./LoadingDialogue";
import { setUploadedResumeTemplate } from "./action";
import { Shield, Sparkles, Layers3 } from "lucide-react";

const templateOptions = [
  {
    title: "Chronological",
    resumeType: "Chronological",
    description: "Best for clear career progression and most standard resumes.",
    image: "/templates/chronological.png",
    icon: Sparkles,
  },
  {
    title: "Combination",
    resumeType: "Combination",
    description: "Balances skills and work history for flexible positioning.",
    image: "/templates/combination.png",
    icon: Layers3,
  },
  {
    title: "Federal",
    resumeType: "Federal",
    description: "Structured for government and federal resume requirements.",
    image: "/templates/federal.png",
    icon: Shield,
  },
] as const;

export default function ChooseTemplatePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { recommended?: string; federal?: string };
}) {
  const resumeId = params.id;
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const recommended =
    searchParams?.recommended ||
    (searchParams?.federal === "true" ? "Federal" : "Chronological");

  const handleSelect = (resumeType: string) => {
    setShowModal(true);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeType", resumeType);

      await setUploadedResumeTemplate(formData);
    });
  };

  return (
    <>
      {showModal && <LoadingModal />}

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <SectionTitle
          text="Choose Your Template"
          subtext="Select the template you want to use before entering the editor."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
        {templateOptions.map((template) => {
          const Icon = template.icon;
          const isRecommended = template.resumeType === recommended;

          return (
            <button
              key={template.title}
              onClick={() => handleSelect(template.resumeType)}
              className="w-full text-left"
              disabled={isPending}>
              <Card
                className={`group relative overflow-hidden rounded-3xl border p-4 transition-all ${
                  isPending
                    ? "opacity-60"
                    : "hover:-translate-y-1 hover:shadow-xl"
                } ${isRecommended ? "border-blue-300 ring-2 ring-blue-100" : "border-slate-200"}`}>
                {isRecommended && (
                  <div className="absolute right-4 top-4 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
                    Recommended
                  </div>
                )}

                <CardContent className="flex flex-col gap-4 p-0">
                  <div className="flex items-center gap-2 pt-2">
                    <div className="rounded-xl bg-slate-100 p-2">
                      <Icon className="h-4 w-4 text-slate-700" />
                    </div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight">
                      {template.title}
                    </CardTitle>
                  </div>

                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <CardDescription className="text-sm leading-6 text-slate-500">
                    {template.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </>
  );
}
