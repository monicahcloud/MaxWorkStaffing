// Mark this file as a Server Action (used in Next.js App Router)
"use server";

// Import necessary logic and libraries
import { canCreateResume, canUseCustomizations } from "@/lib/permissions"; // Access control for features based on subscription
import prisma from "@/lib/prisma"; // Prisma client for DB operations
import { getUserSubscriptionLevel } from "@/lib/subscription"; // Determines the user's subscription level (e.g., free, pro)
import { resumeSchema, ResumeValues } from "@/lib/validation"; // Schema for validating incoming resume data
import { auth } from "@clerk/nextjs/server"; // Server-side auth helper from Clerk
import { del, put } from "@vercel/blob"; // Used for handling file uploads and deletions on Vercel Blob Storage
import path from "path"; // Node.js utility for working with file paths

// Main server-side function to save (create or update) a resume
export async function saveResume(values: ResumeValues) {
  const { id } = values; // Destructure id to check whether this is a new resume or an update
  console.log("recieved values", values); // Debug log

  // Destructure sections and validate input against schema
  const { photo, workExperiences, education, techSkills, ...resumeValues } =
    resumeSchema.parse(values);

  // Get authenticated user's Clerk user ID
  const { userId } = await auth();
  console.log("Creating resume for userId:", userId); // Debug log

  if (!userId) {
    throw new Error("User not authenticated"); // Prevent unauthorized resume operations
  }

  // Get current subscription level of the user
  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  // If creating a new resume (no id provided), check creation permission
  if (!id) {
    const resumeCount = await prisma.resume.count({ where: { userId } });

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "Maximum resume count reached for this subscription level."
      );
    }
  }

  // If updating, check that the resume exists and belongs to this user
  const existingResume = id
    ? await prisma.resume.findUnique({ where: { id, userId } })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found"); // Prevent editing a resume that doesn't exist
  }

  // Check if the user is trying to use premium features like custom border or color
  const hasCustomizations =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.themeColor &&
      resumeValues.themeColor !== existingResume?.themeColor);

  // Reject if user isn't allowed to use customizations based on subscription
  if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
    throw new Error("Customizations not allowed for this subscription level.");
  }

  // Logic to upload, replace, or remove a resume photo
  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    // If there's an existing photo, delete it before uploading the new one
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    // Upload new photo to Vercel Blob Storage and get public URL
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    // If user removed photo, delete the previous one from storage
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  // If `id` exists, update the existing resume
  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues, // Update base fields (name, title, contact, etc.)
        photoUrl: newPhotoUrl, // Save new or cleared photo
        techSkills: {
          deleteMany: {}, // Clear previous skills
          create: techSkills?.map((skill) => ({
            ...skill,
            rating: skill.rating,
          })),
        },
        workExperience: {
          deleteMany: {}, // Remove all previous work entries
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        education: {
          deleteMany: {}, // Clear education section
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        updatedAt: new Date(), // Manually set update timestamp
      },
    });
  } else {
    // Otherwise, create a new resume record
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId, // Link resume to user
        user: {
          connect: {
            clerkId: userId, // Optionally enforce relational connection
          },
        },
        photoUrl: newPhotoUrl,
        techSkills: {
          create: techSkills?.map((skill) => ({
            ...skill,
            rating: skill.rating,
          })),
        },
        workExperience: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        education: {
          create: education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
