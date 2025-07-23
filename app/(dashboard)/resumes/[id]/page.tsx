import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getResumeById } from "../action";
import Link from "next/link";

export default async function ResumePublicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resume = await getResumeById(id);

  if (!resume) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Resume Preview
          </h1>
          <p className="mt-2 text-gray-600">
            Here’s a live preview of the resume. 
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <Link
            href="/resumes"
            className="px-5 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition">
            Back to Resumes
          </Link>
          <Link
            href={`/editor?resumeId=${resume.id}`}
            className="px-5 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700 transition">
            Edit Resume
          </Link>
        </div>

        {/* Resume Preview */}
        <div className="flex justify-center">
          <div className="scale-[0.55] origin-top shadow-xl border border-gray-300 rounded-xl bg-white">
            <ResumePreview
              resumeData={mapToResumeValues(resume)}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
