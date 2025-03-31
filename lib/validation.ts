"use client";
import GeneralInforForm from "@/app/(dashboard)/editor/forms/GeneralInfoForms";
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
});
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
