"use client";

import React from "react";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/utils";

interface SectionProps {
  data: ResumeValues;
}

export function PersonalInfoHeader({ data }: SectionProps) {
  const { firstName, lastName, jobTitle, email, phone, address, website } =
    data;
  return (
    <div className="space-y-2">
      <h1
        className="text-4xl font-black uppercase tracking-tighter"
        style={{ color: "var(--primary)" }}>
        {firstName} {lastName}
      </h1>
      <p className="text-xl font-bold uppercase tracking-widest text-slate-500">
        {jobTitle}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-400">
        {email && <span>{email}</span>}
        {phone && <span>{phone}</span>}
        {address && <span>{address}</span>}
        {website && <span>{website}</span>}
      </div>
    </div>
  );
}

export function SummarySection({ data }: SectionProps) {
  if (!data.summary) return null;
  return (
    <div className="space-y-2">
      <h2
        className="text-sm font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Profile
      </h2>
      <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
        {data.summary}
      </p>
    </div>
  );
}

export function WorkExperienceSection({ data }: SectionProps) {
  const experiences = data.workExperiences?.filter(
    (exp) => exp.position || exp.company
  );
  if (!experiences?.length) return null;

  return (
    <section className="space-y-4">
      <h2
        className="text-sm font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Experience
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          // FIX: Added 'experience-item' class and 'break-inside-avoid'
          <div
            key={index}
            className="experience-item space-y-1 break-inside-avoid page-break-inside-avoid">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-slate-900 text-sm">
                {exp.position}
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">
                {exp.startDate
                  ? formatDate(new Date(exp.startDate), "MMM yyyy")
                  : ""}{" "}
                -{" "}
                {exp.endDate
                  ? formatDate(new Date(exp.endDate), "MMM yyyy")
                  : "Present"}
              </span>
            </div>

            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {exp.company}
            </p>

            {/* FIX: Improved description rendering for print */}
            {exp.description && (
              <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">
                {exp.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function EducationSection({ data }: SectionProps) {
  const education = data.education?.filter((edu) => edu.school || edu.degree);
  if (!education?.length) return null;

  return (
    <div className="space-y-3">
      <h2
        className="text-sm font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Education
      </h2>
      {education.map((edu, index) => (
        <div key={index} className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
          <p className="text-xs font-semibold text-slate-500">{edu.school}</p>
        </div>
      ))}
    </div>
  );
}

export function SkillsSection({ data }: SectionProps) {
  if (!data.skills?.length) return null;

  return (
    <div className="space-y-3">
      <h2
        className="text-sm font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Competencies
      </h2>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, index) => (
          <Badge
            key={index}
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none rounded-md text-[10px] font-bold uppercase">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
/* ---------- TECHNICAL SKILLS (With dot-ratings) ---------- */
export function TechnicalSkillsSection({ data }: { data: ResumeValues }) {
  if (!data.techSkills?.length) return null;

  return (
    <div className="space-y-3">
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Technical Expertise
      </h2>
      <div className="space-y-2">
        {data.techSkills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between group">
            <span className="text-[10px] font-bold uppercase text-slate-700">
              {skill.name}
            </span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={cn(
                    "size-1.5 rounded-full",
                    star <= (skill.rating || 0)
                      ? "bg-[var(--primary)]"
                      : "bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- INTERESTS (Styled as a bulleted list) ---------- */
export function InterestsSection({ data }: { data: ResumeValues }) {
  if (!data.interest?.length) return null;

  return (
    <div className="space-y-2">
      <h2
        className="text-xs font-black uppercase tracking-[0.2em] border-b-2 pb-1"
        style={{ borderBottomColor: "var(--primary)" }}>
        Interests
      </h2>
      <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed">
        {data.interest.join(" • ")}
      </p>
    </div>
  );
}
