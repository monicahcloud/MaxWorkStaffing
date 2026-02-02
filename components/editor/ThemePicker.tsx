"use client";

import { ColorPalettes, THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { Button } from "@/components/ui/button";
import { Palette, Layout } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // Ensure this matches your project structure
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemePickerProps {
  currentThemeId?: string;
  onSelect: (id: string) => void;
}

export default function ThemePicker({
  currentThemeId,
  onSelect,
}: ThemePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md bg-white hover:bg-slate-50 border-slate-200 transition-all">
          <Palette className="size-5 text-red-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="right" align="start">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black uppercase text-[10px] tracking-widest text-slate-500">
            Choose a Theme
          </h3>
          <span className="text-[9px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-400">
            {THEME_REGISTRY.length} OPTIONS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          <TooltipProvider>
            {THEME_REGISTRY.map((theme) => {
              // Safe lookup for palette data
              const palette =
                ColorPalettes[theme.paletteId as keyof typeof ColorPalettes];
              const isActive = currentThemeId === theme.id;

              return (
                <Tooltip key={theme.id} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onSelect(theme.id)}
                      className={cn(
                        "group flex items-center justify-between p-3 rounded-xl border text-left transition-all",
                        isActive
                          ? "border-red-600 bg-red-50/50 shadow-sm"
                          : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                      )}>
                      <div className="space-y-0.5 pr-2 min-w-0 flex-1">
                        <p
                          className={cn(
                            "text-[11px] font-bold truncate uppercase tracking-tight",
                            isActive ? "text-red-700" : "text-slate-900"
                          )}>
                          {palette.label}
                        </p>
                        <p className="text-[9px] text-slate-400 line-clamp-1 italic">
                          {palette.description}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Layout className="size-2.5 text-slate-400" />
                          <span className="text-[9px] text-slate-500 uppercase font-medium">
                            {theme.layout.replace("-", " ")}
                          </span>
                        </div>
                      </div>

                      <div
                        className="size-4 rounded-full border border-white shadow-sm shrink-0"
                        style={{ backgroundColor: palette.primary }}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="left"
                    className="max-w-[200px] p-3 bg-slate-900 text-white border-none">
                    <p className="text-[10px] font-bold mb-1 text-red-400 uppercase tracking-tighter">
                      Industry Match
                    </p>
                    <p className="text-[10px] leading-relaxed opacity-90">
                      {palette.description}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </PopoverContent>
    </Popover>
  );
}
