"use client";

import { useState } from "react";
import {
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { Button } from "@/components/ui/button"; // Shadcn UI
import { Share } from "lucide-react"; // Icon library

interface ShareButtonProps {
  type: "resume" | "coverletter";
  id: string;
}

export default function ShareButton({ type, id }: ShareButtonProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generateShareUrl() {
    setLoading(true);
    try {
      const response = await fetch(`/api/${type}/${id}/share`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.shareToken) {
        const url = `${window.location.origin}/share/${type}/${data.shareToken}`;
        setShareUrl(url);
      } else {
        alert("Failed to generate share link");
      }
    } catch {
      alert("Error generating share link");
    } finally {
      setLoading(false);
    }
  }

  const handleCopyAndOpen = () => {
    if (shareUrl) {
      // Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Open in new tab
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const shareTitle =
    type === "resume" ? "Resume Submission!" : "Cover Letter Submission!";
  const shareSummary =
    type === "resume"
      ? "I hope this message finds you well. Please find attached my resume for your review. I am enthusiastic about the opportunity to contribute to [Company Name/Department Name], and I believe my background and experience align well with the needs of your team. Should you require any additional information or documentation, please don't hesitate to reach out. I appreciate your time and consideration and look forward to the possibility of speaking further."
      : "I hope this message finds you well. Please find attached my cover letter for your review. I am enthusiastic about the opportunity to contribute to [Company Name/Department Name], and I believe my background and experience align well with the needs of your team.Should you require any additional information or documentation, please don't hesitate to reach out. I appreciate your time and consideration and look forward to the possibility of speaking further.";

  return (
    <div className="space-y-2">
      {!shareUrl ? (
        <Button
          onClick={generateShareUrl}
          disabled={loading}
          variant="outline"
          className="w-full text-sm sm:text-base md:text-base lg:text-lg px-2 py-2">
          {loading ? "Generating..." : " Share Resume Link"}
        </Button>
      ) : (
        <div className="flex flex-wrap gap-3 items-center justify-center max-w-full">
          <LinkedinShareButton url={shareUrl} summary={shareSummary}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={shareTitle}
            body={shareSummary}>
            <EmailIcon size={32} round />
          </EmailShareButton>

          {/* Copy link button styled with Shadcn UI Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyAndOpen}
            title={copied ? "Copied & Opened!" : "Copy Link & Open"}
            aria-label="Copy share link and open"
            className={copied ? "border-green-600 text-green-600" : ""}>
            <Share size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
