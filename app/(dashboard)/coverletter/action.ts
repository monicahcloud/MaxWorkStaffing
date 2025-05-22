"use server";

import { auth } from "@clerk/nextjs/server";
import { coverLetterSchema, CoverLetterValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveCoverLetter(values: CoverLetterValues) {
  const { id } = values;
  console.log("recieved values", values);
  const { userPhoto, ...coverLetterValues } = coverLetterSchema.parse(values);
  const { userId } = await auth();
  console.log("createing coverLetter for userId", userId);
  if (!userId) {
    throw new Error("User not authenticated");
  }
  // const { userId: clerkId } = await auth();
  // if (!clerkId) throw new Error("Unauthorized");

  // const parsed = coverLetterSchema.parse(values);

  // console.log("📤 Cover letter input:", parsed);
  const existingCoverLetter = id
    ? await prisma.coverLetter.findUnique({ where: { id, userId } })
    : null;
  if (id && !existingCoverLetter) {
    throw new Error("CoverLetter not found");
  }
  let newPhotoUrl: string | undefined | null = undefined;
  if (userPhoto instanceof File) {
    if (existingCoverLetter?.photoUrl) {
      await del(existingCoverLetter.photoUrl);
    }
    const blob = await put(
      `coverLetter_photos/${path.extname(userPhoto.name)}`,
      userPhoto,
      {
        access: "public",
      }
    );
    newPhotoUrl = blob.url;
  } else if (userPhoto === null) {
    if (existingCoverLetter?.photoUrl) {
      await del(existingCoverLetter.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    const updated = await prisma.coverLetter.update({
      where: { id },
      data: {
        ...coverLetterValues,
        photoUrl: newPhotoUrl,
        updatedAt: new Date(),
      },
    });
    console.log("✅ Cover letter updated:", updated);
    return updated;
  } else {
    return prisma.coverLetter.create({
      data: {
        ...coverLetterValues,
        userId,
        user: {
          connect: {
            clerkId: userId,
          },
        },
        photoUrl: newPhotoUrl,
      },
    });
  }
}
