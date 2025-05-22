"use client";

import React, { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  recipientName: string;
  companyName: string;
  companyAddress: string;
  jobTitle: string;
  body: string;
  userName: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string;
  signatureUrl?: string;
  className?: string;

  contentRef?: React.Ref<HTMLDivElement>;
}

export function TodahTemplate({
  recipientName,
  companyName,
  companyAddress,
  body,
  firstName,
  lastName,
  userEmail,
  userPhone,
  userAddress,
  signatureUrl,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "relative aspect-[210/297] bg-white text-black h-fit w-full overflow-hidden",
        className
      )}
      ref={containerRef}>
      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <svg
          className="w-full h-24"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none">
          <path
            fill="#fbd3dc"
            d="M0,128L60,144C120,160,240,192,360,197.3C480,203,600,181,720,160C840,139,960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      {/* Content wrapper */}
      <div
        className={cn(
          "relative space-y-6 p-6 origin-top-left z-10 font-lora",
          !width && "invisible"
        )}
        style={{
          width: "794px",
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="coverletterPreviewContent">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mt-30">
          <div className="flex items-end space-x-4">
            <h1 className="text-7xl font-serif leading-none tracking-wide">
              {firstName || "Lizzie"}
            </h1>
            <h2 className="text-7xl font-serif leading-none tracking-wide">
              {lastName || "Major"}
            </h2>
          </div>

          <div className="h-1 w-100 bg-black my-4" />

          <p className="text-xl">{userAddress || "1234 Main Street"}</p>
          <p className="text-lg">{userPhone || "1231231234"}</p>
          <p className="text-lg">{userEmail || "hello@email.com"}</p>
        </div>

        {/* Letter Body */}
        <div className="text-left mt-6 leading-relaxed">
          <p className="text-xl font-semibold mt-5 mb-5">
            {new Date().toLocaleDateString()}
          </p>
          <p className="text-xl">{companyName || "Company Name"}</p>
          <p className="text-xl">{companyAddress || "Vita Design"}</p>

          <div className="space-y-5 leading-relaxed mt-10">
            <p className="text-2xl">
              <strong>Dear {recipientName || "Hiring Manager"},</strong>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: body?.includes("<p>")
                  ? body
                  : `<p>${body?.replace(/\n\n/g, "</p><p>").trim()}</p>`,
              }}
            />
          </div>

          {/* Signature */}
          <div className="mt-5 text-xl space-y-2 ">
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
              <p className="italic text-xl">
                {firstName || lastName
                  ? `${firstName} ${lastName}`.trim()
                  : "Your Name"}
              </p>
            )}
            <p className="font-bold">
              {firstName || lastName
                ? `${firstName} ${lastName}`.trim()
                : "Lizze Major"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0 rotate-180">
        <svg
          className="w-full h-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none">
          <path
            fill="#fbd3dc"
            d="M0,128L60,144C120,160,240,192,360,197.3C480,203,600,181,720,160C840,139,960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>
    </div>
  );
}
