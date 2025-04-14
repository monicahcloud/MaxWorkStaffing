import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

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
    resumeTitle: data.resumeTitle || undefined,
    resumeType: data.resumeType || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    address: data.address || undefined,
    website: data.website || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperiences: data.workExperience.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      location: exp.location || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })),
    education: data.education.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      location: edu.location || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    themeColor: data.themeColor,
    summary: data.summary || undefined,
  };
}
