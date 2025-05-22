import { Ref } from "react";
import { CoverLetterValues, ResumeValues } from "./validation";
import { Prisma } from "@prisma/client";

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
  coverLetterData: CoverLetterValues;
  setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterValues>>;
  contentRef?: Ref<HTMLDivElement>;
  className?: string;
}
