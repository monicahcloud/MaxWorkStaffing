import { Ref } from "react";
import { CoverLetterValues, ResumeValues } from "./validation";
import { Prisma } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeValues>>;
}

export const resumeDataInclude = {
  workExperience: true,
  education: true,
  techSkills: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

export interface CoverLetterFormProps {
  form: UseFormReturn<CoverLetterValues>;
  coverLetterData: CoverLetterValues;
  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterValues>>;
  contentRef?: Ref<HTMLDivElement>;
  className?: string;
}

export const coverLetterInclude = {} satisfies Prisma.CoverLetterInclude;

export type CoverLetterServerData = Prisma.CoverLetterGetPayload<{
  include: typeof coverLetterInclude;
}>;
