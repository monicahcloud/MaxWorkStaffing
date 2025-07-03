"use client";

import React, { useEffect, useRef, useState } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import Image from "next/image";
import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";
import {
  Github,
  Globe,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatDate } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

export default function FunctionalResumePreview({
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
        className={cn("space-y-6 p-4 origin-top-left ", !width && "invisible")}
        style={{
          width: "794px",
          transform: `scale(${width / 794})`,
        }}
        ref={contentRef}
        id="resumePreviewContent">
        <div className="w-[100%] space-y-6 ">
          <PersonalInfoHeader resumeData={resumeData} />
        </div>
        <div className="w-[100%] space-y-6">
          <MainContent resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
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
    summary,
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
    <div className="grid-cols-2  ">
      <Card className="personal-info-card flex flex-col md:flex-row md:items-start gap-6 p-2 px-4 bg-primary-foreground shadow-md">
        <div className="flex-1">
          <h1 className="text-4xl font-bold" style={{ color: themeColor }}>
            {firstName} {lastName}
          </h1>
          <h2 className="text-lg text-muted-foreground">{jobTitle}</h2>
          <p className="mt-4 text-sm text-muted-foreground">{summary}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          {photoSrc && (
            <Image
              src={photoSrc || "/placeholder-200x200.png"}
              width={100}
              height={100}
              alt="Author photo"
              className="w-48 h-48 rounded-full object-cover"
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
          <div className="flex flex-col  text-sm text-muted-foreground space-y-1">
            <p className="flex gap-2">
              <Mail size={14} style={{ color: themeColor }} /> {email}
            </p>

            <p className="flex  gap-2">
              <Phone size={14} style={{ color: themeColor }} /> {phone}
            </p>

            <p className="flex  gap-2">
              <MapPin size={14} style={{ color: themeColor }} /> {address}
            </p>

            <p className="flex  gap-2">
              <Globe size={14} style={{ color: themeColor }} /> {website}
            </p>

            <p className="flex  gap-2">
              <Linkedin size={14} style={{ color: themeColor }} /> {linkedin}
            </p>

            <p className="flex  gap-2">
              <Github size={14} style={{ color: themeColor }} /> {gitHub}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
function MainContent({ resumeData }: ResumePreviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* Left Side - Work Experience */}
      <WorkExperienceSection resumeData={resumeData} />

      {/* Right Side - Skills, Education, etc */}
      <div className="space-y-4">
        <SkillsSection resumeData={resumeData} />
        <div className="space-y-4">
          <TechnicalSkillsSection resumeData={resumeData} />
        </div>
        <div>
          <EducationSection resumeData={resumeData} />
        </div>

        <div>
          <InterestSection resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
function WorkExperienceSection({ resumeData }: ResumePreviewProps) {
  const { workExperiences, themeColor } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <div className="md:col-span-2 space-y-2">
      <Card className="break-inside-avoid space-y-3">
        <CardContent className="px-2">
          <h3
            className="text-2xl font-semibold  "
            style={{
              color: themeColor,
            }}>
            Work Experience
          </h3>
          {workExperiences && workExperiences.length > 0 ? (
            workExperiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <h4
                  className="text-lg font-semibold"
                  style={{
                    borderColor: themeColor,
                  }}>
                  {exp.position}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {exp.company} | {exp.location} (
                  {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                  )
                </p>

                <div className="whitespace-pre-line text-xs">
                  {exp.description}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No work experience listed.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SkillsSection({ resumeData }: ResumePreviewProps) {
  const { skills, themeColor, borderStyle } = resumeData;

  if (!skills?.length) return null;
  return (
    <>
      <Card className="break-inside-avoid space-y-1">
        <CardContent className="px-4">
          <h3
            className="text-xl font-semibold mb-2"
            style={{
              color: themeColor,
            }}>
            Skills & Competencies
          </h3>

          <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, idx) => (
                <Badge
                  key={idx}
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
              ))
            ) : (
              <p className="text-muted-foreground">No skills listed.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function TechnicalSkillsSection({ resumeData }: ResumePreviewProps) {
  const { techSkills, themeColor } = resumeData;
  if (!techSkills?.length) return null;
  return (
    <>
      <Card className="w-full max-w-md shadow-lg break-inside-avoid space-y-3">
        <CardContent className="px-6 space-y-1">
          <h3
            className="text-xl font-semibold mb-2"
            style={{
              color: themeColor,
            }}>
            Technical Skills
          </h3>
          {techSkills.map((skill, index) => {
            const ratingPercentage = skill.rating * 20;
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-medium">{skill.name}</h2>
                <div className="relative w-[120px] h-2 bg-gray-200 rounded">
                  <div
                    className="absolute top-0 left-0 h-2 rounded"
                    style={{
                      width: `${ratingPercentage}%`,
                      backgroundColor: themeColor || "#000", // Consider making `themeColor` dynamic or contextual
                    }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
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
      <Card className="break-inside-avoid space-y-1">
        <CardContent className="px-4">
          <h3
            className="text-xl font-semibold mb-2"
            style={{
              color: themeColor,
            }}>
            Education & Certifications
          </h3>

          <ul className=" space-y-2 text-sm text-muted-foreground">
            {education && education.length > 0 ? (
              education.map((edu, idx) => (
                <li key={idx}>
                  <div
                    className="font-semibold capitalize"
                    style={{
                      color: themeColor,
                    }}>
                    {edu.school}
                  </div>{" "}
                  <div>{edu.degree}</div>
                  {edu.startDate && (
                    <div>
                      {edu.startDate &&
                        `${formatDate(edu.startDate, "MM/yyyy")} ${
                          edu.endDate
                            ? `- ${formatDate(edu.endDate, "MM/yyyy")}`
                            : ""
                        }`}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-muted-foreground">No education listed.</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
function InterestSection({ resumeData }: ResumePreviewProps) {
  const { interest, themeColor } = resumeData;

  if (!interest?.length) return null;

  return (
    <>
      <Card className="break-inside-avoid space-y-3">
        <CardContent>
          <h3
            className="text-xl font-semibold mb-2"
            style={{
              color: themeColor,
            }}>
            Interests
          </h3>
          <ul className="space-y-1 list-none">
            {interest.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Heart size={14} style={{ color: themeColor }} />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
