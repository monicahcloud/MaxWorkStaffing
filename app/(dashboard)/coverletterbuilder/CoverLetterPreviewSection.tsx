// components/CoverLetterPreviewSection.tsx
import { cn } from "@/lib/utils";
import CoverLetterPreview from "../coverletter/CoverLetterPreview";
import { CoverLetterValues } from "@/lib/validation";

export default function CoverLetterPreviewSection({
  coverLetterData,
  className,
}: {
  coverLetterData: CoverLetterValues;
  setCoverLetterData: (data: CoverLetterValues) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center bg-slate-100/50 p-8 overflow-y-auto",
        className,
      )}>
      <div className="w-full max-w-204 transform transition-transform duration-500 hover:shadow-2xl">
        <CoverLetterPreview coverLetterData={coverLetterData} />
      </div>

      {/* Visual helper for page length */}
      <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Standard A4 Document Preview
      </p>
    </div>
  );
}
