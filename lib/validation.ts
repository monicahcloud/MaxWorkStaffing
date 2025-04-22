import { z } from "zod";
export const optionalString = z.string().trim().optional().or(z.literal(""));
export const generalInfoSchema = z.object({
  resumeTitle: optionalString,
  resumeType: optionalString,
  description: optionalString,
});
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File must be less than 4MB"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  address: optionalString,
  phone: optionalString,
  email: optionalString,
  website: optionalString,
  linkedin: optionalString,
  gitHub: optionalString,
});
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        location: optionalString,
        description: optionalString,
        clearance: optionalString,
        duties: optionalString,
        responsibilities: optionalString,
        status: optionalString,
        grade: optionalString,
        hours: optionalString,
      })
    )
    .optional(),
});
export type WorkExperiencesValues = z.infer<typeof workExperienceSchema>;
export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

export const educationSchema = z.object({
  education: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        location: optionalString,
      })
    )
    .optional(),
});
export type EducationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});
export type SkillsValues = z.infer<typeof skillsSchema>;

export const interestSchema = z.object({
  interest: z.array(z.string().trim()).optional(),
});
export type InterestValues = z.infer<typeof interestSchema>;

export const techSkillSchema = z.object({
  techSkills: z
    .array(
      z.object({
        name: z.string().trim().default(""),
        rating: z
          .union([
            z
              .string()
              .regex(/^[1-5]$/)
              .transform(Number), // accepts "1" to "5" as strings and transforms to number
            z.number().min(1).max(5), // accepts numbers 1–5
          ])
          .default("1")
          .transform((val) => (typeof val === "string" ? parseInt(val) : val)),
      })
    )
    .optional(),
});

export type TechSkillValues = z.infer<typeof techSkillSchema>;
export type TechSkill = NonNullable<TechSkillValues["techSkills"]>[number];

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  ...techSkillSchema.shape,
  ...interestSchema.shape,
  themeColor: optionalString,
  borderStyle: optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
  uploadedFileUrl?: string | null;
  isUploaded?: boolean;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...techSkillSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;
