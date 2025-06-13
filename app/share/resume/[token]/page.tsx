import ResumePreview from "@/components/ResumePreview";
import prisma from "@/lib/prisma";
import { mapToResumeValues } from "@/lib/utils";

interface ShareResumePageProps {
  params: {
    token: string;
  };
}

export default async function ShareResumePage({
  params,
}: ShareResumePageProps) {
  const { token } = params;

  const resume = await prisma.resume.findUnique({
    where: { shareToken: token },
    include: {
      workExperience: true,
      education: true,
      techSkills: true,
    },
  });

  if (!resume) {
    return (
      <p className="p-4 text-center text-red-600">
        Invalid or expired share link.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <h1 className="text-2xl font-semibold mb-4 text-center">
        Resume Preview
      </h1> */}
      <ResumePreview
        resumeData={mapToResumeValues(resume)}
        className="shadow-lg border p-4 rounded-md"
      />
    </div>
  );
}
