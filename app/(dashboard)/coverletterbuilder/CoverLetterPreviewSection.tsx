"use client";

import { cn } from "@/lib/utils";
import ColorPicker from "../editor/ColorPicker";
import BorderStyleButton from "../editor/BorderStyleButton";
import CoverLetterPreview from "../coverletter/CoverLetterPreview";

interface CoverLetterPreviewSectionProps {
  coverLetterData: CoverLetterValues;
  setCoverLetterData: (data: CoverLetterValues) => void;
  className?: string;
}
const mockData: CoverLetterValues = {
  recipientName: "Ms. Andara Marta",
  companyName: "Larana, Inc.",
  jobTitle: "Computer Engineer",
  body: "I am excited to apply for this position as a Computer Engineer at Larana, Inc...",
  userName: "Juliana Silva",
  userEmail: "hello@reallygreatsite.com",
  userPhone: "+123-456-7890",
  userAddress: "123 Anywhere St., Any City, ST 12345",
  userPhoto: "/avatar-placeholder.jpg", // optional
  themeColor: "#e0d3c3",
  borderStyle: "solid",
};

type CoverLetterValues = {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string;
  themeColor: string;
  borderStyle: string;
};

export default function CoverLetterPreviewSection({
  coverLetterData = mockData,
  setCoverLetterData,
  className,
}: CoverLetterPreviewSectionProps) {
  return (
    <div className={cn("group relative hidden w-full md:flex", className)}>
      <div className="absolute left-1 top-1 flex flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-2 lg:top-3 xl:opacity-100">
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
