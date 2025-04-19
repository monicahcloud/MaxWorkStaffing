// import React, { useEffect, useRef, useState } from "react";
// import { ResumeValues } from "@/lib/validation";
// import { cn } from "@/lib/utils";
// import useDimensions from "@/hooks/useDimensions";
// import Image from "next/image";
// import { formatDate } from "date-fns";
// import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";
// import { Badge } from "../ui/badge";

// interface ResumePreviewProps {
//   resumeData: ResumeValues;
//   className?: string;
//   contentRef?: React.Ref<HTMLDivElement>;
// }

// function CombinationResumePreview({
//   resumeData,
//   className,
//   contentRef,
// }: ResumePreviewProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

//   return (
//     <div
//       className={cn(
//         " aspect-[210/297] bg-white text-black h-fit w-full",
//         className
//       )}
//       ref={containerRef}>
//       <div
//         className={cn("space-y-6 p-6 origin-top-left ", !width && "invisible")}
//         style={{
//           width: "794px", // Lock original width
//           transform: `scale(${width / 794})`,
//         }}
//         ref={contentRef}
//         id="resumePreviewContent">
//         <PersonalInfoHeader resumeData={resumeData} />
//         <SummarySection resumeData={resumeData} />
//         <WorkExperienceSection resumeData={resumeData} />
//         <EducationSection resumeData={resumeData} />
//         <SkillsSection resumeData={resumeData} />
//       </div>
//     </div>
//   );
// }

// export default CombinationResumePreview;

// interface ResumePreviewProps {
//   resumeData: ResumeValues;
// }

// function PersonalInfoHeader({ resumeData }: ResumePreviewProps) {
//   const {
//     photo,
//     firstName,
//     lastName,
//     jobTitle,
//     address,
//     phone,
//     email,
//     website,
//     themeColor,
//     borderStyle,
//   } = resumeData;

//   const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

//   useEffect(() => {
//     const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
//     if (objectUrl) setPhotoSrc(objectUrl);
//     if (photo === null) setPhotoSrc("");
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [photo]);

//   return (
//     <div
//       className={`flex items-center gap-6 ${
//         !photoSrc ? "justify-center" : ""
//       }`}>
//       {photoSrc && (
//         <Image
//           src={photoSrc}
//           width={100}
//           height={100}
//           alt="Author photo"
//           className="aspect-square object-cover"
//           style={{
//             borderRadius:
//               borderStyle === BorderStyles.SQUARE
//                 ? "0px"
//                 : borderStyle === BorderStyles.CIRCLE
//                 ? "9999px"
//                 : "10%",
//           }}
//         />
//       )}
//       <div className="space-y-2.5 text-center md:text-center">
//         <div
//           className="space-y-1"
//           style={{
//             backgroundColor: themeColor,
//           }}>
//           <p className="text-3xl font-bold text-white">
//             {firstName} {lastName}
//           </p>
//           <p
//             className="font-medium"
//             style={{
//               color: themeColor,
//             }}>
//             {jobTitle}
//           </p>
//         </div>
//         <p className="text-xs text-gray-500">
//           {address}
//           {address && (phone || email || website) ? " • " : ""}
//           {[phone, email, website].filter(Boolean).join(" • ")}
//         </p>
//       </div>
//     </div>
//   );
// }
// function SummarySection({ resumeData }: ResumePreviewProps) {
//   const { summary, themeColor } = resumeData;

//   if (!summary) return null;

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
//           className="text-lg font-semibold"
//           style={{
//             color: themeColor,
//           }}>
//           Professional profile
//         </p>
//         <div className="whitespace-pre-line text-sm">{summary}</div>
//       </div>
//     </>
//   );
// }
// function WorkExperienceSection({ resumeData }: ResumePreviewProps) {
//   const { workExperiences, themeColor } = resumeData;

//   const workExperiencesNotEmpty = workExperiences?.filter(
//     (exp) => Object.values(exp).filter(Boolean).length > 0
//   );

//   if (!workExperiencesNotEmpty?.length) return null;

//   return (
//     <>
//       <hr
//         className="border-2"
//         style={{
//           borderColor: themeColor,
//         }}
//       />
//       <div className="space-y-3">
//         <p
//           className="text-lg font-semibold"
//           style={{
//             color: themeColor,
//           }}>
//           Work experience
//         </p>
//         {workExperiencesNotEmpty.map((exp, index) => (
//           <div key={index} className="break-inside-avoid space-y-1">
//             <div
//               className="flex items-center justify-between text-sm font-semibold"
//               style={{
//                 color: themeColor,
//               }}>
//               <span>{exp.position}</span>
//               {exp.startDate && (
//                 <span>
//                   {formatDate(exp.startDate, "MM/yyyy")} -{" "}
//                   {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center justify-between text-xs font-semibold">
//               <span>{exp.company}</span>

//               <span>{exp.location}</span>
//             </div>
//             <div className="whitespace-pre-line text-xs">{exp.description}</div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
// function EducationSection({ resumeData }: ResumePreviewProps) {
//   const { education, themeColor } = resumeData;

