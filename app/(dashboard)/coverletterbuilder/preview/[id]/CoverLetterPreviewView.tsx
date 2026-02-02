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
import { CoverLetterServerData } from "@/lib/types";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { mapToCoverLetterValues } from "@/lib/utils";
import { toast } from "sonner";
import { clsx } from "clsx";
import ThemePicker from "@/components/editor/ThemePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import CoverLetterPreview from "@/app/(dashboard)/coverletter/CoverLetterPreview";
import { generateResumePdf } from "@/app/(dashboard)/resumes/[id]/pdf-actions";
import { updateCoverLetterBranding } from "./actions";
import { useSubscriptionLevel } from "../../../SubscriptionLevelProvider";
import { canExportDocument } from "@/lib/permissions";

export default function CoverLetterPreviewView({
  coverLetter,
}: {
  coverLetter: CoverLetterServerData;
}) {
  const [data, setData] = useState(coverLetter);
  const userLevel = useSubscriptionLevel();

  const handleDownload = async () => {
    // --- THE GATEKEEPER ---
    if (!canExportDocument(userLevel)) {
      toast.error("Premium Feature", {
        description:
          "Downloading and Printing is reserved for paid plans. Upgrade to export your cover letter.",
        action: {
          label: "View Plans",
          onClick: () => (window.location.href = "/billing"),
        },
      });
      return;
    }

    const toastId = toast.loading("Generating professional Cover Letter...");
    try {
      const htmlElement = document.querySelector(
        ".cover-letter-paper-container",
      );
      if (!htmlElement) throw new Error("Cover letter content not found");

      const clone = htmlElement.cloneNode(true) as HTMLElement;
      const images = clone.querySelectorAll("img");

      for (const img of Array.from(images)) {
        if (img.src.startsWith("blob:") || img.src.startsWith("http")) {
          const response = await fetch(img.src);
          const blob = await response.blob();
          const reader = new FileReader();
          const base64Str = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          img.src = base64Str;
        }
      }

      const styledHtml = `
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
            body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;}
            .pdf-wrapper { width: 210mm; margin: 0 auto; }
            .letter-section { page-break-inside: avoid !important; break-inside: avoid !important; }
          </style>
        </head>
        <body style="--primary: ${data.themeColor || "#000000"};">
          <div class="pdf-wrapper">
            ${clone.innerHTML}
          </div>
        </body>
      </html>
    `;

      const base64Pdf = await generateResumePdf(styledHtml);

      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${base64Pdf}`;
      link.download = `Cover_Letter_${data.firstName || "Document"}.pdf`;
      link.click();

      toast.success("Cover Letter downloaded!", { id: toastId });
    } catch (error) {
      console.error("Cover Letter Export Error:", error);
      toast.error("Download failed.", { id: toastId });
    }
  };

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

  const persistChanges = async (updates: Partial<CoverLetterServerData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    await updateCoverLetterBranding(
      data.id,
      updates.themeId ?? data.themeId ?? "",
      updates.themeColor ?? data.themeColor ?? "#000000",
      updates.showPhoto ?? data.showPhoto ?? true,
    );
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-6 py-3 no-print shadow-sm z-10">
        <div className="flex flex-col">
          <h1 className="text-xs font-black uppercase tracking-tighter text-slate-900 leading-none">
            CoverLetter Preview
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
            {data.companyName || "Untitled Cover Letter"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="font-bold text-[11px] uppercase"
            asChild>
            <Link href={`/coverletterbuilder/editor?coverLetterId=${data.id}`}>
              <Edit3 className="mr-2 size-3" /> Edit CoverLetter
            </Link>
          </Button>

          {/* PREMIUM COLORED DOWNLOAD BUTTON */}
          <Button
            size="sm"
            onClick={handleDownload}
            className={clsx(
              "font-bold text-[11px] uppercase shadow-md transition-all active:scale-95",
              userLevel === "free"
                ? "bg-amber-500 hover:bg-amber-600 text-white"
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
          <div className="mx-auto max-w-204 shadow-2xl transition-all duration-500 hover:shadow-blue-900/10 bg-white">
            <CoverLetterPreview
              coverLetterData={mapToCoverLetterValues(data)}
            />
          </div>
        </div>

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
                <div className="flex flex-col">
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

          <hr className="border-slate-100 mt-auto" />

          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Export Options
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="justify-start font-bold text-[10px] uppercase h-10 border-slate-200"
                onClick={handleDownload}>
                {userLevel === "free" ? (
                  <Lock className="mr-3 size-4 text-amber-500" />
                ) : (
                  <Printer className="mr-3 size-4 text-slate-400" />
                )}
                Print Cover Letter
              </Button>
              <Button
                variant="outline"
                className="justify-start font-bold text-[10px] uppercase h-10 border-slate-200"
                onClick={handleShareClick}>
                {userLevel === "free" ? (
                  <Lock className="mr-3 size-4 text-amber-500" />
                ) : (
                  <Share2 className="mr-3 size-4 text-slate-400" />
                )}
                Share Link
              </Button>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
