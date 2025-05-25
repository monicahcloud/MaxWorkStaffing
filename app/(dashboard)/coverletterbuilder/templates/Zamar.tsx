"use client";

import { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import fallbackImage from "../../../../assets/jobseeker.jpg";
import { CoverLetterValues } from "@/lib/validation";
import { BorderStyles } from "../../editor/BorderStyleButton";

interface Props {
  coverletterData: CoverLetterValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function Zamar({
  coverletterData,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);
  const themeColor = coverletterData.themeColor || "#FFD600";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[210/297] bg-white text-black h-fit w-full overflow-hidden",
        className
      )}>
      <div
        className={cn(
          "grid grid-cols-[9rem_1fr] origin-top-left h-full w-full"
        )}
        style={{
          width: "794px",
          minHeight: "1123px",
          transform: width ? `scale(${width / 794})` : undefined,
        }}
        ref={contentRef}
        id="coverletterPreviewContent">
        {/* Left Bar */}
        <LeftBar themeColor={themeColor} />

        {/* Main Content */}
        <div className="bg-white flex flex-col h-full relative">
          <UserPhotoOverlap coverletterData={coverletterData} />
          <HeaderSection coverletterData={coverletterData} />
          <BodySection coverletterData={coverletterData} />
          <SignatureSection coverletterData={coverletterData} />
          <ContactSection coverletterData={coverletterData} />
        </div>
      </div>
    </div>
  );
}

function LeftBar({ themeColor }: { themeColor: string }) {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: themeColor,
      }}
    />
  );
}

function UserPhotoOverlap({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { userPhoto, borderStyle, themeColor = "#FFD600" } = coverletterData;
  const userPhotoSrc = getUserPhotoSrc(userPhoto) || fallbackImage?.src;
  const borderRadius = borderStyle === BorderStyles.SQUARE ? "0px" : "9999px";

  return (
    <div
      className="absolute z-20"
      style={{
        left: "-60px",
        top: "60px",
        width: "200px",
        height: "200px",
        pointerEvents: "none",
      }}>
      <div
        className="w-[200px] h-[200px] flex items-center justify-center overflow-hidden"
        style={{
          borderWidth: "4px",
          borderStyle: borderStyle,
          borderColor: themeColor,
          borderRadius: borderRadius,
          background: "#fff",
        }}>
        <Image
          src={userPhotoSrc}
          alt="User Photo"
          width={200}
          height={200}
          className="object-cover w-full h-full"
          style={{
            borderRadius: borderRadius,
          }}
          priority
        />
      </div>
    </div>
  );
}

function HeaderSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { firstName, lastName, userName } = coverletterData;
  const displayName =
    userName || [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div className="relative bg-black text-white px-10 py-12 min-h-[180px] flex items-center">
      <div className="pl-[160px]">
        <h1 className="text-6xl font-bold uppercase tracking-wide">
          {displayName}
        </h1>
      </div>
    </div>
  );
}

function BodySection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { recipientName, body } = coverletterData;
  return (
    <div className="pt-15 px-10 mr-10 pb-6 space-y-6 text-xl leading-relaxed min-h-[400px]">
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
  );
}

function SignatureSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { signatureUrl, userName, firstName, lastName } = coverletterData;
  const displayName =
    userName || [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div className="px-10 mt-4 text-xl space-y-2">
      <p>Best Regards,</p>
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
      <p className="font-bold">{displayName}</p>
    </div>
  );
}

function ContactSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const {
    userPhone,
    userEmail,
    userAddress,
    themeColor = "#FFD600",
  } = coverletterData;

  return (
    <div className="px-10 py-3 text-xl mt-auto mb-2">
      <div className="flex items-center gap-3">
        <Phone
          className="text-yellow-500"
          size={22}
          style={{ color: themeColor }}
        />
        <span>{userPhone || "123-456-7890"}</span>
      </div>
      <div className="flex items-center gap-3">
        <Mail
          className="text-yellow-500"
          size={22}
          style={{ color: themeColor }}
        />
        <span>{userEmail || "hello@reallygreatsite.com"}</span>
      </div>
      <div className="flex items-center gap-3">
        <MapPin
          className="text-yellow-500"
          size={22}
          style={{ color: themeColor }}
        />
        <span>{userAddress || "123 Anywhere St., Any City"}</span>
      </div>
    </div>
  );
}

// Helper function
function getUserPhotoSrc(userPhoto: unknown): string | undefined {
  if (typeof userPhoto === "string" && userPhoto.trim() !== "") {
    return userPhoto;
  }
  // Only for local preview immediately after selection:
  if (typeof window !== "undefined" && userPhoto instanceof File) {
    return URL.createObjectURL(userPhoto);
  }
  return undefined;
}
