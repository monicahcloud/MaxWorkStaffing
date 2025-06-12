import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getResumeById } from "../action";

export default async function ResumePublicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await the params Promise
  const resume = await getResumeById(id);

  if (!resume) return notFound();

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {resume.resumeTitle || "Resume"}
      </h1>
      <ResumePreview
        resumeData={mapToResumeValues(resume)}
        className="shadow border rounded"
      />
    </main>
  );
}
