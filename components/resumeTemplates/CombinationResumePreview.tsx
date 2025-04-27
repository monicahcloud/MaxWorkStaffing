"use client";

import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useDimensions from "@/hooks/useDimensions";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Heart,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";
import { Badge } from "../ui/badge";
import { formatDate } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function CombinationResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

  return (
    <div
      className={cn(
        "aspect-[210/297] bg-white text-black h-fit w-full",
        className
      )}
      ref={containerRef}>
      <div
        className={cn("p-6 origin-top-left flex gap-2", !width && "invisible")}
        style={{ width: "794px", transform: `scale(${width / 794})` }}
        ref={contentRef}
        id="resumePreviewContent">
        {/* Sidebar */}
        <div className="w-[30%] space-y-6 text-sm text-gray-800">
          <Sidebar resumeData={resumeData} />
        </div>

        {/* Main Content */}
        <div className="w-[70%] space-y-6">
          <MainContent resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

function Sidebar({ resumeData }: { resumeData: ResumeValues }) {
  const {
    address,
    email,
    phone,
    website,
    photo,
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
    <div className="space-y-6 ">
      <Image
        src={photoSrc || "/placeholder-200x200.png"}
        width={200}
        height={200}
        alt="Author photo"
        className="aspect-square object-cover mx-auto justify-center items-center"
        style={{
          borderRadius:
            borderStyle === BorderStyles.SQUARE
              ? "0px"
              : borderStyle === BorderStyles.CIRCLE
              ? "9999px"
              : "10%",
        }}
      />

      <div className="space-y-2">
        {email && (
          <p className="flex items-center gap-2">
            <Mail size={14} style={{ color: themeColor }} /> {email}
          </p>
        )}
        {phone && (
          <p className="flex items-center gap-2">
            <Phone size={14} style={{ color: themeColor }} /> {phone}
          </p>
        )}
        {address && (
          <p className="flex items-center gap-2">
            <MapPin size={14} style={{ color: themeColor }} /> {address}
          </p>
        )}
        {website && (
          <p className="flex items-center gap-2">
            <Globe size={14} style={{ color: themeColor }} /> {website}
          </p>
        )}
        {linkedin && (
          <p className="flex items-center gap-2">
            <Linkedin size={14} style={{ color: themeColor }} /> {linkedin}
          </p>
        )}
        {gitHub && (
          <p className="flex items-center gap-2">
            <Github size={14} style={{ color: themeColor }} /> {gitHub}
          </p>
        )}
      </div>
      <TechnicalSkillsSection resumeData={resumeData} />
      <SkillsSection resumeData={resumeData} />
      <InterestSection resumeData={resumeData} />
    </div>
  );
}

function MainContent({ resumeData }: { resumeData: ResumeValues }) {
  const { firstName, lastName, jobTitle, summary, themeColor } = resumeData;

  return (
    <div>
      <div
        className="p-4 "
        style={{ backgroundColor: themeColor || "#f3f4f6" }}>
        <h1
          className="text-4xl font-bold"
          style={{ color: themeColor ? "#fff" : "#000" }}>
          {firstName} {lastName}
        </h1>
        <p
          className="text-lg font-semibold underline-offset-4"
          style={{ color: themeColor ? "#fff" : "#000" }}>
          {jobTitle}
        </p>
        <p
          className="text-sm whitespace-pre-line text-slate-200"
          style={{ color: themeColor ? "#e2e8f0" : "#333" }}>
          {summary}
        </p>
      </div>
      <div className="my-5">
        <WorkExperienceSection resumeData={resumeData} />
      </div>
      <div>
        <EducationSection resumeData={resumeData} />
      </div>
    </div>
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
          className="text-lg font-semibold uppercase"
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
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold uppercase"
          style={{
            color: themeColor,
          }}>
          Technical Skills
        </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {techSkills.map((skill, index) => {
            const ratingPercentage = skill.rating * 20;

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4">
                <h2 className="text-xs">{skill.name}</h2>
                <div className="h-2 bg-gray-200 w-[120px]">
                  <div
                    className="h-2"
                    style={{
                      width: `${ratingPercentage}%`,
                      backgroundColor: themeColor,
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
          className="text-lg font-semibold uppercase"
          style={{
            color: themeColor,
          }}>
          Interests
        </p>
        <ul className="space-y-1 list-none">
          {interest.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Heart size={14} style={{ color: themeColor }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// function InterestSection({ resumeData }: ResumePreviewProps) {
//   const { interest, themeColor, borderStyle } = resumeData;

//   if (!interest?.length) return null;

//   return (
//     <>
//       <hr
//         className="border-2"
//         style={{
//           borderColor: themeColor,
//         }}
//       />
//       <div className="break-inside-avoid space-y-3">
//         <p
//           className="text-lg font-semibold uppercase"
//           style={{
//             color: themeColor,
//           }}>
//           Interests
//         </p>
//         <div className="flex break-inside-avoid flex-wrap gap-2">
//           {interest.map((interest, index) => (
//             <Badge
//               key={index}
//               className="rounded-md bg-black text-white hover:bg-black"
//               style={{
//                 backgroundColor: themeColor,
//                 borderRadius:
//                   borderStyle === BorderStyles.SQUARE
//                     ? "0px"
//                     : borderStyle === BorderStyles.CIRCLE
//                     ? "9999px"
//                     : "8px",
//               }}>
//               {interest}
//             </Badge>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
function EducationSection({ resumeData }: ResumePreviewProps) {
  const { education, themeColor } = resumeData;

  const educationsNotEmpty = education?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <div className="space-y-3">
        <p
          className="text-lg font-semibold uppercase"
          style={{
            color: themeColor,
          }}>
          Education/Certifications
        </p>
        <hr
          className="border-1"
          style={{
            borderColor: themeColor,
          }}
        />
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

function WorkExperienceSection({ resumeData }: ResumePreviewProps) {
  const { workExperiences, themeColor } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <div className="space-y-3">
        <p
          className="text-lg font-semibold uppercase"
          style={{
            color: themeColor,
          }}>
          Work experience
        </p>
        <hr
          className="border-1"
          style={{
            borderColor: themeColor,
          }}
        />
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div
              className="flex items-center justify-between text-lg font-semibold"
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
            <div className="flex items-center justify-between text-md font-semibold">
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
