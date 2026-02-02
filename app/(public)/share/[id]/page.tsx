// app/(public)/share/[id]/page.tsx
import prisma from "@/lib/prisma";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues, mapToCoverLetterValues } from "@/lib/utils";
import { resumeDataInclude, coverLetterInclude } from "@/lib/types";
import { notFound } from "next/navigation";
import PrintButton from "./PrintButton";
import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";

export default async function SharedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Next.js 15 requirement

  // 1. Try fetching Resume (checks both id and shareToken)
  const resume = await prisma.resume.findFirst({
    where: {
      OR: [{ id: id }, { shareToken: id }],
    },
    include: resumeDataInclude,
  });

  if (resume) {
    return (
      <SharedDocumentWrapper title="Public Resume Suite">
        <ResumePreview resumeData={mapToResumeValues(resume)} />
      </SharedDocumentWrapper>
    );
  }

  // 2. Try fetching Cover Letter (checks both id and shareToken)
  const coverLetter = await prisma.coverLetter.findFirst({
    where: {
      OR: [{ id: id }, { shareToken: id }],
    },
    include: coverLetterInclude,
  });

  if (coverLetter) {
    return (
      <SharedDocumentWrapper title="Public Cover Letter Suite">
        <CoverLetterPreview
          coverLetterData={mapToCoverLetterValues(coverLetter)}
        />
      </SharedDocumentWrapper>
    );
  }

  return notFound();
}

// Reusable UI Wrapper for consistency
function SharedDocumentWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .document-paper { border: none !important; box-shadow: none !important; max-width: none !important; width: 100% !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      <div className="max-w-[816px] mx-auto mb-6 flex justify-between items-center px-4 no-print">
        <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          {title}
        </h1>
        <PrintButton />
      </div>

      <div className="max-w-[816px] mx-auto bg-white shadow-2xl border border-slate-200 document-paper">
        {children}
      </div>

      <footer className="mt-10 pb-10 text-center no-print">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
          Verified by Max ResumeBuilder
        </p>
      </footer>
    </div>
  );
}
