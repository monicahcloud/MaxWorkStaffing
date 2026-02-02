// components/editor/forms/CoverLetterGeneralInfoForm.tsx
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CoverLetterFormProps } from "@/lib/types";
import FormStepWrapper from "./FormStepWrapper";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";

const schema = z.object({
  companyName: z.string().min(1, "Project name is required"),
});

export default function CoverLetterGeneralInfoForm({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: coverLetterData.companyName || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    });
    return () => unsubscribe();
  }, [form.watch, setCoverLetterData]);

  const currentTheme =
    THEME_REGISTRY.find((t) => t.id === coverLetterData.themeId) ||
    THEME_REGISTRY[0];

  return (
    <FormStepWrapper
      title="General Settings"
      description="Name your project and verify your design archetype.">
      <Form {...form}>
        <div className="space-y-8">
          {/* Active Archetype Display */}
          <div className="bg-[#0F172A] rounded-2xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
                Active Archetype
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none">
                {currentTheme.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium italic pt-1">
                AI generators and form fields are now tailored for functional
                compliance.
              </p>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 size-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
              <div className="size-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
          </div>

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Cover Letter Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-14 rounded-2xl border-slate-200 bg-white font-bold text-slate-700 shadow-sm focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="e.g. My Professional Cover Letter"
                  />
                </FormControl>
                <FormMessage />
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter text-center pt-4 italic">
                  Tutorial: Mastering the {currentTheme.name}
                </p>
              </FormItem>
            )}
          />
        </div>
      </Form>
    </FormStepWrapper>
  );
}