//   const educationsNotEmpty = education?.filter(
//     (edu) => Object.values(edu).filter(Boolean).length > 0
//   );

//   if (!educationsNotEmpty?.length) return null;

//   return (
//     <>
//       <hr
//         className="border-2"
//         style={{
//           borderColor: themeColor,
//         }}
//       />
//       <div className="space-y-3">
//         <p
//           className="text-lg font-semibold"
//           style={{
//             color: themeColor,
//           }}>
//           Education
//         </p>
//         {educationsNotEmpty.map((edu, index) => (
//           <div key={index} className="break-inside-avoid space-y-1">
//             <div
//               className="flex items-center justify-between text-sm font-semibold"
//               style={{
//                 color: themeColor,
//               }}>
//               <span>{edu.degree}</span>
//               {edu.startDate && (
//                 <span>
//                   {edu.startDate &&
//                     `${formatDate(edu.startDate, "MM/yyyy")} ${
//                       edu.endDate
//                         ? `- ${formatDate(edu.endDate, "MM/yyyy")}`
//                         : ""
//                     }`}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center justify-between text-sm font-semibold">
//               <span>{edu.school}</span>

//               <span>{edu.location}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
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
//           className="text-lg font-semibold"
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
"use client";

import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useDimensions from "@/hooks/useDimensions";
//import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { formatDate } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { BorderStyles } from "@/app/(dashboard)/editor/BorderStyleButton";

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

  // const { themeColor } = resumeData;

  return (
    <div
      className={cn(
        "aspect-[210/297] bg-white text-black h-fit w-full",
        className
      )}
      ref={containerRef}>
      <div
        className={cn("p-6 origin-top-left flex gap-6", !width && "invisible")}
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
    // linkedin,
    // github,
    // skills,
    // interests,
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
    <div className="space-y-6 " style={{ backgroundColor: themeColor }}>
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
      <div className="space-y-2">
        {email && (
          <p className="flex items-center gap-2">
            <Mail size={14} /> {email}
          </p>
        )}
        {phone && (
          <p className="flex items-center gap-2">
            <Phone size={14} /> {phone}
          </p>
        )}
        {address && (
          <p className="flex items-center gap-2">
            <MapPin size={14} /> {address}
          </p>
        )}
        {website && (
          <p className="flex items-center gap-2">
            <Globe size={14} /> {website}
          </p>
        )}
        {/* {linkedin && (
          <p className="flex items-center gap-2">
            <Linkedin size={14} /> {linkedin}
          </p>
        )}
        {github && (
          <p className="flex items-center gap-2">
            <Github size={14} /> {github}
          </p>
        )} */}
      </div>

      {/* {skills?.length > 0 && (
        <div>
          <h4 className="text-md font-semibold" style={{ color: themeColor }}>
            Technical Skills
          </h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, idx) => (
              <Badge
                key={idx}
                className="text-white"
                style={{
                  backgroundColor: themeColor,
                  borderRadius:
                    borderStyle === BorderStyles.SQUARE
                      ? "0px"
                      : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "6px",
                }}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )} */}

      {/* {interests?.length > 0 && (
        <div>
          <h4 className="text-md font-semibold" style={{ color: themeColor }}>
            Interests
          </h4>
          <ul className="list-disc list-inside text-sm mt-1">
            {interests.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

function MainContent({ resumeData }: { resumeData: ResumeValues }) {
  const {
    firstName,
    lastName,
    jobTitle,
    summary,
    themeColor,
    // workExperiences,
    // education,
  } = resumeData;

  return (
    <div>
      <div className="p-4 text-white" style={{ backgroundColor: themeColor }}>
        <h1 className="text-2xl font-bold">
          {firstName} {lastName}
        </h1>
        <p className="text-md underline">{jobTitle}</p>
        <p className="text-sm whitespace-pre-line text-slate-500">{summary}</p>
      </div>

      {/* {summary && (
        <section className="mt-4 space-y-2">
          <h2 className="text-lg font-semibold" style={{ color: themeColor }}>
            Professional Profile
          </h2>
          <p className="text-sm whitespace-pre-line">{summary}</p>
        </section>
      )} */}

      {/* {workExperiences.length > 0 && (
        <section className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold" style={{ color: themeColor }}>
            Work Experience
          </h2>
          {workExperiences.map((exp, idx) => (
            <div key={idx} className="text-sm space-y-1">
              <div className="flex justify-between font-semibold">
                <span>{exp.position}</span>
                <span>
                  {exp.startDate && formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-700">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <p className="text-xs whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold" style={{ color: themeColor }}>
            Education
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="text-sm space-y-1">
              <div className="flex justify-between font-semibold">
                <span>{edu.degree}</span>
                <span>
                  {edu.startDate && formatDate(edu.startDate, "MM/yyyy")} -{" "}
                  {edu.endDate ? formatDate(edu.endDate, "MM/yyyy") : "Present"}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-700">
                <span>{edu.school}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </section>
      )}*/}
    </div>
  );
}
