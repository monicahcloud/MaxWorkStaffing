"use client";

import { cn } from "@/lib/utils";
import ColorPicker from "../editor/ColorPicker";
import BorderStyleButton from "../editor/BorderStyleButton";
import CoverLetterPreview from "../coverletter/CoverLetterPreview";
import { CoverLetterValues } from "@/lib/validation";

interface CoverLetterPreviewSectionProps {
  coverLetterData: CoverLetterValues;
  setCoverLetterData: (data: CoverLetterValues) => void;
  className?: string;
}

export default function CoverLetterPreviewSection({
  coverLetterData,
  setCoverLetterData,
  className,
}: CoverLetterPreviewSectionProps) {
  return (
    <div className={cn("group relative hidden w-full md:flex", className)}>
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-2 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={coverLetterData.themeColor}
          onChange={(color) =>
            setCoverLetterData({ ...coverLetterData, themeColor: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={coverLetterData.borderStyle}
          onChange={(borderStyle) =>
            setCoverLetterData({ ...coverLetterData, borderStyle })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary px-10 py-10">
        <CoverLetterPreview
          coverLetterData={coverLetterData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
