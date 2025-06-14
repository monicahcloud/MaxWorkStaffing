"use client";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { CoverLetterValues } from "@/lib/validation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BorderStyles } from "../../editor/BorderStyleButton";
import { Mail, MapPin, Phone } from "lucide-react";

interface CoverLetterPreviewProps {
  coverletterData: CoverLetterValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}
export default function ClassicTemplate({
  coverletterData,
  className,
}: CoverLetterPreviewProps) {
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
        <div className="flex w-full h-full">
          <SideBar coverletterData={coverletterData} />
          <Main coverletterData={coverletterData} />
        </div>
      </div>
    </div>
  );
}

function SideBar({ coverletterData }: CoverLetterPreviewProps) {
  const {
    userPhoto,
    firstName,
    lastName,
    jobTitle,
    companyAddress,
    themeColor,
    borderStyle,
    companyEmail,
    recipientName,
    companyName,
    companyPhone,
    website,
  } = coverletterData;

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
      className="w-1/4  p-6 font-lora min-h-screen"
      style={{ background: themeColor || "black" }}>
      <div className="mt-5 flex items-center justify-center">
        {photoSrc && (
          <Image
            src={photoSrc}
            width={200}
            height={200}
            alt="Author Photo"
            className="aspect-square object-cover"
            style={{
              borderRadius:
                borderStyle === BorderStyles.SQUARE
                  ? "0px"
                  : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
            }}
          />
        )}
      </div>
      {/* Company Info */}
      <div className=" mt-10">
        <div className="space-y-1">
          <p className="text-xl font-bold text-white">TO </p>
          <p className="text-md  text-white">{recipientName} </p>
          <p className="text-md  text-white">{companyName} </p>
          <p className="text-md  text-white">{companyEmail} </p>
          <p className="text-md  text-white">{companyAddress} </p>
          <p className="text-md  text-white">{companyPhone} </p>
        </div>
        <div className="h-0.5 w-full bg-white my-9" />
      </div>
      {/* Personal Info */}
      <div className=" mt-5">
        <div className="space-y-1">
          <p className="text-xl font-bold text-white uppercase"> from</p>
          <p className="text-md  text-white">
            {firstName} {lastName}{" "}
          </p>
          <p className="text-md  text-white">{jobTitle} </p>
        </div>
      </div>
      <div className="h-0.5 w-full bg-white my-9" />
      <div className="mt-5">
        {" "}
        <p className="text-xl font-bold text-white uppercase"> date</p>
        <p className="text-md  text-white">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="h-0.5 w-full bg-white my-9" />
      <div className="mt-5">
        {" "}
        <p className="text-xl font-bold text-white uppercase mt-5">
          {" "}
          follow me
        </p>
        <p className="text-lg text-white mt-5 capitalize"> LinkedIn:</p>
        <p className="text-md text-white "> {website}</p>
      </div>
      <div className="h-0.5 w-full bg-white my-9" />
    </div>
  );
}

function Main({ coverletterData }: CoverLetterPreviewProps) {
  const {
    userAddress,
    lastName,
    firstName,
    userEmail,
    userPhone,
    jobTitle,
    recipientName,
    body,
    themeColor,
  } = coverletterData;
  const signatureUrl =
    typeof coverletterData.signatureUrl === "string" &&
    coverletterData.signatureUrl.trim() !== ""
      ? coverletterData.signatureUrl
      : undefined;
  const displayName = (firstName || "") + " " + (lastName || "");
  return (
    <main className="flex-1">
      <div className="mt-10 p-6">
        <div className="grid grid-cols-2 justify-between ">
          <div className="justify-start">
            <h1
              className="text-4xl font-lora uppercase font-bold  "
              style={{
                color: themeColor || "#000",
              }}>
              {firstName}
            </h1>
            <h1
              className="text-4xl font-lora uppercase font-bold "
              style={{
                color: themeColor || "#000",
              }}>
              {lastName}
            </h1>
            <p className="text-md uppercase text-gray-800 ">{jobTitle}</p>
          </div>
          <div className="justify-end text-end space-y-2">
            <p className="text-base text-gray-800 font-lora flex items-center gap-2 ">
              <MapPin
                size="20"
                style={{
                  color: themeColor || "#000",
                }}
              />
              {userAddress}
            </p>

            <p className="text-base text-gray-800 font-lora flex items-center gap-2 ">
              <Phone
                size="20"
                style={{
                  color: themeColor || "#000",
                }}
              />
              {userPhone}
            </p>
            <p className="text-base text-gray-800  font-lora flex items-center gap-2 ">
              <Mail
                size="20"
                style={{
                  color: themeColor || "#000",
                }}
              />
              {userEmail}
            </p>
          </div>
        </div>
        {/* Greeting */}
        <div className="mt-10 text-lg  font-lora mb-5">
          <h1>
            {recipientName
              ? `Dear ${recipientName},`
              : "To Whom It May Concern,"}
          </h1>
        </div>
        {/* Body */}
        <div className="font-lora text-md">
          {" "}
          {body ? (
            <div dangerouslySetInnerHTML={{ __html: body }} />
          ) : (
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              quo alias adipisci iure, dignissimos sunt pariatur ratione,
              perspiciatis error reprehenderit sequi tempore harum facere
              assumenda qui. Sit placeat natus a? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aut officiis vitae, expedita quae
              necessitatibus omnis aspernatur eveniet praesentium voluptas
              molestias in cupiditate dicta optio ex, voluptatem tenetur itaque
              eligendi ut!
            </p>
          )}
        </div>
        {/* Closing and  Signature */}
        <div className="mt-4 text-xl font-lora ">
          <p> Regards,</p>
          {signatureUrl ? (
            <div className="w-[250px] pt-5">
              <Image
                src={signatureUrl}
                alt="Signature"
                width={150}
                height={100}
                className="object-contain"
              />
            </div>
          ) : (
            <p className="italic text-xl">{displayName}</p>
          )}
          <p className="font-lora">{displayName}</p>
        </div>
      </div>
    </main>
  );
}
