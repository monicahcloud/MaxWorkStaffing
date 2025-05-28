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
import { debounce } from "lodash";
import React, { useEffect } from "react";
import { CoverLetterFormProps } from "@/lib/types";

function CoverLetterEmployerInfo({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  console.log("Resume Type:", coverLetterData.template);

  const form = useForm<EmployerInfoValues>({
    resolver: zodResolver(employerInfoSchema),
    defaultValues: {
      companyName: coverLetterData.companyName || "",
      companyEmail: coverLetterData.companyEmail || "",
      companyAddress: coverLetterData.companyAddress || "",
      companyPhone: coverLetterData.companyPhone || "",
      recipientName: coverLetterData.recipientName || "",
    },
  });
  useEffect(() => {
    const debouncedUpdate = debounce((values: EmployerInfoValues) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    }, 300);

    const subscription = form.watch((values) => {
      debouncedUpdate(values);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel(); // Clean up debounce
    };
  }, [form, setCoverLetterData]);

  return (
    <div className=" personal-info max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Employer Info</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about the company.
        </p>
      </div>
      <Form {...form}>
        <form>
          <div className="grid grid-cols-2 gap-3 ">
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Hiring Manager</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="companyEmail"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Company Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyPhone"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Company Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CoverLetterEmployerInfo;
