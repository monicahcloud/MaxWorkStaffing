// app/(dashboard)/coverletterbuilder/preview/[id]/page.tsx
import prisma from "@/lib/prisma";
import { coverLetterInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import CoverLetterPreviewView from "./CoverLetterPreviewView";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) return null;

  const coverLetter = await prisma.coverLetter.findUnique({
    where: { id, userId },
    include: coverLetterInclude,
  });

  if (!coverLetter) return notFound();

  return <CoverLetterPreviewView coverLetter={coverLetter} />;
}
