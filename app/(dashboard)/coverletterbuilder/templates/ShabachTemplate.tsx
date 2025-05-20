"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import image from "../../../../assets/jobseeker.jpg";

interface Props {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  firstName: string;
  lastName: string;
  fullname: string;
  website: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string;
  signatureUrl?: string;
  date?: string;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
  width?: number;
}

export function ShabachTemplate({
  recipientName,
  companyName,
  jobTitle,
  body,
  firstName,
  lastName,
  website,
  userEmail,
  userPhone,
  userAddress,
  userPhoto,
  signatureUrl,
  date,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "relative aspect-[210/297] bg-black text-white h-fit w-full overflow-hidden",
        className
      )}
      ref={containerRef}>
      <div
        className={cn(
          "origin-top-left space-y-6 p-10 font-lora",
          !width && "invisible"
        )}
        style={{
          width: "794px",
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="coverletterPreviewContent">
        {/* Header Section */}
        <div className="flex justify-between">
          {/* Name Block */}
          <div>
            <h1 className="text-7xl font-serif leading-none tracking-widest">
              {firstName || "Lizzie"}
            </h1>
            <div className="h-1 w-20 bg-white my-9" />
            <h2 className="text-7xl pl-25 -mt-20 font-serif tracking-widest">
              {lastName || "Major"}
            </h2>
          </div>

          {/* Contact Block */}
          <div className="text-lg text-white/80 text-right space-y-1 pr-5">
            <p>📧 {userEmail || "hello@reallygreatsite.com"}</p>
            <p>🌐 {website || "@reallygreatsite"}</p>
          </div>
        </div>

        {/* Image aligned to right side */}
        {(userPhoto || image?.src) && (
          <div className="flex justify-end -mt-20">
            <div className="w-75 h-70 rounded-md overflow-hidden border border-white">
              <Image
                src={userPhoto || image.src}
                alt="User Photo"
                width={300}
                height={240}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
        {/* Recipient Info */}
        <div className="text-lg space-y-1 -mt-45">
          <p>{date || new Date().toLocaleDateString()}</p>
          <p className="font-semibold text-white">
            {recipientName || "Ms. Estelle"}
          </p>
          <p>{jobTitle || "Founder Borcelle"}</p>
          <p>{companyName || "123 Anywhere St., Any City, ST 12345"}</p>
          <div className="h-px w-16 bg-white/50 mt-2" />
        </div>

        {/* Body Content */}
        <div className="text-xl text-white/90 space-y-5 leading-relaxed">
          <p>
            <strong>Dear {recipientName || "Hiring Manager"},</strong>
          </p>
          <p>
            {body ||
              `A cover letter allows you to professionally introduce yourself to a prospective
              employer. Your goal in writing your cover letter should be to encourage the employer
              to read your resume and consider you for a specific position.`}
          </p>
          <p>
            Highlight your achievements, skills, experiences, and training that
            are relevant to the position you want to get. However, avoid simply
            repeating the information you included in your resume. Tailor your
            cover letter to each employer and job.
          </p>
          <p>
            Yes, you should maintain a professional air throughout the copy.
            Remember to also show genuine enthusiasm. Think of it as a smart
            casual gathering — not too formal, not too personal.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-10 text-lg">
          <p>Best Regards,</p>
          {signatureUrl && (
            <Image
              src={signatureUrl}
              alt="Signature"
              width={120}
              height={40}
              className="object-contain"
            />
          )}
          <p className="font-semibold text-white">
            {firstName || lastName
              ? `${firstName} ${lastName}`.trim()
              : "Shawn Garcia"}
          </p>
          <p className="font-semibold text-white">
            {userPhone || "123-123-1234"}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/20 text-center text-lg text-white/70 mt-4">
          <p className="font-semibold text-white">
            {userAddress || "1234 Main St, Anytown USA"}
          </p>
        </div>
      </div>
    </div>
  );
}
