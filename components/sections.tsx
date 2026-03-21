// "use client";

// import { ResumeValues } from "@/lib/validation";
// import { formatDate } from "date-fns";
// import { Badge } from "@/components/ui/badge";
// import { ResumeThemeToken } from "@/lib/resume-theme-registry";
// import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";
// import { cn } from "@/lib/utils";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// interface SectionProps {
//   data: ResumeValues;
//   theme: ResumeThemeToken;
//   visualStyle: ResumeVisualStyle;
// }

// function SectionHeading({
//   title,
//   visualStyle,
// }: {
//   title: string;
//   visualStyle: ResumeVisualStyle;
// }) {
//   if (visualStyle.sectionTitleStyle === "boxed") {
//     return (
//       <div className="mb-3 inline-flex rounded-md bg-[var(--primary)] px-3 py-1.5">
//         <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
//           {title}
//         </h2>
//       </div>
//     );
//   }

//   if (visualStyle.sectionTitleStyle === "bar") {
//     return (
//       <div className="mb-3 flex items-center gap-3">
//         <div className="h-5 w-1 rounded-full bg-[var(--primary)]" />
//         <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-900">
//           {title}
//         </h2>
//       </div>
//     );
//   }

//   if (visualStyle.sectionTitleStyle === "caps") {
//     return (
//       <h2 className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">
//         {title}
//       </h2>
//     );
//   }

//   return (
//     <h2
//       className="mb-3 border-b-2 pb-1 text-sm font-black uppercase tracking-[0.2em]"
//       style={{ borderBottomColor: "var(--primary)" }}>
//       {title}
//     </h2>
//   );
// }

// export function WorkExperienceSection({ data, visualStyle }: SectionProps) {
//   const experiences = data.workExperiences?.filter(
//     (exp) => exp.position || exp.company,
//   );
//   if (!experiences?.length) return null;

//   return (
//     <section className="space-y-4">
//       <SectionHeading title="Experience" visualStyle={visualStyle} />

//       <div className="space-y-6">
//         {experiences.map((exp, index) => (
//           <div
//             key={index}
//             className={cn(
//               "experience-item break-inside-avoid page-break-inside-avoid",
//               visualStyle.experienceStyle === "minimal"
//                 ? "space-y-1"
//                 : "space-y-2",
//             )}>
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {exp.position}
//                 </h3>
//                 <p
//                   className={cn(
//                     "text-xs font-bold uppercase tracking-wider",
//                     visualStyle.experienceStyle === "timeline"
//                       ? "text-slate-500"
//                       : "text-[var(--primary)]",
//                   )}>
//                   {exp.company}
//                 </p>
//               </div>

//               <span className="shrink-0 pt-0.5 text-[10px] font-bold uppercase text-slate-400">
//                 {exp.startDate
//                   ? formatDate(new Date(exp.startDate), "MMM yyyy")
//                   : ""}{" "}
//                 -{" "}
//                 {exp.endDate
//                   ? formatDate(new Date(exp.endDate), "MMM yyyy")
//                   : "Present"}
//               </span>
//             </div>

//             {exp.location && (
//               <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
//                 {exp.location}
//               </p>
//             )}

//             {exp.description && (
//               <div className="whitespace-pre-line text-[11px] leading-relaxed text-slate-600">
//                 {exp.description}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export function EducationSection({ data, visualStyle }: SectionProps) {
//   const education = data.education?.filter((edu) => edu.school || edu.degree);
//   if (!education?.length) return null;

//   return (
//     <div className="space-y-3">
//       <SectionHeading title="Education" visualStyle={visualStyle} />

//       {education.map((edu, index) => (
//         <div key={index} className="space-y-0.5">
//           <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>

//           {visualStyle.educationStyle === "inline" ? (
//             <p className="text-xs font-semibold text-slate-500">
//               {[edu.school, edu.location].filter(Boolean).join(" • ")}
//             </p>
//           ) : (
//             <>
//               <p className="text-xs font-semibold text-slate-500">
//                 {edu.school}
//               </p>
//               {edu.location && (
//                 <p className="text-[10px] uppercase tracking-wider text-slate-400">
//                   {edu.location}
//                 </p>
//               )}
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export function SkillsSection({ data, visualStyle }: SectionProps) {
//   if (!data.skills?.length) return null;

//   return (
//     <div className="space-y-3">
//       <SectionHeading title="Competencies" visualStyle={visualStyle} />

//       {visualStyle.skillsStyle === "list" ? (
//         <ul className="space-y-1 text-xs font-medium text-slate-600">
//           {data.skills.map((skill, index) => (
//             <li key={index}>• {skill}</li>
//           ))}
//         </ul>
//       ) : visualStyle.skillsStyle === "compact" ? (
//         <div className="grid grid-cols-1 gap-1.5">
//           {data.skills.map((skill, index) => (
//             <div
//               key={index}
//               className="rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold uppercase text-slate-700">
//               {skill}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-wrap gap-2">
//           {data.skills.map((skill, index) => (
//             <Badge
//               key={index}
//               className="rounded-md border-none bg-slate-100 text-[10px] font-bold uppercase text-slate-700 hover:bg-slate-200">
//               {skill}
//             </Badge>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export function TechnicalSkillsSection({ data, visualStyle }: SectionProps) {
//   if (!data.techSkills?.length) return null;

//   return (
//     <div className="space-y-3">
//       <SectionHeading title="Technical Expertise" visualStyle={visualStyle} />

//       <div className="space-y-2">
//         {data.techSkills.map((skill, index) => (
//           <div key={index} className="flex items-center justify-between gap-4">
//             <span className="text-[10px] font-bold uppercase text-slate-700">
//               {skill.name}
//             </span>

//             <div className="flex gap-0.5">
//               {[1, 2, 3, 4, 5].map((dot) => (
//                 <div
//                   key={dot}
//                   className={cn(
//                     "size-1.5 rounded-full",
//                     dot <= (skill.rating || 0)
//                       ? "bg-[var(--primary)]"
//                       : "bg-slate-200",
//                   )}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function InterestsSection({ data, visualStyle }: SectionProps) {
//   if (!data.interest?.length) return null;

//   return (
//     <div className="space-y-2">
//       <SectionHeading title="Interests" visualStyle={visualStyle} />
//       <p className="text-[10px] italic font-medium leading-relaxed text-slate-500">
//         {data.interest.join(" • ")}
//       </p>
//     </div>
//   );
// }
import React from "react";

export const sections = () => {
  return <div>sections</div>;
};
