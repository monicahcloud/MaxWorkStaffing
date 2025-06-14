"use client";

import { useRef } from "react";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { CoverLetterValues } from "@/lib/validation";
import React from "react";

interface Props {
  coverletterData: CoverLetterValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function Zamar({ coverletterData, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}>
      <div
        className={cn("", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent">
        <div className="">
          <MemoizedHeaderSection coverletterData={coverletterData} />
          <MemoizedBodySection coverletterData={coverletterData} />
          <MemoizedSignatureSection coverletterData={coverletterData} />
        </div>
      </div>
    </div>
  );
}

function HeaderSection({
  coverletterData,
}: {
  coverletterData: CoverLetterValues;
}) {
  const { firstName, lastName, themeColor, userName } = coverletterData;
  const displayName =
    userName || [firstName, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <div
      className=" bg-black  py-12 flex items-center justify-center"
      style={{ background: themeColor }}>
      <div className="">
        <h1 className="text-6xl text-center  text-white font-bold uppercase font-lora tracking-wide">
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
  const {
    recipientName,
    body,
    themeColor,
    userAddress,
    userEmail,
    userPhone,
    companyAddress,

    companyName,
  } = coverletterData;
  return (
    <div className="my-10 ">
      <div className="px-10 py-3 text-lg font-lora mt-auto mb-2">
        <div className="flex items-center gap-3">
          <MapPin className="" size={22} style={{ color: themeColor }} />
          <span>{userAddress}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="" size={22} style={{ color: themeColor }} />
          <span>{userEmail}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="" size={22} style={{ color: themeColor }} />
          <span>{userPhone}</span>
        </div>
      </div>

      <div className="text-left mt-6 mx-10 leading-relaxed font-serif">
        <p className="text-lg mt-5 mb-5">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
        </p>
        <p className="text-md">{recipientName}</p>
        <p className="text-md">{companyName}</p>

        <p className="text-md">{companyAddress}</p>
        <div className="space-y-5 leading-relaxed mt-5">
          <h1>
            {recipientName
              ? `Dear ${recipientName},`
              : "To Whom It May Concern,"}
          </h1>
          <div
            className="space-y-5 leading-relaxed mt-5 text-md"
            dangerouslySetInnerHTML={{
              __html:
                body ||
                `<p>A cover letter allows you to professionally introduce yourself...</p>`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
const MemoizedBodySection = React.memo(BodySection);

function SignatureSection({
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
    <div className=" text-md mx-10 -mt-5 font-lora">
      <p>Best Regards,</p>
      {signatureUrl ? (
        <div className="w-[250px] -ml-10">
          <Image
            src={signatureUrl}
            alt="Signature"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      ) : (
        <p className="italic text-lg">{displayName}</p>
      )}
    </div>
  );
}

const MemoizedSignatureSection = React.memo(SignatureSection);
