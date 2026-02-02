"use client";

import { useState } from "react";
import { Lightbulb, Sparkles, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { analyzeContent } from "@/app/(dashboard)/editor/forms/action";

export default function AIFeedbackBubble({
  text,
  category,
}: {
  text: string;
  category: string;
}) {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text || text.length < 5) {
      setSuggestion("Please enter more text before analyzing.");
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeContent(
        text,
        category,
        "Work Experience Description"
      );
      setSuggestion(result);
    } catch {
      setSuggestion("AI analysis currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAnalyze}
          className="h-6 px-2 text-[10px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors">
          {loading ? (
            <Loader2 className="size-3 mr-1 animate-spin" />
          ) : (
            <Sparkles className="size-3 mr-1" />
          )}
          AI Review
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-72 p-4 shadow-xl border-blue-100">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-yellow-50 rounded-lg">
            <Lightbulb className="size-4 text-yellow-600 shrink-0" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {category} Design Tip
            </p>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              {loading
                ? "Analyzing your writing style..."
                : suggestion || "Click to analyze your content."}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
