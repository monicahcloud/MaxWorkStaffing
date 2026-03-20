/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ResumeThemeToken } from "@/lib/resume-theme-registry";
import DynamicResumePreview from "@/components/DynamicResumePreview";

const MOCK_RESUME_DATA = {
  firstName: "Alex",
  lastName: "Rivera",
  jobTitle: "Senior Operations Director",
  email: "a.rivera@example.com",
  phone: "555-0199",
  address: "Chicago, IL",
  summary:
    "Accomplished leader with 15 years of experience specializing in organizational efficiency and large-scale project management.",
  workExperiences: [
    {
      position: "Lead Architect",
      company: "Tech Global",
      startDate: "2020-01-01",
      description:
        "Directed the architectural vision for high-traffic platforms serving millions of users.",
    },
    {
      position: "Regional Director",
      company: "Global Logistics Corp",
      startDate: "2018-06-01",
      description:
        "Optimized supply chain routes resulting in a 20% reduction in annual overhead.",
    },
  ],
  education: [
    {
      school: "Northwestern University",
      degree: "M.S. Management",
    },
  ],
  skills: ["Strategic Planning", "P&L Management", "Team Leadership"],
};

interface ResumeTemplateCardProps {
  theme: ResumeThemeToken;
  resumeId?: string;
}

export default function ResumeTemplateCard({
  theme,
  resumeId,
}: ResumeTemplateCardProps) {
  const router = useRouter();

  const handleSelect = () => {
    if (resumeId) {
      router.push(`/editor?resumeId=${resumeId}`);
      return;
    }

    router.push(`/editor?themeId=${theme.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="group text-left outline-none transition-transform hover:-translate-y-2">
      <Card className="overflow-hidden border-2 border-slate-200 bg-white shadow-md transition-all group-hover:border-red-500 group-hover:shadow-2xl">
        <CardContent className="relative p-0">
          <div className="pointer-events-none relative aspect-[4/5] w-full origin-top overflow-hidden bg-slate-50">
            <div className="absolute top-1/2 left-1/2 w-[180%] -translate-x-1/2 -translate-y-1/2 origin-center scale-[0.4] sm:scale-[0.5] lg:scale-[0.45]">
              <DynamicResumePreview
                resumeData={MOCK_RESUME_DATA as any}
                theme={theme}
                className="shadow-none"
                disableAutoScale
              />
            </div>
          </div>

          <div className="relative z-10 border-t bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black uppercase tracking-tighter text-slate-900">
                  {theme.name}
                </h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {theme.category}
                </p>
              </div>

              <div className="flex size-8 items-center justify-center rounded-full border border-slate-100 bg-slate-50 transition-colors group-hover:bg-red-600">
                <div className="size-2 rounded-full bg-slate-300 group-hover:bg-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
