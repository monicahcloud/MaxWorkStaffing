import React, { useEffect, useRef, useState } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import Image from "next/image";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

function ResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}>
      <div
        className={cn("space-y-6 p-6 origin-top-left", !width && "invisible")}
        style={{
          width: "794px", // Lock original width
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="resumePreviewContent">
        <PersonalInfoHeader resumeData={resumeData} />
      </div>
    </div>
  );
}

export default ResumePreview;

interface ResumePreviewProps {
  resumeData: ResumeValues;
}
function PersonalInfoHeader({ resumeData }: ResumePreviewProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    address,
    phone,
    email,
    website,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}>
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}>
            {jobTitle}
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {address}

          {address && (phone || email || website) ? " • " : ""}
          {[phone, email, website].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}
