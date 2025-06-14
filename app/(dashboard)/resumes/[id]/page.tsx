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
    <main className="py-10 px-4 flex justify-center">
      <div className="scale-[0.55] origin-top shadow border rounded">
        <ResumePreview
          resumeData={mapToResumeValues(resume)}
          className="shadow border rounded"
        />
      </div>
    </main>
  );
}
