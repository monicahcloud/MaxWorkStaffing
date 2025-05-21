"use client";

import { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import defaultPhoto from "../../../../assets/jobseeker.jpg";

interface Props {
  recipientName: string;
  companyName: string;
  jobTitle: string;
  body: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string;
  signatureUrl?: string;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function Zamar({
  recipientName,
  body,
  userName,
  userEmail,
  userPhone,
  userAddress,
  userPhoto,
  signatureUrl,
  className,
  contentRef,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[210/297] bg-white text-black h-fit w-full overflow-hidden",
        className
      )}>
      <div
        className="flex origin-top-left"
        style={{
          width: "794px",
          transform: width ? `scale(${width / 794})` : undefined,
        }}
        ref={contentRef}
        id="coverletterPreviewContent">
        {/* Fixed Left Yellow Bar */}
        <div className="w-36 flex-shrink-0 bg-yellow-400" />

        {/* Main Content */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Header Section */}
          <div className="relative bg-black text-white px-10 py-12">
            {/* Photo Circle - Absolutely Positioned */}
            <div className="absolute -bottom-15 left-5 translate-x-[-50%] z-10">
              <div className="w-50 h-50 rounded-full border-4 border-yellow-400 overflow-hidden bg-white">
                <Image
                  src={userPhoto || defaultPhoto}
                  alt="User Photo"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="px-30">
              <h1 className="text-6xl font-bold uppercase tracking-wide">
                {userName || " Olivia washington"}
              </h1>
            </div>
          </div>

          {/* Body Section */}
          <div className="pt-20 px-10 mr-25 pb-6 space-y-6 text-xl leading-relaxed min-h-[400px]">
            <p>Dear {recipientName || "Mr. Gallego"},</p>
            <p>
              {body ||
                `A cover letter allows you to professionally introduce yourself to a prospective
                employer. Your goal in writing your cover letter should be to encourage the employer
                to read your resume and consider you for a specific position.`}
            </p>
            <p>
              Highlight your achievements, skills, experiences, and training
              that are relevant to the position you want to get. However, avoid
              simply repeating the information you included in your resume.
              Tailor your cover letter to each employer and job.
            </p>
            <p>
              Maintain a professional tone, but let your enthusiasm show. Think
              of it as a smart casual gathering — not too formal, not too
              personal.
            </p>
          </div>

          {/* Signature Block */}
          <div className="px-10 mt-4 text-xl space-y-2 ">
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
              <p className="italic text-xl">{userName || "Your Name"}</p>
            )}
            <p className="font-bold">{userName || "Margarita Perez"}</p>
          </div>

          {/* Contact Info */}
          <div className="mt-8 px-10 py-3 text-xl space-y-2">
            <div className="flex items-center gap-3">
              <Phone className="text-yellow-500" size={22} />
              <span>{userPhone || "123-456-7890"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-yellow-500" size={22} />
              <span>{userEmail || "hello@reallygreatsite.com"}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-yellow-500" size={22} />
              <span>{userAddress || "123 Anywhere St., Any City"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
