import React, { useEffect } from "react";
import { EditorFormProps } from "@/lib/types";
import {
  skillsSchema,
  SkillsValues,
  TechSkill,
  techSkillSchema,
} from "@/lib/validation";
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

function SkillsForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

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
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold"> Skills</h2>
        <p className="text-sm text-muted-foreground">What are you good at?</p>
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
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      field.onChange(skills);
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
        </form>
      </Form>
      <section className="max-w-xl mx-auto space-y-6">
        <TechnicalSkillsForm
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      </section>
    </div>
  );
}

export default SkillsForm;

function TechnicalSkillsForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<TechSkill>({
    resolver: zodResolver(techSkillSchema),
    defaultValues: {
      techSkill: resumeData.techSkill || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setResumeData({
        ...resumeData,
        skills:
          values.techSkill
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold"> Technical Skills</h2>
        <p className="text-sm text-muted-foreground">
          {" "}
          Rate your proficiency for each technical skill on a scale of 1
          (Beginner) to 5 (Expert).
        </p>
      </div>
      <Form {...form}>
        <form className="space-t-3">
          <FormField
            control={form.control}
            name="techSkill"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Technical Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Reactjs, Node.js, graphic design..."
                    onChange={(e) => {
                      const techSkills = e.target.value.split(",");
                      field.onChange(techSkills);
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
        </form>
      </Form>
    </div>
  );
}
