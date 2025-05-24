import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";
import { mapToCoverLetterValues } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getcoverLetterById } from "../actions";

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
      <h1 className="text-2xl font-bold mb-6 text-center">
        {coverletter.companyName || " Your Cover Letter"}
      </h1>
      <CoverLetterPreview
        coverLetterData={mapToCoverLetterValues(coverletter)}
        className="shadow border rounded"
      />
    </main>
  );
}
