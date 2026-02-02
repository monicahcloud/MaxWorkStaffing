/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UploadCloud, ShieldCheck, Loader2 } from "lucide-react"; // Added Loader2
import { toast } from "sonner";
//import { useRouter } from "next/navigation";
import { ParsingPreviewModal } from "@/components/ParsingPreviewModal";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export default function UploadResumeButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  //const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [newResumeId, setNewResumeId] = useState<string | null>(null);
  const [isFederal, setIsFederal] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isFederal", String(isFederal));
    setIsUploading(true);

    try {
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.resumeId) {
        setParsedData(result.parsedJson);
        setNewResumeId(result.resumeId);
        setShowModal(true);
        toast.success(isFederal ? "Federal Data Extracted!" : "Resume Parsed!");
      } else {
        toast.error(result?.error || "Upload failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };
  const handleConfirm = () => {
    if (!newResumeId) {
      toast.error("Resume ID missing. Please try again.");
      return;
    }

    setIsRedirecting(true);

    // 1. Trigger Celebration (Confetti)
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        spread: 70,
        origin: { x: 0.2, y: 0.6 },
        colors: ["#2563eb", "#3b82f6", "#60a5fa"],
      });
      confetti({
        particleCount,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors: ["#2563eb", "#3b82f6", "#60a5fa"],
      });

      requestAnimationFrame(frame);
    };

    frame();

    // 2. Redirect Logic
    // We use window.location.href instead of router.push for the INITIAL load
    // after a heavy AI parse. This clears the Next.js cache and forces
    // the Editor to fetch the NEWLY created rows from the DB immediately.
    setTimeout(() => {
      window.location.href = `/editor?resumeId=${newResumeId}`;
    }, 800);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Federal Mode Toggle */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-300",
          isFederal
            ? "bg-blue-50 border-blue-200"
            : "bg-slate-50 border-slate-200",
        )}>
        <ShieldCheck
          className={cn(
            "size-4",
            isFederal ? "text-blue-600" : "text-slate-400",
          )}
        />
        <Label
          htmlFor="federal-mode"
          className="text-[10px] font-black uppercase tracking-widest text-slate-500 cursor-pointer">
          Federal Mode
        </Label>
        <Switch
          id="federal-mode"
          checked={isFederal}
          onCheckedChange={setIsFederal}
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="upload-resume flex items-center gap-3 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-8 py-6 rounded-2xl transition-all shadow-sm">
        {isUploading ? (
          <>
            <Loader2 className="animate-spin size-4 text-blue-600" />
            <span className="text-[11px] font-black uppercase tracking-widest animate-pulse">
              {isFederal
                ? "Analyzing Federal Compliance..."
                : "AI is Parsing..."}
            </span>
          </>
        ) : (
          <>
            <UploadCloud className="size-5 text-blue-600" />
            <span className="text-[11px] font-black uppercase tracking-widest">
              Upload Resume
            </span>
          </>
        )}
      </Button>

      <ParsingPreviewModal
        isOpen={showModal}
        data={parsedData}
        isRedirecting={isRedirecting}
        onConfirm={handleConfirm} // 👈 Wire it up here!
        onCancel={() => {
          setShowModal(false);
          setNewResumeId(null); // Optional: clear ID if they cancel
        }}
      />
    </div>
  );
}
