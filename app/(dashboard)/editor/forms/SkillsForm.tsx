"use cliennt";
import React, { useEffect, useState } from "react";
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

function SkillsForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [], // Ensure this is an empty array initially
    },
  });
  const [searchedJobTitle, setSearchedJobTitle] = useState<string | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6 skills-info">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Let's find relevant skills for the job you're applying for.
          <span className="font-bold text-red-600">
            {" "}
            Listing 6-10 skills is best.
          </span>
        </p>
      </div>
      <Form {...form}>
        <form className="space-t-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Reactjs, Node.js, graphic design..."
                    value={field.value ? field.value.join(", ") : ""} // Ensure the field value is correctly joined by commas
                    onChange={(e) => {
                      const skills = e.target.value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill !== "");
                      field.onChange(skills); // Update the form with the parsed skills
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each skill with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1
            className="
           justify-center mx-auto flex ">
            {searchedJobTitle && (
              <h1 className="mt-10 justify-center mx-auto flex text-sm text-muted-foreground">
                Showing {suggestedSkills.length || 0} results for "
                <strong>{searchedJobTitle}</strong>"
              </h1>
            )}
          </h1>
          <GenerateSkillsForm
            resumeData={resumeData}
            onSkillsGenerated={(skills) => {
              const current = form.getValues("skills") || [];
              const uniqueSkills = Array.from(new Set([...current, ...skills])); // Avoid duplicates by using Set
              form.setValue("skills", uniqueSkills); // Set the selected skills into the form
            }}
            onJobTitleSearched={(title) => setSearchedJobTitle(title)}
            onSuggestedSkills={(skills) => setSuggestedSkills(skills)}
          />
        </form>
      </Form>
    </div>
  );
}

export default SkillsForm;
