"use server";

import { auth } from "@clerk/nextjs/server";
import { coverLetterSchema, CoverLetterValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { del, put } from "@vercel/blob";
import path from "path";
import { nullsToEmptyStrings } from "@/utils/nullsToEmptyStrings";

export async function saveCoverLetter(values: CoverLetterValues) {
  const { id } = values;
  const cleanValues = nullsToEmptyStrings(values);
  console.log("recieved values", values);
  const { userPhoto, ...coverLetterValues } =
    coverLetterSchema.parse(cleanValues);
  const { userId } = await auth();
  console.log("createing coverLetter for userId", userId);
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const existingCoverLetter = id
    ? await prisma.coverLetter.findUnique({ where: { id, userId } })
    : null;
  if (id && !existingCoverLetter) {
    throw new Error("CoverLetter not found");
  }
  let newPhotoUrl: string | undefined | null = undefined;
  if (userPhoto instanceof File) {
    if (existingCoverLetter?.userPhotoUrl) {
      await del(existingCoverLetter.userPhotoUrl);
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
    if (existingCoverLetter?.userPhotoUrl) {
      await del(existingCoverLetter.userPhotoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.coverLetter.update({
      where: { id },
      data: {
        ...coverLetterValues,
        userPhotoUrl: newPhotoUrl,
        updatedAt: new Date(),
      },
    });
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
        userPhotoUrl: newPhotoUrl,
      },
    });
  }
}
