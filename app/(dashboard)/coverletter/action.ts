import { auth } from "@clerk/nextjs/server";

import { coverLetterSchema, CoverLetterValues } from "@/lib/validation";
import prisma from "@/lib/prisma";

export async function saveCoverLetter(values: CoverLetterValues) {
  const { id, ...rest } = values;
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const parsed = coverLetterSchema.parse(values);

  console.log("📤 Cover letter input:", parsed);

  if (id) {
    const updated = await prisma.coverLetter.update({
      where: { id },
      data: {
        ...parsed,
        updatedAt: new Date(),
      },
    });
    console.log("✅ Cover letter updated:", updated);
    return updated;
  }

  const created = await prisma.coverLetter.create({
    data: {
      ...parsed,
      clerkId, // mapped to relation
      user: {
        connect: { clerkId }, // required for `@relation(fields: [clerkId])`
      },
    },
  });

  console.log("✅ Cover letter created:", created);
  return created;
}
