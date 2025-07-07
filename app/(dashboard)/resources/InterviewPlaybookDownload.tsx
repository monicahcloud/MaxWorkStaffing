"use client";

import { FileText } from "lucide-react";

type PlaybookDownloadProps = {
  /** Path to the file in /public (e.g., "/interview_playbook_full.pdf") */
  filePath?: string;
  /** The filename the user will see when they download the file */
  fileName?: string;
  /** Optional custom heading */
  heading?: string;
  /** Optional sub-text under the heading  */
  subheading?: string;
  /** Optional brand logo or node */
  brand?: React.ReactNode;
};

const InterviewPlaybookDownload = ({
  filePath = "/interview_playbook_full.pdf",
  fileName = "The_Interview_Playbook_MaxResumeBuilder.pdf",
  heading = "The Interview Playbook Every Jobseeker Needs",
  subheading = "Your ultimate guide to mastering every stage of the interview process—from preparation to follow-up.",
  brand,
}: PlaybookDownloadProps) => {
  return (
    <section className="bg-white py-16 px-4 border-t border-red-200">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Optional logo / brand */}
        {brand && <div className="flex justify-center">{brand}</div>}

        <h2 className="text-4xl font-bold text-red-600">{heading}</h2>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto">{subheading}</p>

        <a
          href={filePath}
          download={fileName}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg transition">
          <FileText className="w-5 h-5" />
          Download the Free eBook
        </a>
      </div>
    </section>
  );
};

export default InterviewPlaybookDownload;
