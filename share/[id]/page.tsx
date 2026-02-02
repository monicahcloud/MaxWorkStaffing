// app/(public)/share/[id]/page.tsx

import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function SharedResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resume = await getResumeById(id);

  if (!resume) return notFound();

  return (
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      <div className="max-w-[816px] mx-auto bg-white shadow-2xl print:shadow-none">
        {/* Floating Print Hint for Public Users */}
        <div className="fixed bottom-6 right-6 no-print">
          <button
            onClick={() => window.print()}
            className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform">
            Download PDF / Print
          </button>
        </div>

        <ResumePreview resumeData={mapToResumeValues(resume)} />
      </div>
    </div>
  );
}
function getResumeById(id: string) {
  throw new Error("Function not implemented.");
}
