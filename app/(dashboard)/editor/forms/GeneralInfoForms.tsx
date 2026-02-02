"use client";

import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { Sparkles } from "lucide-react";

export default function GeneralInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const currentTheme = useMemo(() => {
    return THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
  }, [resumeData.themeId]);

  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      resumeTitle: resumeData.resumeTitle || "",
      description: resumeData.description || "",
      resumeType:
        currentTheme?.category || resumeData.resumeType || "chronological",
    },
  });

  // FIX 1: Explicitly sync resumeType whenever the theme changes
  useEffect(() => {
    if (currentTheme?.category) {
      form.setValue("resumeType", currentTheme.category);
    }
  }, [currentTheme, form]);

  // FIX 2: Ensure initial values (like resumeTitle) are pushed to global state immediately
  useEffect(() => {
    const debouncedUpdate = debounce((values: GeneralInfoValues) => {
      setResumeData((prev) => ({
        ...prev,
        resumeTitle: values.resumeTitle,
        resumeType: values.resumeType,
        description: values.description,
      }));
    }, 300);

    const subscription = form.watch((values) => {
      debouncedUpdate(values as GeneralInfoValues);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel();
    };
  }, [form, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          General Settings
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Name your project and verify your design archetype.
        </p>
      </div>

      {/* Archetype Indicator Card */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">
            Active Archetype
          </p>
          <h3 className="text-xl font-black uppercase tracking-tighter italic">
            {currentTheme?.category || "Standard"}
          </h3>
          <p className="text-[10px] text-slate-400 mt-2 max-w-[200px] leading-tight font-medium">
            AI generators and form fields are now tailored for{" "}
            {currentTheme?.category} compliance.
          </p>
        </div>
        <div className="opacity-20">
          <Sparkles className="size-20 -rotate-12" />
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          {/* Hidden field for resumeType so form.watch picks it up */}
          <input type="hidden" {...form.register("resumeType")} />

          <FormField
            control={form.control}
            name="resumeTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-500 ml-1">
                  Project Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Senior Developer Resume 2026"
                    className="h-12 rounded-2xl border-slate-200 focus:ring-slate-900 font-bold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 border-t border-slate-100">
            <h1 className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center mb-6">
              Tutorial: Mastering the {currentTheme?.category || "Editor"}
            </h1>
          </div>
        </form>
      </Form>
    </div>
  );
}
