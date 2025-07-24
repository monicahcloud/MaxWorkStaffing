/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CoverLetterServerData, ResumeServerData } from "./types";
import { CoverLetterValues, ResumeValues } from "./validation";
import { extractFederalFields } from "./extractFederalFields";
import { parseISO } from "date-fns";
import { ParsedResumeData } from "@/utils/types";

/** Safely turn "YYYY-MM-DD" into Date or undefined */
const toDate = (d?: { date?: string }) =>
  d?.date ? parseISO(d.date) : undefined;

/** Pick the first non-empty string from an array, else "" */
const first = (arr?: (string | null)[]) =>
  (arr ?? []).find((s) => !!s?.trim()) ?? "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    resumeTitle: data.resumeTitle ?? "",
    resumeType: data.resumeType ?? "",
    description: data.description ?? "",
    photo: data.photoUrl ?? "",
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    jobTitle: data.jobTitle ?? "",
    address: data.address ?? "",
    website: data.website ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    linkedin: data.linkedin ?? "",
    gitHub: data.gitHub ?? "",

    workExperiences: data.workExperience.map((exp) => ({
      position: String(exp.position ?? ""),
      company: String(exp.company ?? ""),
      location: String(exp.location ?? ""),
      startDate: exp.startDate?.toISOString().split("T")[0] ?? "",
      endDate: exp.endDate?.toISOString().split("T")[0] ?? "",
      description: String(exp.description ?? ""),
      status: String(exp.status ?? ""),
      clearance: String(exp.clearance ?? ""),
      duties: String(exp.duties ?? ""),
      accomplishments: String(exp.accomplishments ?? ""),
      responsibilities: String(exp.responsibilities ?? ""),
      grade: String(exp.grade ?? ""),
      hours: String(exp.hours ?? ""),
    })),

    education: data.education.map((edu) => ({
      degree: edu.degree ?? "",
      school: edu.school ?? "",
      location: edu.location ?? "",
      startDate: edu.startDate ? edu.startDate.toISOString().split("T")[0] : "",
      endDate: edu.endDate ? edu.endDate.toISOString().split("T")[0] : "",
    })),

    techSkills: data.techSkills.map((techSkill) => ({
      name: techSkill.name ?? "",
      rating: typeof techSkill.rating === "number" ? techSkill.rating : 1,
    })),

    skills: data.skills,
    interest: data.interest,
    uploadedFileUrl: data.uploadedFileUrl ?? "",
    isUploaded: data.isUploaded ?? false,
    borderStyle: data.borderStyle,
    themeColor: data.themeColor,
    summary: data.summary ?? "",
  };
}

export function mapToCoverLetterValues(
  data: CoverLetterServerData
): CoverLetterValues {
  return {
    id: data.id,
    template: data.template ?? "",
    userPhoto: data.userPhotoUrl ?? "",
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    jobTitle: data.jobTitle ?? "",
    userAddress: data.userAddress ?? "",
    website: data.website ?? "",
    body: data.body ?? "",
    userPhone: data.userPhone ?? "",
    userEmail: data.userEmail ?? "",
    companyAddress: data.companyAddress ?? "",
    companyName: data.companyName ?? "",
    recipientName: data.recipientName ?? "",
    linkedin: data.linkedin ?? "",
    gitHub: data.gitHub ?? "",
    signatureUrl: data.signatureUrl ?? "",
    borderStyle: data.borderStyle ?? "",
    themeColor: data.themeColor ?? "",
  };
}

export function mapAffindaToResumeValues(
  parsed: any,
  template: "federal" | "standard"
): ParsedResumeData {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid or missing Affinda parsed data.");
  }

  const data = parsed;

  /* ------------ PERSONAL ------------------------------------------------ */
  const nameObj = Array.isArray(data.candidateName)
    ? data.candidateName[0] ?? {}
    : {};

  const phoneObj = Array.isArray(data.phoneNumber)
    ? data.phoneNumber[0] ?? {}
    : {};

  const personalInfo = {
    firstName: nameObj.firstName ?? "",
    lastName: nameObj.familyName ?? "",
    jobTitle: data.objective ?? "",
    email: first(data.email),
    phone: phoneObj.formattedNumber ?? phoneObj.rawText ?? "",
    address: data.location?.formatted ?? "",
    website: first(data.website),
    linkedin: data.linkedin ?? "",
    gitHub: "",
  };

  /* ------------ EDUCATION ---------------------------------------------- */
  const education = (data.education ?? []).map((e: any) => ({
    degree: [e.educationAccreditation, ...(e.educationMajor ?? [])]
      .filter(Boolean)
      .join(" "),
    school: e.educationOrganization ?? "",
    location: e.educationLocation?.formatted ?? "",
    startDate: toDate(e.educationDates?.start),
    endDate: toDate(e.educationDates?.end),
    description: "",
  }));

  /* ------------ WORK EXPERIENCE ---------------------------------------- */
  const workExperience = (data.workExperience ?? []).map((w: any) => {
    const base = {
      position: w.workExperienceJobTitle ?? "",
      company: w.workExperienceOrganization ?? "",
      location: w.workExperienceLocation?.formatted ?? "",
      startDate: toDate(w.workExperienceDates?.start),
      endDate: toDate(w.workExperienceDates?.end),
      description: w.workExperienceDescription ?? "",
      status: "",
      clearance: "",
      duties: "",
      responsibilities: "",
      accomplishments: "",
      grade: "",
      hours: "",
    };

    return template === "federal" && base.description
      ? { ...base, ...extractFederalFields(base.description) }
      : base;
  });

  /* ------------ BUILD ParsedResumeData --------------------------------- */
  return {
    personalInfo,
    summary: data.summary ?? "",
    skills: (data.skill ?? []).map((s: any) => s.name).filter(Boolean),
    education,
    workExperience,
    interest: [],
    parsed: true,
    resumeTitle: `${personalInfo.firstName}_${personalInfo.lastName}_Resume`,
    resumeType: template === "federal" ? "Federal Resume" : "Standard Resume",
  };
}
