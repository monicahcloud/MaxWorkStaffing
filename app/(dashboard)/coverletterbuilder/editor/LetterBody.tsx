"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "../../coverletter/RichTextEditor";
import { useState } from "react";
import { generateCoverLetter } from "./actions";

export default function LetterBodyForm() {
  const form = useFormContext();
  const [isGenerating, setIsGenerating] = useState(false);

  // Accept the full params object from RichTextEditor!
  const handleGenerate = async (params: {
    jobTitle: string;
    yearsExperience?: string;
    achievements?: string;
    tools?: string;
  }) => {
    if (!params.jobTitle) return;
    setIsGenerating(true);

    try {
      const generated = await generateCoverLetter(params);
      if (generated) {
        form.setValue("body", generated);
      }
    } catch (error) {
      console.error("Failed to generate cover letter", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="body"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Edit your cover letter here or generate one with AI..."
                loading={isGenerating}
                generateAI={handleGenerate}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
