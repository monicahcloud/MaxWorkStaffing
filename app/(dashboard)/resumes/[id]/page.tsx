// app/(dashboard)/resumes/[id]/page.tsx
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types"; // Ensure this is imported
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ResumePreviewView from "./ResumePreviewView";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) return null;

  const resume = await prisma.resume.findUnique({
    where: { id, userId },
    // This 'include' is critical to prevent the .map() error
    include: resumeDataInclude,
  });

  if (!resume) return notFound();

  return <ResumePreviewView resume={resume} />;
}
