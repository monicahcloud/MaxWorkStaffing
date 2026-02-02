"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ResumeThemeToken, ColorPalettes } from "@/lib/resume-theme-registry";
import { ArrowRight, Layout } from "lucide-react";
import ThemeThumbnail from "@/components/ThemeThumbnail";
import ThemeLivePreview from "@/components/ThemeLivePreview";

export default function ResumeTemplateCard({
  theme,
  resumeId,
}: {
  theme: ResumeThemeToken;
  resumeId?: string;
}) {
  const router = useRouter();

  const palette =
    ColorPalettes[theme.paletteId as keyof typeof ColorPalettes] ||
    ColorPalettes["classic-business"];

  // --- Logic to determine Industry Tag from Description ---
  const getIndustryTag = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes("finance") || d.includes("law") || d.includes("legal"))
      return "Corporate";
    if (
      d.includes("tech") ||
      d.includes("engineering") ||
      d.includes("startup")
    )
      return "Technology";
    if (d.includes("healthcare") || d.includes("medical")) return "Healthcare";
    if (
      d.includes("creative") ||
      d.includes("marketing") ||
      d.includes("design")
    )
      return "Creative";
    if (d.includes("government") || d.includes("federal")) return "Government";
    return "Professional";
  };

  const industryTag = getIndustryTag(palette.description);

  const handleNavigation = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement)
        .closest("button")
        ?.innerText.includes("Live Preview")
    ) {
      return;
    }

    if (resumeId) {
      router.push(`/editor?resumeId=${resumeId}`);
    } else {
      router.push(`/editor?themeId=${theme.id}`);
    }
  };

  return (
    <Card
      onClick={handleNavigation}
      className="group cursor-pointer rounded-4xl border-slate-100 overflow-hidden hover:border-red-600 hover:shadow-2xl transition-all duration-500 bg-white">
      <CardContent className="p-0">
        <div className="h-80 bg-slate-100 flex items-center justify-center p-0 overflow-hidden relative group border-b">
          <div onClick={(e) => e.stopPropagation()}>
            <ThemeLivePreview theme={theme} />
          </div>

          {/* CHANGED: Badge now shows industryTag instead of theme.category */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-black/90 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {industryTag}
            </span>
          </div>

          <div className="w-full h-full pointer-events-none transition-transform duration-700 group-hover:scale-105">
            <ThemeThumbnail theme={theme} />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="font-black text-black uppercase tracking-tighter text-sm">
              {theme.name}
            </h3>
            <div
              className="size-3 rounded-full shadow-sm"
              style={{ backgroundColor: palette.primary }}
            />
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed italic line-clamp-2">
            {palette.description}
          </p>

          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Layout className="size-3" />
            {theme.layout.replace("-", " ")}
          </div>

          <div className="w-full py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 group-hover:bg-red-600 transition-colors">
            INITIALIZE DESIGN
            <ArrowRight className="size-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
