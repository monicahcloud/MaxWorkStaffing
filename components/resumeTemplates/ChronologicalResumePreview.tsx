"use client";

import React, { useEffect, useRef, useState } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import Image from "next/image";
import { formatDate } from "date-fns";
import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

function ChronologicalResumePreview({
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
        className={cn("space-y-6 p-6 origin-top-left  ", !width && "invisible")}
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
        <TechnicalSkillsSection resumeData={resumeData} />
        <InterestSection resumeData={resumeData} />
      </div>
    </div>
  );
}
// --- Subcomponents ---
export default ChronologicalResumePreview;

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
    linkedin,
    gitHub,
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
    <div className="relative w-full flex justify-center">
      {/* Left-aligned fixed image (only takes up space if it exists) */}
      {photoSrc && (
        <div className="absolute left-0 top-0 flex justify-start items-start h-full">
          <Image
            src={photoSrc}
            width={135}
            height={130}
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
        </div>
      )}

      {/* Centered content */}
      <div className="text-center space-y-1 ">
        <div className="">
          <p
            className="text-4xl font-bold capitalize"
            style={{
              color: themeColor,
            }}>
            {firstName} {lastName}
          </p>
          <p
            className="text-2xl capitalize"
            style={{
              color: themeColor,
            }}>
            {jobTitle}
          </p>
          <p className="text-xl capitalize">{address}</p>
        </div>

        <p className="text-sm text-gray-700">
          {phone}
          {phone && email ? " • " : ""}
          {[email].filter(Boolean).join(" • ")}
        </p>

        <p className="text-sm text-gray-700">
          {website}
          {website && (linkedin || gitHub) ? " • " : ""}
          {[linkedin, gitHub].filter(Boolean).join(" • ")}
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
          className="text-lg font-semibold text-center capitalize"
          style={{
            color: themeColor,
          }}>
          Professional Summary
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
        className="border-2 capitalize"
        style={{
          borderColor: themeColor,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold uppercase text-center"
          style={{
            color: themeColor,
          }}>
          Work experience
        </p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1 capitalize">
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
            <div className="flex items-center justify-between capitalize text-xs font-semibold">
              <span>{exp.company}</span>

              <span>{exp.location}</span>
            </div>
            <div className="whitespace-pre-line text-xs ">
              {exp.description}
            </div>
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
      <div className="space-y-3 capitalize">
        <p
          className="text-lg font-semibold uppercase text-center"
          style={{
            color: themeColor,
          }}>
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1 capitalize">
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
      <div className="break-inside-avoid space-y-3 capitalize">
        <p
          className="text-lg font-semibold uppercase text-center"
          style={{
            color: themeColor,
          }}>
          Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2 capitalize">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-md bg-black text-white hover:bg-black capitalize justify-between"
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
function TechnicalSkillsSection({ resumeData }: ResumePreviewProps) {
  const { techSkills, themeColor } = resumeData;
  if (!techSkills?.length) return null;
  return (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: themeColor,
        }}
      />
      <div className="break-inside-avoid space-y-3 capitalize">
        <p
          className="text-lg font-semibold uppercase text-center"
          style={{
            color: themeColor,
          }}>
          Technical Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2 capitalize">
          {techSkills.map((skill, index) => {
            const ratingPercentage = skill.rating * 20;

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4 capitalize">
                <h2 className="text-xs">{skill.name}</h2>
                <div className="h-2 bg-gray-200 w-[120px] capitalize">
                  <div
                    className="h-2"
                    style={{
                      width: `${ratingPercentage}%`,
                      backgroundColor: themeColor || "#000",
                    }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function InterestSection({ resumeData }: ResumePreviewProps) {
  const { interest, themeColor } = resumeData;

  if (!interest?.length) return null;

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
          className="text-lg font-semibold uppercase text-center"
          style={{
            color: themeColor,
          }}>
          Interests
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 list-none capitalize">
          {interest.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm capitalize">
              <Heart size={14} style={{ color: themeColor }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
