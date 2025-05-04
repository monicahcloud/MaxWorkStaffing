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
import { useEffect } from "react";
import { debounce } from "lodash";
//import FormsTourButton from "@/components/tourGuide/FormsTourButton";
export default function GeneralInforForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      resumeTitle: resumeData.resumeTitle || "",
      description: resumeData.description || "",
      resumeType: resumeData.resumeType || "",
    },
  });

  useEffect(() => {
    const debouncedUpdate = debounce((values: GeneralInfoValues) => {
      setResumeData((prev) => ({ ...prev, ...values }));
    }, 300);

    const subscription = form.watch((values) => {
      debouncedUpdate(values);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel(); // Clean up debounce
    };
  }, [form, setResumeData]);

  return (
    <>
      {/* <div className="mx-auto flex justify-center">
        <FormsTourButton />
      </div> */}
      <div className="max-w-xl mx-auto space-y-6 general-info">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">General Info</h2>
          <p className="text-sm text-muted-foreground">
            This will not appear on your resume
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="resumeTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="My First Resume" autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resumeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Type</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="mx-auto justify-center flex mt-10">
              Watch the video before building out your resume.
            </h1>

            <div className="relative pb-[56.25%] h-0">
              <iframe
                src="https://www.loom.com/embed/5ec66f078da44437b60f7ee3575dd8a2?sid=e321f383-982e-4c75-b9fa-6b9de2b68359"
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
                title="Steps to create your resume."></iframe>
            </div>

            {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="A resume for my next job"
                    autoFocus
                  />
                </FormControl>
                <FormDescription>
                  Describe what this resume is for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          </form>
        </Form>
      </div>{" "}
    </>
  );
}
