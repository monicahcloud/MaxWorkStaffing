"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Edit3,
  Printer,
  Share2,
  ImageIcon,
  Lock,
} from "lucide-react";
import { ResumeServerData } from "@/lib/types";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { mapToResumeValues } from "@/lib/utils";
import { clsx } from "clsx"; // Ensure clsx is imported

import ThemePicker from "@/components/editor/ThemePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ResumePreview from "@/components/ResumePreview";
import { toast } from "sonner";
import { updateResumeBranding } from "./actions";
import { generateResumePdf } from "./pdf-actions";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import { canExportDocument } from "@/lib/permissions";

export default function ResumePreviewView({
  resume,
}: {
  resume: ResumeServerData;
}) {
  const [data, setData] = useState(resume);
  const userLevel = useSubscriptionLevel();

  const handleDownload = async () => {
    // --- THE GATEKEEPER START ---
    if (!canExportDocument(userLevel)) {
      toast.error("Premium Feature", {
        description:
          "Downloading and Printing is reserved for our paid plans. Upgrade to export your resume.",
        action: {
          label: "View Plans",
          onClick: () => (window.location.href = "/billing"),
        },
      });
      return;
    }
    // --- THE GATEKEEPER END ---

    const toastId = toast.loading("Processing images and generating PDF...");
    try {
      const htmlElement = document.querySelector(".resume-paper-container");
      if (!htmlElement) throw new Error("Resume content not found");

      const clone = htmlElement.cloneNode(true) as HTMLElement;
      const images = clone.querySelectorAll("img");

      for (const img of Array.from(images)) {
        if (img.src.startsWith("blob:") || img.src.startsWith("http")) {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          img.src = base64;
        }
      }

      const styledHtml = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; }
            .pdf-wrapper { width: 210mm; margin: 0 auto; }
            .resume-section { page-break-inside: avoid !important; break-inside: avoid !important; }
          </style>
        </head>
        <body>
          <div class="pdf-wrapper">
            ${clone.innerHTML}
          </div>
        </body>
      </html>
    `;

      const base64Pdf = await generateResumePdf(styledHtml);

      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${base64Pdf}`;
      link.download = "Resume.pdf";
      link.click();

      toast.success("Aligned PDF downloaded!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Download failed.", { id: toastId });
    }
  };

  const persistChanges = async (updates: Partial<ResumeServerData>) => {
    const newData = { ...data, ...updates };
    setData(newData);

    try {
      await updateResumeBranding(
        data.id,
        newData.themeId ?? "",
        newData.themeColor ?? "#000000",
        newData.showPhoto ?? true,
      );
    } catch (error) {
      console.error("Failed to update branding:", error);
      toast.error("Failed to save branding changes");
    }
  };

  // Fixed Share Handler
  const handleShareClick = () => {
    if (!canExportDocument(userLevel)) {
      toast.error("Premium Feature", {
        description:
          "Sharing public links is a premium feature. Please upgrade.",
      });
      return;
    }
    const identifier = data.shareToken || data.id;
    const shareUrl = `${window.location.origin}/share/${identifier}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Public link copied!", {
      description: "Anyone with this link can view your document.",
    });
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .resume-paper-container { 
            box-shadow: none !important; 
            border: none !important; 
            margin: 0 !important; 
            max-width: none !important; 
            width: 100% !important; 
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* --- TOP NAVIGATION --- */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-3 no-print shadow-sm z-10">
        <div className="flex flex-col">
          <h1 className="text-xs font-black uppercase tracking-tighter text-slate-900 leading-none">
            Resume Preview
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
            {data.resumeTitle || "Untitled Resume"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="font-bold text-[11px] uppercase transition-colors hover:bg-slate-100"
            asChild>
            <Link href={`/editor?resumeId=${data.id}`}>
              <Edit3 className="mr-2 size-3" /> Edit Resume
            </Link>
          </Button>

          {/* NEW PREMIUM DOWNLOAD BUTTON */}
          <Button
            size="sm"
            onClick={handleDownload}
            className={clsx(
              "font-bold text-[11px] uppercase shadow-md transition-all active:scale-95",
              userLevel === "free"
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-blue-600 hover:bg-blue-700",
            )}>
            {userLevel === "free" ? (
              <Lock className="mr-2 size-3" />
            ) : (
              <Download className="mr-2 size-3" />
            )}
            Download PDF
          </Button>
        </div>
      </header>

      <main className="flex grow overflow-hidden">
        <div className="grow overflow-y-auto p-8 custom-scrollbar bg-slate-100/50">
          <div
            className="resume-paper-container mx-auto max-w-204 shadow-2xl transition-all duration-500 hover:shadow-blue-900/10 bg-white"
            style={
              {
                "--primary": data.themeColor || "#000000",
              } as React.CSSProperties
            }>
            <ResumePreview resumeData={mapToResumeValues(data)} />
          </div>
        </div>

        {/* --- SIDEBAR CONTROLS --- */}
        <aside className="w-80 border-l bg-white p-6 no-print hidden xl:flex flex-col gap-8">
          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Global Branding
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-bold text-slate-700 uppercase">
                  Design Archetype
                </Label>
                <ThemePicker
                  currentThemeId={data.themeId ?? undefined}
                  onSelect={(id) => {
                    const theme = THEME_REGISTRY.find((t) => t.id === id);
                    persistChanges({
                      themeId: id,
                      themeColor: theme?.defaultColor || data.themeColor,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-bold text-slate-700 uppercase">
                  Theme Color
                </Label>
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <input
                    type="color"
                    value={data.themeColor || "#000000"}
                    onChange={(e) =>
                      persistChanges({ themeColor: e.target.value })
                    }
                    className="size-7 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                    {data.themeColor}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Layout Settings
            </h3>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-blue-600 transition-colors">
                  <ImageIcon className="size-4" />
                </div>
                <div className="flex flex-col text-left">
                  <Label
                    htmlFor="show-photo"
                    className="text-[11px] font-bold text-slate-700 uppercase cursor-pointer">
                    Show Photo
                  </Label>
                  <p className="text-[9px] text-slate-400 font-medium italic">
                    Toggle profile image
                  </p>
                </div>
              </div>
              <Switch
                id="show-photo"
                checked={data.showPhoto ?? true}
                onCheckedChange={(checked) =>
                  persistChanges({ showPhoto: checked })
                }
              />
            </div>
          </section>

          <div className="mt-auto pt-6 space-y-3">
            <hr className="border-slate-100 mb-6" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Export Options
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="justify-start font-bold text-[10px] uppercase h-10 border-slate-200"
                onClick={handleDownload}>
                <Printer className="mr-3 size-4 text-slate-400" /> Print Resume
              </Button>
              <Button
                variant="outline"
                className="justify-start font-bold text-[10px] uppercase h-10 border-slate-200"
                onClick={handleShareClick}>
                <Share2 className="mr-3 size-4 text-slate-400" /> Share Link
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
