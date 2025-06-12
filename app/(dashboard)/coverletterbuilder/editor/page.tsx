export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { coverLetterInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CoverLetterEditor from "./CoverLetterEditor";

export const metadata: Metadata = {
  title: "Create Your CoverLetter",
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

  const coverLetterToEdit = coverLetterId
    ? await prisma.coverLetter.findUnique({
        where: { id: coverLetterId, userId },
        include: coverLetterInclude,
      })
    : null;

  return <CoverLetterEditor coverletterToEdit={coverLetterToEdit} />;
}
