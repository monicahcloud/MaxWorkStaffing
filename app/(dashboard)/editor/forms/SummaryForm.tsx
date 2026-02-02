// components/editor/forms/SummaryForm.tsx
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import GenerateSummaryButton from "./GenerateSummaryButtons";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";

export default function SummaryForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const themeCategory = useMemo(() => {
    const theme = THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
    return theme?.category || "chronological";
  }, [resumeData.themeId]);

  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({
        ...resumeData,
        ...values,
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="font-semibold text-2xl uppercase tracking-tighter">
          Professional Summary
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Drafting a summary for your <strong>{themeCategory}</strong> layout.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-start mb-2">
                  <GenerateSummaryButton
                    resumeData={resumeData}
                    category={themeCategory} // ✅ Pass the category
                    onSummaryGenerated={(summary) =>
                      form.setValue("summary", summary)
                    }
                  />
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[150px] rounded-xl shadow-sm border-slate-200"
                    placeholder="Describe your professional journey..."
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
