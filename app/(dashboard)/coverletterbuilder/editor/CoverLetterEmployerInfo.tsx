// components/coverletterbuilder/editor/steps/CoverLetterEmployerInfo.tsx
import { employerInfoSchema, EmployerInfoValues } from "@/lib/validation";
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
import React, { useEffect } from "react";
import { CoverLetterFormProps } from "@/lib/types";
import FormStepWrapper from "./FormStepWrapper";

export default function CoverLetterEmployerInfo({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const form = useForm<EmployerInfoValues>({
    resolver: zodResolver(employerInfoSchema),
    defaultValues: {
      recipientName: coverLetterData.recipientName ?? "",
      companyName: coverLetterData.companyName ?? "",
      companyEmail: coverLetterData.companyEmail ?? "",
      companyPhone: coverLetterData.companyPhone ?? "",
      companyAddress: coverLetterData.companyAddress ?? "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    });
    return () => subscription.unsubscribe();
  }, [form, setCoverLetterData]);

  return (
    <FormStepWrapper
      title="Employer Details"
      description="Provide the details of the company and person you are contacting.">
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Hiring Manager / Recipient
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. John Doe or Hiring Manager"
                    className="bg-slate-50/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-slate-50/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="bg-slate-50/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Phone
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="bg-slate-50/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Company Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="City, State"
                      className="bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </FormStepWrapper>
  );
}
