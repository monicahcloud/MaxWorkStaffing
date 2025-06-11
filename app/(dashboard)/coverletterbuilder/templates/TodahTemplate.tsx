"use client";

import React, { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CoverLetterValues } from "@/lib/validation";

interface Props {
  coverletterData: CoverLetterValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export function TodahTemplate({
  coverletterData,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);
  const themeColor = coverletterData.themeColor || "#ffd200";

  return (
    <div
      ref={containerRef}
      className={cn(
        "aspect-[210/297] bg-white text-black h-fit w-full font-lora",
        className
      )}>
      <div
        className={cn("space-y-6 p-10 origin-top-left z-10 font-lora")}
        style={{
          width: "794px",
          transform: `scale(${width / 794})`,
          border: `20px double ${themeColor}`,
        }}
        ref={contentRef}
        id="resumePreviewContent">
        <TodahHeaderSection coverletterData={coverletterData} />
        <TodahBodySection coverletterData={coverletterData} />
        <TodahSignatureSection coverletterData={coverletterData} />
      </div>
    </div>
  );
}

// --- Header Section ---
function TodahHeaderSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { firstName, lastName, userAddress, userPhone, userEmail } =
    coverletterData;

  return (
    <div className="flex flex-col items-center justify-center text-center mt-10">
      <div className="flex items-end space-x-4">
        <h1 className="text-5xl font-serif leading-none tracking-wide">
          {firstName || "Lizzie"}
        </h1>
        <h2 className="text-5xl font-serif leading-none tracking-wide">
          {lastName || "Major"}
        </h2>
      </div>
      <div className="h-1 w-100 bg-black my-4" />
      <p className="text-xl">{userAddress || "1234 Main Street"}</p>
      <p className="text-lg">{userPhone || "1231231234"}</p>
      <p className="text-lg">{userEmail || "hello@email.com"}</p>
    </div>
  );
}

// --- Body Section ---
function TodahBodySection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { recipientName, companyName, companyAddress, body } = coverletterData;

  return (
    <div className="text-left mt-6 leading-relaxed">
      <p className="text-xl font-semibold mt-5 mb-5">
        {new Date().toLocaleDateString()}
      </p>
      <p className="text-xl">{companyName || "Company Name"}</p>
      <p className="text-xl">
        {companyAddress || "1234 Main Street, Anytown, ST 12345"}
      </p>
      <div className="space-y-5 leading-relaxed mt-5">
        <p>Dear {recipientName || "Mr. Gallego"},</p>
        <p>
          {body ||
            `A cover letter allows you to professionally introduce yourself to a prospective
          employer. Your goal in writing your cover letter should be to encourage the employer
          to read your resume and consider you for a specific position. Highlight your achievements, skills, experiences, and training
        that are relevant to the position you want to get. However, avoid
        simply repeating the information you included in your resume.
        Tailor your cover letter to each employer and job. Maintain a professional tone, but let your enthusiasm show. Think
        of it as a smart casual gathering — not too formal, not too
        personal.`}
        </p>
      </div>
    </div>
  );
}

// --- Signature Section ---
function TodahSignatureSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { signatureUrl, firstName, lastName } = coverletterData;
  const displayName =
    firstName || lastName
      ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
      : "Your Name";

  return (
    <div className="mt-5 text-xl space-y-2">
      <p>Sincerely,</p>
      {signatureUrl ? (
        <Image
          src={signatureUrl}
          alt="Signature"
          width={120}
          height={40}
          className="object-contain inline-block"
        />
      ) : (
        <p className="italic text-xl">{displayName}</p>
      )}
      <p className="font-bold">{displayName || "Lizzie Major"}</p>
    </div>
  );
}

// --- Top Wave ---
// function TopWave({ coverletterData }: { coverletterData: CoverLetterValues }) {
//   const { themeColor } = coverletterData;
//   return (
//     <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
//       <svg
//         className="w-full h-16"
//         style={{
//           backgroundColor: themeColor,
//         }}
//         viewBox="0 0 1440 320"
//         preserveAspectRatio="none">
//         <path
//           fill={themeColor}
//           d="M0,128L60,144C120,160,240,192,360,197.3C480,203,600,181,720,160C840,139,960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
//         />
//       </svg>
//     </div>
//   );
// }
// function TopWave({ coverletterData }: { coverletterData: CoverLetterValues }) {
//   const { themeColor } = coverletterData;

//   return (
//     <div
//       className="absolute top-0 left-0 w-full pointer-events-none z-0"
//       style={{
//         height: "70px", // Adjust the thickness of the top border here
//         backgroundColor: themeColor || "#ffd200",
//       }}
//     />
//   );
// }

// --- Bottom Wave ---
// function BottomWave({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   const { themeColor } = coverletterData;
//   return (
//     <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0 rotate-180">
//       <svg
//         className="w-full h-10"
//         viewBox="0 0 1440 320"
//         preserveAspectRatio="none">
//         <path
//           fill={themeColor}
//           d="M0,128L60,144C120,160,240,192,360,197.3C480,203,600,181,720,160C840,139,960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
//         />
//       </svg>
//     </div>
//   );
// }
