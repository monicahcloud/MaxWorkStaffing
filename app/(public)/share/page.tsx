import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { resumeDataInclude, coverLetterInclude } from "@/lib/types";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues, mapToCoverLetterValues } from "@/lib/utils";
import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";

export default async function PublicViewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // 1. Try fetching as a Resume
  const resume = await prisma.resume.findUnique({
    where: { shareToken: token },
    include: resumeDataInclude,
  });

  if (resume) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center">
        <div className="max-w-[816px] w-full bg-white shadow-2xl">
          <ResumePreview resumeData={mapToResumeValues(resume)} />
        </div>
      </div>
    );
  }

  // 2. Try fetching as a Cover Letter
  const coverLetter = await prisma.coverLetter.findUnique({
    where: { shareToken: token },
    include: coverLetterInclude,
  });

  if (coverLetter) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center">
        <div className="max-w-[816px] w-full bg-white shadow-2xl">
          <CoverLetterPreview
            coverLetterData={mapToCoverLetterValues(coverLetter)}
          />
        </div>
      </div>
    );
  }

  return notFound();
}
