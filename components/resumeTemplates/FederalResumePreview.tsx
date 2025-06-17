"use client";
import React, { useRef } from "react";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import useDimensions from "@/hooks/useDimensions";
import { formatDate } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
  contentRef?: React.Ref<HTMLDivElement>;
}

function FederalResumePreview({
  resumeData,
  className,
  contentRef,
}: ResumePreviewProps) {
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
        {/* <SkillsSection resumeData={resumeData} /> */}
      </div>
    </div>
  );
}

export default FederalResumePreview;

interface ResumePreviewProps {
  resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumePreviewProps) {
  const { firstName, lastName, address, phone, email, website, themeColor } =
    resumeData;
  return (
    <>
      <div className="justify-center">
        <div className="space-y-2.5 text-center md:text-center">
          <p className="text-sm text-gray-500">
            {address}
            {address && (phone || email || website) ? " • " : ""}
            {[phone, email, website].filter(Boolean).join(" • ")}
          </p>
          <hr
            className="border-2"
            style={{
              borderColor: themeColor,
            }}
          />
          <div className="space-y-1">
            <p
              className="text-4xl mt-3 font-bold"
              style={{
                color: themeColor,
              }}>
              {firstName} {lastName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
function SummarySection({ resumeData }: ResumePreviewProps) {
  const { summary, themeColor } = resumeData;

  if (!summary) return null;

  return (
    <>
      <div className="break-inside-avoid space-y-3">
        <p
          className="text-lg font-semibold uppercase"
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
        className="border-2"
        style={{
          borderColor: themeColor,
        }}
      />
      <div className="space-y-3">
        <p
          className="text-lg font-semibold uppercase"
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
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Grade: {exp.grade}</span>
              <span>Job Series: {exp.status}</span>
              <span>Hours: {exp.hours}</span>
              <span>{exp.clearance} Clearance</span>
            </div>
            <div className="whitespace-pre-line text-xs mt-2 font-bold">
              Duties:<div className="font-normal"> {exp.duties}</div>
            </div>
            <div className="whitespace-pre-line text-xs mt-2 font-bold">
              Responsibilities:
              <div className="font-normal">{exp.responsibilities}</div>
            </div>
            <div className="whitespace-pre-line text-xs mt-2 font-bold">
              Key Accomplishments
              <div className="font-normal">{exp.accomplishments}</div>
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
      <div className="space-y-3">
        <p
          className="text-lg font-semibold uppercase"
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
// function SkillsSection({ resumeData }: ResumePreviewProps) {
//   const { skills, themeColor, borderStyle } = resumeData;

//   if (!skills?.length) return null;

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
//           Skills
//         </p>
//         <div className="flex break-inside-avoid flex-wrap gap-2">
//           {skills.map((skill, index) => (
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
//               {skill}
//             </Badge>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
