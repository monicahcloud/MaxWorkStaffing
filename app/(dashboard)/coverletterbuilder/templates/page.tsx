"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CoverLetterValues } from "@/lib/validation";
import { CoverLetterThemeToken } from "@/lib/cover-letter-theme-registry";
import CoverLetterPreview from "../../coverletter/CoverLetterPreview";

const MOCK_DATA: CoverLetterValues = {
  firstName: "Jane",
  lastName: "Doe",
  showPhoto: false,
  jobTitle: "Product Manager",
  userEmail: "rjanedoe@email.com",
  userPhone: "123-456-7890",
  userAddress: "1234 Main Street, Anytown, USA",
  recipientName: "Hiring Manager",
  companyName: "Innovative Tech Solutions",
  body: "<p>I am writing to express my interest in the opportunity at your organization. With a strong background in delivering results, problem-solving, and collaborating across teams, I am confident in my ability to contribute meaningful value to your team.</p><p>Throughout my experience, I have consistently demonstrated the ability to adapt quickly, manage priorities effectively, and deliver high-quality outcomes. I take pride in my attention to detail, strong communication skills, and commitment to continuous improvement.</p><p>I am particularly drawn to your organization because of its reputation for innovation and excellence. I am excited about the opportunity to bring my skills and dedication to a team that values growth, impact, and forward-thinking solutions.</p><p>Thank you for your time and consideration. I would welcome the opportunity to discuss how my background aligns with your needs and how I can contribute to your continued success.</p>",
  themeId: "classic-left",
  themeColor: "#111827",
};

interface CoverLetterTemplateCardProps {
  theme: CoverLetterThemeToken;
}

export default function CoverLetterTemplateCard({
  theme,
}: CoverLetterTemplateCardProps) {
  const router = useRouter();

  const handleSelect = () => {
    router.push(`/coverletterbuilder/editor?themeId=${theme.id}`);
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
              <CoverLetterPreview
                coverLetterData={{
                  ...MOCK_DATA,
                  themeId: theme.id,
                  themeColor: theme.defaultColor,
                }}
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
