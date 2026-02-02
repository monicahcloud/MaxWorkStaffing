// app/(dashboard)/resumes/[id]/ResumeActions.tsx
"use client";

import { canExportDocument } from "@/lib/permissions";
import { Printer, Share2, Edit3, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";

export default function ResumeActions({ resumeId }: { resumeId: string }) {
  const [copied, setCopied] = useState(false);
  const level = useSubscriptionLevel();

  const handlePrint = () => {
    if (!canExportDocument(level)) {
      toast.error("Upgrade Required", {
        description: "Please subscribe to print.",
      });
      return;
    }
    window.print();
  };

  const handleShare = async () => {
    if (!canExportDocument(level)) {
      toast.error("Upgrade Required", {
        description: "Please subscribe to print.",
      });
      return;
    }
    const url = `${window.location.origin}/share/${resumeId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 no-print">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/resumes"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest">
          <ArrowLeft className="size-4" />
          Suite
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/editor?resumeId=${resumeId}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition font-bold text-xs uppercase">
            <Edit3 className="size-3" />
            Edit
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 transition font-bold text-xs uppercase">
            {copied ? (
              <Check className="size-3" />
            ) : (
              <Share2 className="size-3" />
            )}
            {copied ? "Copied" : "Share"}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white bg-slate-900 hover:bg-blue-600 transition-all font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200">
            <Printer className="size-4" />
            Download PDF / Print
          </button>
        </div>
      </div>
    </nav>
  );
}
