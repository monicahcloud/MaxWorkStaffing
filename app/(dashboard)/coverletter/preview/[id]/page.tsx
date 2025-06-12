import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";
import { getcoverLetterById } from "@/app/(dashboard)/coverletterbuilder/editor/actions";
import { mapToCoverLetterValues } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ViewCoverLetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await the params Promise
  const coverletter = await getcoverLetterById(id);

  if (!coverletter) return notFound();

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {coverletter.jobTitle || "Cover Letter"}
      </h1>
      <CoverLetterPreview
        coverLetterData={mapToCoverLetterValues(coverletter)}
        className="shadow border rounded"
      />
    </main>
  );
}
