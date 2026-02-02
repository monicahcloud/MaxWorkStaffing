"use client";

import React, { useEffect, useState, useMemo } from "react";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import GenerateSkillsForm from "./GenerateSkills";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";

function SkillsForm({ resumeData, setResumeData }: EditorFormProps) {
  const themeCategory = useMemo(() => {
    const theme = THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
    return theme?.category || "chronological";
  }, [resumeData.themeId]);

  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  const [searchedJobTitle, setSearchedJobTitle] = useState<string | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({
        ...resumeData,
        skills: values.skills?.filter(Boolean).map((s) => s!.trim()) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6 skills-info">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Soft & Hard Skills
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Optimizing for your{" "}
          <span className="text-blue-600 font-bold">{themeCategory}</span>{" "}
          layout.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    Skill List
                  </FormLabel>
                  <span className="text-[10px] text-red-500 font-bold uppercase">
                    Target: 6-10 Skills
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Project Management, React, Leadership..."
                    className="min-h-[120px] rounded-2xl shadow-sm"
                    value={field.value?.join(", ") || ""}
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                      field.onChange(skills);
                    }}
                  />
                </FormControl>
                <FormDescription className="text-[10px]">
                  Separate with commas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <GenerateSkillsForm
              resumeData={resumeData}
              onSkillsGenerated={(skills) => {
                const current = form.getValues("skills") || [];
                form.setValue(
                  "skills",
                  Array.from(new Set([...current, ...skills]))
                );
              }}
              onJobTitleSearched={setSearchedJobTitle}
              onSuggestedSkills={setSuggestedSkills}
            />
          </div>

          {searchedJobTitle && (
            <p className="text-center text-[10px] text-muted-foreground mt-4">
              Analyzed <strong>{suggestedSkills.length}</strong> skills for "
              {searchedJobTitle}"
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}

export default SkillsForm;
