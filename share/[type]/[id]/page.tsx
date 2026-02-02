import prisma from "@/lib/prisma";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues, mapToCoverLetterValues } from "@/lib/utils";
import { notFound } from "next/navigation";
import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";

export default async function SharedPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;

  if (type === "resume") {
    const data = await prisma.resume.findUnique({
      where: { id },
      include: { workExperience: true, education: true, techSkills: true },
    });
    if (!data) return notFound();
    return (
      <div className="p-8 bg-slate-100 min-h-screen flex justify-center">
        <ResumePreview resumeData={mapToResumeValues(data)} />
      </div>
    );
  }

  if (type === "coverletter") {
    const data = await prisma.coverLetter.findUnique({ where: { id } });
    if (!data) return notFound();
    return (
      <div className="p-8 bg-slate-100 min-h-screen flex justify-center">
        <CoverLetterPreview coverLetterData={mapToCoverLetterValues(data)} />
      </div>
    );
  }

  return notFound();
}
