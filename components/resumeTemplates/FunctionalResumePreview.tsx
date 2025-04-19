import React, { useEffect, useRef, useState } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import Image from "next/image";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";
import { Badge } from "../ui/badge";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

function FunctionalResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        " aspect-[210/297] bg-white text-black h-fit w-full",
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
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

export default FunctionalResumePreview;

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
    themeColor,
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
    <div
      className={`flex items-center gap-6 ${
        !photoSrc ? "justify-center" : ""
      }`}>
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author photo"
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
      <div className="space-y-2.5 text-center md:text-center">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: themeColor,
            }}>
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: themeColor,
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
function SummarySection({ resumeData }: ResumePreviewProps) {
  const { summary, themeColor } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: themeColor,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: themeColor,
          }}>
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}
function WorkExperienceSection({ resumeData }: ResumePreviewProps) {
  const { workExperiences, themeColor } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: themeColor,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: themeColor,
          }}>
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: themeColor,
              }}>
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>{exp.company}</span>

              <span>{exp.location}</span>
            </div>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
function EducationSection({ resumeData }: ResumePreviewProps) {
  const { education, themeColor } = resumeData;

  const educationsNotEmpty = education?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: themeColor,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: themeColor,
          }}>
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-sm font-semibold"
              style={{
                color: themeColor,
              }}>
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${
                      edu.endDate
                        ? `- ${formatDate(edu.endDate, "MM/yyyy")}`
                        : ""
                    }`}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu.school}</span>

              <span>{edu.location}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function SkillsSection({ resumeData }: ResumePreviewProps) {
  const { skills, themeColor, borderStyle } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: themeColor,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold"
          style={{
            color: themeColor,
          }}>
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black"
              style={{
                backgroundColor: themeColor,
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "0px"
                    : borderStyle === BorderStyles.CIRCLE
                    ? "9999px"
                    : "8px",
              }}>
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
