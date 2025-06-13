import ResumePreview from "@/components/ResumePreview";
import { notFound } from "next/navigation";
import { mapToResumeValues } from "@/lib/utils";
import { getResumeByShareToken } from "@/lib/resume";

export default async function SharedResumePage({
  params,
}: {
  params: { token: string };
}) {
  const resume = await getResumeByShareToken(params.token);
  if (!resume) return notFound();

  return (
    <html>
      <head>
        <title>{resume.resumeTitle || "Shared Resume"}</title>
        <style>{`
          @media print {
            body {
              margin: 0;
              background: white;
            }
            .print-button {
              display: none;
            }
          }
        `}</style>
      </head>
      <body className="bg-white text-black">
        <main className="max-w-[816px] mx-auto p-6 print:p-0">
          <div className="print-button flex justify-end mb-4">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">
              Print Resume
            </button>
          </div>
          <ResumePreview resumeData={mapToResumeValues(resume)} />
        </main>
      </body>
    </html>
  );
}
