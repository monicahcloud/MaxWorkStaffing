import React, { useEffect } from "react";
import { EditorFormProps } from "@/lib/types";
import { interestSchema, InterestValues } from "@/lib/validation";
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

function InterestForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<InterestValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      interest: resumeData.interest || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      setResumeData({
        ...resumeData,
        interest:
          values.interest
            ?.filter((interest) => interest !== undefined)
            .map((interest) => interest.trim())
            .filter((interest) => interest !== "") || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold capitalize"> Interests</h2>
        <p className="text-sm text-muted-foreground">What do you enjoy?</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Interest</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Chess, Cooking, graphic design, ..."
                    onChange={(e) => {
                      const interest = e.target.value.split(",");
                      field.onChange(interest);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each interest with a comma.
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

export default InterestForm;
