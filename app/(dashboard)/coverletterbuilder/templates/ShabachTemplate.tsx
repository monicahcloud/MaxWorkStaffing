"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";

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
  userName,
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
        "aspect-[210/297] bg-black text-white h-fit w-full",
        className
      )}
      ref={containerRef}>
      <div
        className={cn("space-y-6 p-6 origin-top-left ", !width && "invisible")}
        style={{
          width: "794px", // Lock original width
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="resumePreviewContent">
        <PersonalInfoSection
          userName={userName}
          userEmail={userEmail}
          userPhone={userPhone}
          userAddress={userAddress}
          userPhoto={userPhoto}
          date={date}
        />
        <EmployeeInfoSection
          recipientName={recipientName}
          companyName={companyName}
          jobTitle={jobTitle}
        />
        <BodySection
          body={body}
          recipientName={recipientName}
          userName={userName}
          signatureUrl={signatureUrl}
        />
      </div>
    </div>
  );
}

function PersonalInfoSection({
  userName,
  userEmail,
  userPhone,
  userAddress,
  userPhoto,
  date,
}: {
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userPhoto?: string;
  date?: string;
}) {
  const [firstName, lastName] = userName.split(" ");

  return (
    <div className="relative w-full flex justify-center text-white">
      <div className="text-center space-y-1">
        <div className="flex-1">
          <h1 className="text-5xl font-serif tracking-widest font-light">
            {firstName}
            <span className="block text-4xl font-medium">{lastName}</span>
          </h1>

          <div className="mt-6 space-y-1 text-sm text-white/80">
            <p>{date || new Date().toLocaleDateString()}</p>
            <p>{userAddress}</p>
            <p>📧 {userEmail}</p>
            <p>📞 {userPhone}</p>
          </div>
        </div>

        {userPhoto && (
          <div className="shrink-0 w-32 h-32">
            <Image
              src={userPhoto}
              alt="User Photo"
              width={128}
              height={128}
              className="object-cover rounded-md border border-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function EmployeeInfoSection({
  recipientName,
  companyName,
  jobTitle,
}: {
  recipientName: string;
  companyName: string;
  jobTitle: string;
}) {
  return (
    <div className="mt-4 space-y-1 text-sm text-white/80">
      <p className="font-semibold text-white">{recipientName}</p>
      <p>{jobTitle}</p>
      <p>{companyName}</p>
    </div>
  );
}

function BodySection({
  body,
  recipientName,
  userName,
  signatureUrl,
}: {
  body: string;
  recipientName: string;
  userName: string;
  signatureUrl?: string;
}) {
  return (
    <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/90">
      <p>
        <strong>Dear {recipientName || "Hiring Manager"},</strong>
      </p>
      <p>{body || "[Your cover letter body content will appear here.]"}</p>

      <div className="mt-10 space-y-2">
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
        <p className="font-semibold text-white">{userName}</p>
      </div>
    </div>
  );
}
