/* eslint-disable @typescript-eslint/no-explicit-any */
import { letterBodySchema, LetterBodyValues } from "@/lib/validation";
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
import React, { useEffect } from "react";
import { CoverLetterFormProps } from "@/lib/types";
import FormStepWrapper from "./FormStepWrapper";
import { generateCoverLetter } from "../editor/actions";
import RichTextEditor from "../../coverletter/RichTextEditor";

export default function CoverLetterBody({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const form = useForm<LetterBodyValues>({
    resolver: zodResolver(letterBodySchema),
    defaultValues: {
      body: coverLetterData.body ?? "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    });
    return () => subscription.unsubscribe();
  }, [form, setCoverLetterData]);

  const handleAiGeneration = async (params: any) => {
    const aiContent = await generateCoverLetter(params);
    form.setValue("body", aiContent);
    setCoverLetterData((prev) => ({ ...prev, body: aiContent }));
  };

  return (
    <FormStepWrapper
      title="Letter Content"
      description="Write your pitch or use AI to generate a draft based on your specific goals.">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Letter Body
                </FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    generateAI={handleAiGeneration}
                    placeholder="Dear Hiring Manager, I am excited to apply for..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormStepWrapper>
  );
}
