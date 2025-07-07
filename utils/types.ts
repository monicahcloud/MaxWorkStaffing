import { CoverLetterValues } from "@/lib/validation";
import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = "Pending",
  Interview = "Interview",
  Declined = "Declined",
  Submitted = "Submitted",
  Offered = "Offer Extended",
  Hired = "Hired",
}

export enum JobMode {
  FullTime = "FULLTIME",
  PartTime = "PARTTIME",
  Internship = "INTERNSHIP",
  Contract = "CONTRACT",
  Apprenticeship = "APPRENTICESHIP",
  Seasonal = "SEASONAL",
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: "position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "company must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "location must be at least 2 characters.",
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;

export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

export type CreateAndEditResumeType = {
  resumeTitle: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  userName?: string;
  userEmail?: string;
};

export const createAndEditResumeSchema = z.object({
  resumeTitle: z.string().min(2, {
    message: "Resume title must be at least 2 characters.",
  }),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  address: z.string().min(2).optional(),
  jobTitle: z.string().min(2).optional(),
  phone: z.string().min(2).optional(),
  email: z.string().min(2).optional(),
  userName: z.string().optional(),
  userEmail: z.string().optional(),
});

export type Experience = {
  id: number;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  workSummary: string;
};

export type Education = {
  id: number;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
};

export type Skill = {
  id: number;
  name: string;
  rating: number;
};

export type ResumeInfo = {
  id: string;
  clerkId: string;
  resumeTitle: string;
  firstName?: string | null; // ✅ Now accepts null
  lastName?: string | null; // ✅ Now accepts null
  jobTitle?: string | null; // ✅ Now accepts null
  address?: string | null; // ✅ Now accepts null
  phone?: string | null; // ✅ Now accepts null
  email?: string | null; // ✅ Now accepts null
  themeColor?: string | null; // ✅ Now accepts null
  summary?: string | null; // ✅ Now accepts null
  experience?: Experience[] | null; // ✅ Now accepts null
  education?: Education[] | null; // ✅ Now accepts null
  skills?: Skill[] | null; // ✅ Now accepts null
};

// types/job.ts (or wherever you store shared types)
export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedAt: string;
  category: string;
};

export type CoverLetterTemplateProps = CoverLetterValues & {
  userPhotoUrl?: string;
  coverletterData: CoverLetterValues;

  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterValues>>;
};

export interface ParsedResumeData {
  /* wrapped because saveParsedResumeData expects it */
  personalInfo: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    linkedin: string;
    gitHub: string;
  };

  summary: string;
  skills: string[];

  education: Array<{
    degree: string;
    school: string;
    location: string;
    startDate?: Date;
    endDate?: Date;
    description: string;
  }>;

  workExperience: Array<{
    position: string;
    company: string;
    location: string;
    startDate?: Date;
    endDate?: Date;
    description: string;
    status: string;
    clearance: string;
    duties: string;
    responsibilities: string;
    accomplishments: string;
    grade: string;
    hours: string;
  }>;

  interest: string[];

  /* meta (optional) */
  resumeTitle?: string;
  resumeType?: string;
  parsed?: boolean; // default true
}
