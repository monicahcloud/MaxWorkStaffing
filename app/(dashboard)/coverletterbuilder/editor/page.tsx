export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { coverLetterInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CoverLetterEditor from "./CoverLetterEditor";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Cover Letter Editor | Max ResumeBuilder",
};

interface PageProps {
  searchParams: Promise<{ coverLetterId?: string }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const { coverLetterId } = searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  // 1. Parallel data fetching for performance
  const [coverLetterToEdit, resumes] = await Promise.all([
    coverLetterId
      ? prisma.coverLetter.findUnique({
          where: { id: coverLetterId, userId },
          include: coverLetterInclude,
        })
      : null,
    // 2. Fetch basic resume data to populate the Sync Manager dropdown
    prisma.resume.findMany({
      where: { userId },
      select: {
        id: true,
        resumeTitle: true,
        themeId: true,
        themeColor: true,
        borderStyle: true,
      },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  // Handle cases where a specific ID was provided but not found
  if (coverLetterId && !coverLetterToEdit) {
    return notFound();
  }

  return (
    <CoverLetterEditor
      coverletterToEdit={coverLetterToEdit}
      resumes={resumes}
    />
  );
}
