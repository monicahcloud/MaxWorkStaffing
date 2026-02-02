// app/(dashboard)/resumes/[id]/ShareButton.tsx
"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ resumeId }: { resumeId: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/share/${resumeId}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "My Resume", url });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 transition font-bold text-xs uppercase">
      {copied ? <Check className="size-3" /> : <Share2 className="size-3" />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
