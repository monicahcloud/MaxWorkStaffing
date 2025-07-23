import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";
import { getcoverLetterById } from "@/app/(dashboard)/coverletterbuilder/editor/actions";
import { mapToCoverLetterValues } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ViewCoverLetterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coverletter = await getcoverLetterById(id);

  if (!coverletter) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Cover Letter Preview
          </h1>
          <p className="mt-2 text-gray-600">
            Here’s a live preview of the coverletter.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <Link
            href="/coverletter"
            className="px-5 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition">
            Back to Cover Letters
          </Link>
          <Link
            href={`/coverletterbuilder/editor?coverLetterId=${coverletter.id}`}
            className="px-5 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700 transition">
            Edit Cover Letter
          </Link>
        </div>

        {/* Resume Preview */}
        <div className="flex justify-center">
          <div className="scale-[0.55] origin-top shadow-xl border border-gray-300 rounded-xl bg-white">
            <CoverLetterPreview
              coverLetterData={mapToCoverLetterValues(coverletter)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
