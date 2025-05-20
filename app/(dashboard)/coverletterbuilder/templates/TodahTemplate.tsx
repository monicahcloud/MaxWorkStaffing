"use client";

import { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string; // URL or base64
  signatureUrl?: string;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export function TodahTemplate({
  recipientName,
  companyName,
  body,
  userName,
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
          "relative space-y-6 p-6 origin-top-left z-10 font-lora ",
          !width && "invisible"
        )}
        style={{
          width: "794px",
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="coverletterPreviewContent">
        {/* Header */}
        <div className=" flex flex-col justify-center mx-auto text-center mt-25 ">
          <h1 className="text-black text-7xl">{userName || "Olivia Wilson"}</h1>
          <p className="text-xl">{userAddress || "1234 Main Street"}</p>
          <p className="text-lg">{userPhone || "1231231234"}</p>
          <p className="text-lg">{userEmail || "hello@email.com"}</p>
        </div>

        {/* Letter Body */}
        <div className="text-left mt-6 leading-relaxed ">
          <p className="text-xl font-semibold mt-5 mb-5">
            {new Date().toLocaleDateString()}
          </p>
          <p className="text-xl ">{companyName || "Company Name"}</p>
          <p className="text-xl"> {companyName || "Vita Design"}</p>

          <div className="">
            <div className="space-y-5 leading-relaxed mt-10">
              <p className="text-2xl">
                <strong>Dear {recipientName || "Hiring Manager"},</strong>
              </p>
              <p className="text-xl">
                {body ||
                  "  A cover letter allows you to professionally introduce yourself to a prospective employer. Your goal in writing your cover letter should be to encourage the employer to read your resume and consider you for a specific position."}
              </p>
              <p className="text-xl">
                Highlight your achievements, skills, experiences, and training
                that are relevant to the position you want to get. However,
                avoid simply repeating the information you included in your
                resume. Tailor your cover letter to each employer and job.
              </p>
              <p className="text-xl">
                Yes, you should maintain a professional air throughout the copy.
                Remember to also show genuine enthusiasm. Think of it as a smart
                casual gathering — not too formal, not too personal.
              </p>
            </div>
          </div>
          {/* Signature */}
          <div className="mt-10 space-y-2 text-xl">
            <p>Best Regards,</p>
            {signatureUrl ? (
              <Image
                src={signatureUrl}
                alt="Signature"
                width={120}
                height={40}
                className="object-contain"
              />
            ) : (
              <p className="italic text-xl">{userName || "Your Name"}</p>
            )}
            <p className="font-semibold text-lg ">Olivia Wilson</p>
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
