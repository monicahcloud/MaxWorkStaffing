export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Build your resume",
};

interface PageProps {
  searchParams: { resumeId?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const { resumeId } = searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}

// interface PageProps {
//   searchParams: Promise<{ resumeId?: string }>;
// }

// export default async function Page({ searchParams }: PageProps) {
//   const { resumeId } = await searchParams;

//   const { userId } = await auth();

//   if (!userId) {
//     return null;
//   }

//   const resumeToEdit = resumeId
//     ? await prisma.resume.findUnique({
//         where: { id: resumeId, userId },
//         include: resumeDataInclude,
//       })
//     : null;

//   return <ResumeEditor resumeToEdit={resumeToEdit} />;
// }
