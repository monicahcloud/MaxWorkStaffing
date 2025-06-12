"use client";

import { useEffect, useRef, useState } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import fallbackImage from "../../../../assets/jobseeker.jpg";
import { CoverLetterValues } from "@/lib/validation";
import { BorderStyles } from "../../editor/BorderStyleButton";
import React from "react";

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
  const scale = width ? Math.min(width / 794, 1) : 1;
  return (
    <div
      ref={containerRef}
      className={cn(
        " aspect-[210/297] bg-white text-black h-fit w-full font-lora",
        className
      )}
      style={{ overflow: "auto" }}>
      <div
        className={cn(
          "grid grid-cols-[9rem_1fr] origin-top-left h-full font-lora w-full"
        )}
        style={{
          width: "794px",
          transform: `scale(${scale})`,
        }}
        ref={contentRef}
        id="resumePreviewContent">
        {/* Left Bar */}
        <MemoizedLeftBar coverletterData={coverletterData} />

        {/* Main Content */}
        <div className="bg-white flex flex-col h-full relative">
          <MemoizedUserPhotoOverlap coverletterData={coverletterData} />
          <MemoizedHeaderSection coverletterData={coverletterData} />
          <MemoizedBodySection coverletterData={coverletterData} />
          <MemoizedSignatureSection coverletterData={coverletterData} />
          <MemoizedContactSection coverletterData={coverletterData} />
        </div>
      </div>
    </div>
  );
}

function LeftBar({ coverletterData }: { coverletterData: CoverLetterValues }) {
  const { themeColor } = coverletterData;
  return (
    <div
      className="h-full w-full bg-[#ffd600]"
      style={{
        backgroundColor: themeColor || "#ffd600",
      }}
    />
  );
}
const MemoizedLeftBar = React.memo(LeftBar);

function UserPhotoOverlap({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { userPhoto, borderStyle } = coverletterData;

  const [photoSrc, setPhotoSrc] = useState(
    userPhoto instanceof File ? "" : userPhoto
  );

  useEffect(() => {
    const objectUrl =
      userPhoto instanceof File ? URL.createObjectURL(userPhoto) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (userPhoto === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [userPhoto]);
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
          borderRadius:
            borderStyle === BorderStyles.SQUARE
              ? "0px"
              : borderStyle === BorderStyles.CIRCLE
              ? "9999px"
              : "10%",
        }}>
        <Image
          src={photoSrc || fallbackImage}
          alt="User Photo"
          width={200}
          height={200}
          className="object-cover w-full h-full"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                ? "9999px"
                : "10%",
          }}
          priority
        />
      </div>
    </div>
  );
}
const MemoizedUserPhotoOverlap = React.memo(UserPhotoOverlap);

function HeaderSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { firstName, lastName, userName } = coverletterData;
  const displayName =
    userName || [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div className="relative bg-black text-white px-10 py-12 min-h-[180px] flex items-center font-lora">
      <div className="pl-[160px]">
        <h1 className="text-7xl font-bold uppercase font-lora tracking-wide">
          {displayName}
        </h1>
      </div>
    </div>
  );
}
const MemoizedHeaderSection = React.memo(HeaderSection);

function BodySection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { recipientName, body } = coverletterData;
  return (
    <div className="pt-15 px-5 font-lora mr-5 pb-6 space-y-6 text-lg leading-relaxed min-h-[300px]">
      <p>
        {recipientName ? `Dear ${recipientName},` : "To Whom It May Concern,"}
      </p>
      <div
        className="space-y-5  mt-5 text-lg font-lora"
        dangerouslySetInnerHTML={{
          __html:
            body ||
            `<p>A cover letter allows you to professionally introduce yourself...</p>`,
        }}
      />
    </div>
  );
}
const MemoizedBodySection = React.memo(BodySection);

function SignatureSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { signatureUrl, userName, firstName, lastName } = coverletterData;
  const displayName =
    userName || [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div className="px-5 mt-3 text-lg space-y-1 font-lora">
      <p>Best Regards,</p>
      {signatureUrl ? (
        <div className="w-[250px] -ml-15">
          <Image
            src={signatureUrl}
            alt="Signature"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>
      ) : (
        <p className="italic text-lg font-lg">{displayName}</p>
      )}
      <p className="">{displayName.trim() || ""}</p>
    </div>
  );
}
const MemoizedSignatureSection = React.memo(SignatureSection);

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
    <div className="px-10 py-3 text-lg font-lora mt-auto mb-2">
      <div className="flex items-center gap-3">
        <Phone
          className="text-yellow-500"
          size={22}
          style={{ color: themeColor }}
        />
        <span>{userPhone || ""}</span>
      </div>
      <div className="flex items-center gap-3">
        <Mail
          className="text-yellow-500"
          size={22}
          style={{ color: themeColor }}
        />
        <span>{userEmail || ""}</span>
      </div>
      <div className="flex items-center gap-3">
        <MapPin
          className="text-yellow-500"
          size={22}
          style={{ color: themeColor }}
        />
        <span>{userAddress || ""}</span>
      </div>
    </div>
  );
}
const MemoizedContactSection = React.memo(ContactSection);
