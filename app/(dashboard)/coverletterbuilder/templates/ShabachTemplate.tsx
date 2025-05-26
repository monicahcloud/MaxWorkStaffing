"use client";
import React, { useRef } from "react";
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
function getUserPhotoSrc(userPhotoUrl: unknown): string | undefined {
  if (typeof userPhotoUrl === "string" && userPhotoUrl.trim() !== "") {
    return userPhotoUrl;
  }
  return undefined;
}

export function ShabachTemplate({
  className,
  contentRef,
  coverletterData,
}: CoverLetterPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  // Safely get user photo src (or fallback)
  const userPhotoSrc =
    getUserPhotoSrc(coverletterData.userPhotoUrl) || fallbackImage?.src;
  // Only render if it's a non-empty string
  const showUserPhoto = Boolean(userPhotoSrc);

  // Signature image logic
  const signatureUrl =
    typeof coverletterData.signatureUrl === "string" &&
    coverletterData.signatureUrl.trim() !== ""
      ? coverletterData.signatureUrl
      : undefined;

  return (
    <div
      className={cn(
        "aspect-[210/297] bg-black  text-white w-full h-fit",
        className
      )}
      ref={containerRef}>
      <div
        className={cn(
          "origin-top-left space-y-6 p-10  font-lora",
          !width && "invisible"
        )}
        style={{
          width: "794px",
          transform: width ? `scale(${width / 794})` : undefined,
        }}
        ref={contentRef}
        id="coverletterPreviewContent">
        {/* Header Section */}
        <div className="flex w-[100%] space-y-6  mt-20 justify-between">
          {/* Name Block */}
          <div
            style={{
              color:
                !coverletterData.themeColor ||
                coverletterData.themeColor === "#000000"
                  ? "white"
                  : coverletterData.themeColor,
            }}>
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
            style={{
              color:
                !coverletterData.themeColor ||
                coverletterData.themeColor === "#000000"
                  ? "white"
                  : coverletterData.themeColor,
            }}>
            <p>📧 {coverletterData.userEmail || "hello@reallygreatsite.com"}</p>
            <p>🌐 {coverletterData.website || "@reallygreatsite"}</p>
          </div>
        </div>

        {/* Image aligned to right side */}
        {showUserPhoto && (
          <div className="flex justify-end -mt-20">
            <div className="overflow-hidden">
              <Image
                src={userPhotoSrc}
                alt="User Photo"
                width={100}
                height={100}
                className="object-cover w-70 h-70"
                style={{
                  borderRadius:
                    coverletterData.borderStyle === BorderStyles.SQUARE
                      ? "0px"
                      : coverletterData.borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "10%",
                }}
                priority
              />
            </div>
          </div>
        )}

        {/* Recipient Info */}
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

        {/* Body Content */}
        <div className="text-xl text-white/90 space-y-5 leading-relaxed">
          <p>
            <strong>
              Dear {coverletterData.recipientName || "Hiring Manager"},
            </strong>
          </p>
          {coverletterData.body ? (
            <div
              // This is safe if your AI is trusted, and lets you render <p> tags as real paragraphs!
              dangerouslySetInnerHTML={{ __html: coverletterData.body }}
            />
          ) : (
            <p>
              A cover letter allows you to professionally introduce yourself to
              a prospective employer. Your goal in writing your cover letter
              should be to encourage the employer to read your resume and
              consider you for a specific position.
            </p>
          )}
        </div>
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
                color: coverletterData.signatureColor || "white", // fallback to white for dark backgrounds
              }}>
              {coverletterData.firstName || coverletterData.lastName
                ? `${coverletterData.firstName ?? ""} ${
                    coverletterData.lastName ?? ""
                  }`.trim()
                : "Your Name"}
            </p>
          )}
          <p className="font-bold">
            {coverletterData.firstName || coverletterData.lastName
              ? `${coverletterData.firstName ?? ""} ${
                  coverletterData.lastName ?? ""
                }`.trim()
              : "Lizze Major"}
          </p>
          <p className="text-md ">
            {coverletterData.userPhone || "123-456-7890"}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/20 text-center text-lg text-white/70 mt-4">
          <p
            style={{
              color:
                !coverletterData.themeColor ||
                coverletterData.themeColor === "#000000"
                  ? "white"
                  : coverletterData.themeColor,
            }}>
            {coverletterData.userAddress || "1234 Main St, Anytown USA"}
          </p>
        </div>
      </div>
    </div>
  );
}
