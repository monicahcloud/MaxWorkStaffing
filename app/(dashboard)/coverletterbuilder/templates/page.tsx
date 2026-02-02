"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { CoverLetterValues } from "@/lib/validation";
import CoverLetterPreview from "../../coverletter/CoverLetterPreview";

// Mock data to show what the letterhead looks like in the selection grid
const MOCK_DATA: CoverLetterValues = {
  firstName: "Monicah",
  lastName: "Cloud",
  jobTitle: "Business Intelligence Analyst",
  userEmail: "ruthncloud@gmail.com",
  userPhone: "404-703-7133",
  userAddress: "156 Stone Creek Drive",
  recipientName: "Hiring Manager",
  companyName: "Innovative Tech Solutions",
  body: "<p>I am writing to express my strong interest in the role...</p>",
};

export default function TemplateSelectionPage() {
  const router = useRouter();

  const handleSelect = (themeId: string) => {
    router.push(`/coverletterbuilder/editor?themeId=${themeId}`);
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {THEME_REGISTRY.map((theme) => (
          <button
            type="button"
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            className="group text-left transition-transform hover:-translate-y-2 outline-none">
            <Card className="overflow-hidden border-2 border-slate-200 group-hover:border-blue-500 transition-all shadow-md group-hover:shadow-2xl bg-white">
              <CardContent className="p-0 relative">
                {/* LIVE PREVIEW: 
                  We render the actual CoverLetterPreview but scale it down using CSS zoom or transform 
                */}
                <div className="relative aspect-[210/297] w-full overflow-hidden bg-slate-50 origin-top pointer-events-none">
                  <div className="w-[816px] absolute top-0 left-0 origin-top-left scale-[0.35] sm:scale-[0.45] lg:scale-[0.38]">
                    <CoverLetterPreview
                      coverLetterData={{
                        ...MOCK_DATA,
                        themeId: theme.id,
                        themeColor: theme.defaultColor,
                      }}
                    />
                  </div>
                </div>

                {/* Info Overlay */}
                <div className="p-5 border-t bg-white relative z-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-black uppercase tracking-tighter text-slate-900">
                        {theme.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {theme.category} Archetype
                      </p>
                    </div>
                    <div className="size-8 rounded-full border border-slate-100 flex items-center justify-center bg-slate-50 group-hover:bg-blue-600 transition-colors">
                      <div className="size-2 bg-slate-300 group-hover:bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </main>
  );
}
