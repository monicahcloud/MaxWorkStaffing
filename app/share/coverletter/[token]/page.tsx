import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";
import prisma from "@/lib/prisma";
import { mapToCoverLetterValues } from "@/lib/utils";

interface ShareCoverLetterPageProps {
  params: {
    token: string;
  };
}

export default async function ShareCoverLetterPage({
  params,
}: ShareCoverLetterPageProps) {
  const { token } = params;

  const coverLetter = await prisma.coverLetter.findUnique({
    where: { shareToken: token },
  });

  if (!coverLetter) {
    return (
      <p className="p-4 text-center text-red-600">
        Invalid or expired share link.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <h1 className="text-2xl font-semibold mb-4 text-center">
        Cover Letter Preview
      </h1> */}
      <CoverLetterPreview
        coverLetterData={mapToCoverLetterValues(coverLetter)}
        className="shadow-lg border p-4 rounded-md"
      />
    </div>
  );
}
