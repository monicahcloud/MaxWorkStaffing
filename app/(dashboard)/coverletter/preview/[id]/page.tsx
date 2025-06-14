import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";
import { getcoverLetterById } from "@/app/(dashboard)/coverletterbuilder/editor/actions";
import { mapToCoverLetterValues } from "@/lib/utils";
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
    <main className="py-10 px-4 flex justify-center">
      <div className="scale-[0.55] origin-top shadow border rounded">
        <CoverLetterPreview
          coverLetterData={mapToCoverLetterValues(coverletter)}
        />
      </div>
    </main>
  );
}
