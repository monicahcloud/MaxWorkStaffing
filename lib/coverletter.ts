// lib/coverletter.ts
import prisma from "@/lib/prisma";

export async function getCoverLetterById(id: string) {
  try {
    return await prisma.coverLetter.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching cover letter:", error);
    return null;
  }
}
