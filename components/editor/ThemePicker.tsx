"use client";

import { ColorPalettes, THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { Button } from "@/components/ui/button";
import { Palette, Layout } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
          id="theme-picker-trigger"
          variant="outline"
          size="icon"
          className="rounded-full border-slate-200 bg-white shadow-md transition-all hover:bg-slate-50">
          <Palette className="size-5 text-red-600" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4" side="right" align="start">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Choose a Theme
          </h3>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-400">
            {THEME_REGISTRY.length} OPTIONS
          </span>
        </div>

        <div className="custom-scrollbar grid max-h-80 grid-cols-1 gap-2 overflow-y-auto pr-2">
          <TooltipProvider>
            {THEME_REGISTRY.map((theme) => {
              const palette =
                ColorPalettes[theme.paletteId as keyof typeof ColorPalettes];
              const isActive = currentThemeId === theme.id;

              return (
                <Tooltip key={theme.id} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => onSelect(theme.id)}
                      className={cn(
                        "group flex items-center justify-between rounded-xl border p-3 text-left transition-all",
                        isActive
                          ? "border-red-600 bg-red-50/50 shadow-sm"
                          : "border-slate-100 hover:border-slate-300 hover:bg-slate-50",
                      )}>
                      <div className="min-w-0 flex-1 space-y-0.5 pr-2">
                        <p
                          className={cn(
                            "truncate text-[11px] font-bold uppercase tracking-tight",
                            isActive ? "text-red-700" : "text-slate-900",
                          )}>
                          {theme.name}
                        </p>
                        <p className="line-clamp-1 text-[9px] italic text-slate-400">
                          {palette.description}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Layout className="size-2.5 text-slate-400" />
                          <span className="text-[9px] font-medium uppercase text-slate-500">
                            {theme.layout.replace("-", " ")}
                          </span>
                        </div>
                      </div>

                      <div
                        className="size-4 shrink-0 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: palette.primary }}
                      />
                    </button>
                  </TooltipTrigger>

                  <TooltipContent
                    side="left"
                    className="max-w-[200px] border-none bg-slate-900 p-3 text-white">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-red-400">
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
