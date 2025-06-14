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

export function ShabachTemplate({
  className,
  coverletterData,
}: CoverLetterPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "bg-black text-white h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}>
      <div
        className={cn("m-10", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        id="resumePreviewContent">
        <MemoizedHeaderSection coverletterData={coverletterData} />
        <MemoizedUserPhoto coverletterData={coverletterData} />
        <MemoizedRecipientSection coverletterData={coverletterData} />
        <MemoizedBodySection coverletterData={coverletterData} />
        <MemoizedSignatureSection coverletterData={coverletterData} />
        {/* <MemoizedFooterSection coverletterData={coverletterData} /> */}
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
    <div className="flex w-[100%] space-y-6  justify-between font-lora">
      {/* Name Block */}
      <div style={{ color: themeColor }}>
        <h1 className="text-6xl font-lora leading-none tracking-wider uppercase">
          {coverletterData.firstName || ""}
        </h1>
        <div className="h-1 w-20 bg-white my-9" />
        <h2 className="text-6xl pl-25 -mt-20 font-lora tracking-wider uppercase">
          {coverletterData.lastName || ""}
        </h2>
      </div>
      {/* Contact Block */}
      <div
        className="text-lg text-right space-y-1 pr-5"
        style={{ color: themeColor }}>
        <p>📧 {coverletterData.userEmail || ""}</p>
        <p>🌐 {coverletterData.website || ""}</p>
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
    <div className="flex justify-end -my-10">
      <div className="overflow-hidden">
        <Image
          src={photoSrc || fallbackImage}
          alt="User Photo"
          width={100}
          height={100}
          className="object-cover w-62"
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
    <div className=" text-xl -mt-40 font-lora">
      <p className=" mb-5 ">
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className=" text-white">{coverletterData.recipientName}</p>
      <p>{coverletterData.companyName}</p>
      <p>{coverletterData.companyAddress}</p>
      <div className="h-px w-50 bg-white mt-4" />
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
    <div className="text-lg mt-5 font-lora text-white/90 space-y-5 leading-relaxed">
      <p>
        {coverletterData.recipientName
          ? `Dear ${coverletterData.recipientName},`
          : "To Whom It May Concern,"}
      </p>
      {coverletterData.body ? (
        <div dangerouslySetInnerHTML={{ __html: coverletterData.body }} />
      ) : (
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam quo
          alias adipisci iure, dignissimos sunt pariatur ratione, perspiciatis
          error reprehenderit sequi tempore harum facere assumenda qui. Sit
          placeat natus a? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Aut officiis vitae, expedita quae necessitatibus omnis
          aspernatur eveniet praesentium voluptas molestias in cupiditate dicta
          optio ex, voluptatem tenetur itaque eligendi ut!
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
    <div className="mt-4 text-xl font-lora ">
      <p>Best Regards,</p>
      {signatureUrl ? (
        <div className="w-[250px] pt-2">
          <Image
            src={signatureUrl}
            alt="Signature"
            width={200}
            height={100}
            className="object-contain"
          />
        </div>
      ) : (
        <p className="italic text-xl">{displayName}</p>
      )}
      <p className=""></p>
    </div>
  );
}
const MemoizedSignatureSection = React.memo(SignatureSection);

// function FooterSection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   const themeColor =
//     !coverletterData.themeColor || coverletterData.themeColor === "#000000"
//       ? "white"
//       : coverletterData.themeColor;
//   return (
//     <div
//       className="pt-6 border-t border-white/20 text-center text-xl mt-4 font-lora"
//       style={{ color: themeColor || "rgba(255,255,255,0.7)" }}>
//       {/* <p>{coverletterData.userAddress}</p> */}
//     </div>
//   );
// }
// const MemoizedFooterSection = React.memo(FooterSection);
