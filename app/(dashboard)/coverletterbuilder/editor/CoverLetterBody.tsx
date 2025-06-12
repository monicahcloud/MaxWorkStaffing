import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CoverLetterFormProps } from "@/lib/types";
import { letterBodySchema, LetterBodyValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "../../coverletter/RichTextEditor";
import { generateCoverLetter } from "./actions";

export default function CoverLetterBody({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const form = useForm<LetterBodyValues>({
    resolver: zodResolver(letterBodySchema),
    defaultValues: {
      body: coverLetterData.body || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setCoverLetterData({
        ...coverLetterData,
        ...values,
      });
    });

    return unsubscribe; // correct cleanup
  }, [form, coverLetterData, setCoverLetterData]);

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
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="font-semibold text-2xl">Cover Letter Body</h2>
        <p className="text-sm text-muted-foreground">
          Start your cover letter with a strong introduction, or let AI create a
          personalized message tailored to the details you share.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
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
        </form>
      </Form>
    </div>
  );
}
