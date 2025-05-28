"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CoverLetterValues } from "@/lib/validation";
import useDimensions from "@/hooks/useDimensions";
import fallbackImage from "../../../../assets/jobseeker.jpg";
import { BorderStyles } from "../../editor/BorderStyleButton";

interface CoverLetterPreviewProps {
  coverletterData: CoverLetterValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

// Helper to get a safe photo src
// function getUserPhotoSrc(userPhotoUrl: unknown): string | undefined {
//   if (typeof userPhotoUrl === "string" && userPhotoUrl.trim() !== "") {
//     return userPhotoUrl;
//   }
//   return undefined;
// }
// --- Main Template ---
export function ShabachTemplate({
  className,
  contentRef,
  coverletterData,
}: CoverLetterPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      ref={containerRef}
      className={cn(
        "aspect-[210/297] bg-black  text-white w-full h-fit",
        className
      )}>
      <div
        className={cn(
          "origin-top-left space-y-6 p-10  font-lora",
          !width && "invisible"
        )}
        style={{
          width: "794px",
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="coverletterPreviewContent">
        <MemoizedHeaderSection coverletterData={coverletterData} />
        <MemoizedUserPhoto coverletterData={coverletterData} />
        <MemoizedRecipientSection coverletterData={coverletterData} />
        <MemoizedBodySection coverletterData={coverletterData} />
        <MemoizedSignatureSection coverletterData={coverletterData} />
        <MemoizedFooterSection coverletterData={coverletterData} />
      </div>
    </div>
  );
}

// --- Subcomponents ---

function HeaderSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const themeColor =
    !coverletterData.themeColor || coverletterData.themeColor === "#000000"
      ? "white"
      : coverletterData.themeColor;
  return (
    <div className="flex w-[100%] space-y-6  mt-20 justify-between">
      {/* Name Block */}
      <div style={{ color: themeColor }}>
        <h1 className="text-7xl font-serif leading-none tracking-widest">
          {coverletterData.firstName || "Lizzie"}
        </h1>
        <div className="h-1 w-20 bg-white my-9" />
        <h2 className="text-7xl pl-25 -mt-20 font-serif tracking-widest">
          {coverletterData.lastName || "Major"}
        </h2>
      </div>
      {/* Contact Block */}
      <div
        className="text-lg text-right space-y-1 pr-5"
        style={{ color: themeColor }}>
        <p>📧 {coverletterData.userEmail || "hello@reallygreatsite.com"}</p>
        <p>🌐 {coverletterData.website || "@reallygreatsite"}</p>
      </div>
    </div>
  );
}
const MemoizedHeaderSection = React.memo(HeaderSection);

function UserPhoto({
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
    <div className="flex justify-end -mt-20">
      <div className="overflow-hidden">
        <Image
          src={photoSrc || fallbackImage}
          alt="User Photo"
          width={100}
          height={100}
          className="object-cover w-70 h-70"
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
const MemoizedUserPhoto = React.memo(UserPhoto);

function RecipientSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  return (
    <div className="text-lg -mt-50">
      <p className="text-xl ">{new Date().toLocaleDateString()}</p>
      <p className=" text-white">
        {coverletterData.recipientName || "Hiring Manager Name"}
      </p>
      <p>{coverletterData.companyName || "Company Name"}</p>
      <p>
        {coverletterData.companyAddress ||
          "123 Anywhere St., Any City, ST 12345"}
      </p>
      <div className="h-px w-16 bg-white/50 mt-2" />
    </div>
  );
}
const MemoizedRecipientSection = React.memo(RecipientSection);

function BodySection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  return (
    <div className="text-xl text-white/90 space-y-5 leading-relaxed">
      <p>
        <strong>
          Dear {coverletterData.recipientName || "Hiring Manager"},
        </strong>
      </p>
      {coverletterData.body ? (
        <div dangerouslySetInnerHTML={{ __html: coverletterData.body }} />
      ) : (
        <p>
          A cover letter allows you to professionally introduce yourself to a
          prospective employer. Your goal in writing your cover letter should be
          to encourage the employer to read your resume and consider you for a
          specific position.
        </p>
      )}
    </div>
  );
}
const MemoizedBodySection = React.memo(BodySection);

function SignatureSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const signatureUrl =
    typeof coverletterData.signatureUrl === "string" &&
    coverletterData.signatureUrl.trim() !== ""
      ? coverletterData.signatureUrl
      : undefined;
  const displayName =
    (coverletterData.firstName || "") + " " + (coverletterData.lastName || "");
  return (
    <div className="mt-4 text-xl  ">
      <p>Best Regards,</p>
      {signatureUrl ? (
        <Image
          src={signatureUrl}
          alt="Signature"
          width={120}
          height={40}
          className="object-contain inline-block"
          priority
        />
      ) : (
        <p
          className="italic text-xl"
          style={{
            color: coverletterData.signatureColor || "white",
          }}>
          {displayName.trim() || "Your Name"}
        </p>
      )}
      <p className="font-bold">{displayName.trim() || "Lizzie Major"}</p>
      <p className="text-md ">{coverletterData.userPhone || "123-456-7890"}</p>
    </div>
  );
}
const MemoizedSignatureSection = React.memo(SignatureSection);

function FooterSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const themeColor =
    !coverletterData.themeColor || coverletterData.themeColor === "#000000"
      ? "white"
      : coverletterData.themeColor;
  return (
    <div className="pt-6 border-t border-white/20 text-center text-lg text-white/70 mt-4">
      <p style={{ color: themeColor }}>
        {coverletterData.userAddress || "1234 Main St, Anytown USA"}
      </p>
    </div>
  );
}
const MemoizedFooterSection = React.memo(FooterSection);
