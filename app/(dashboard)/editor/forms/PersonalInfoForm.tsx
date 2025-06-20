import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import React, { useEffect, useRef } from "react";
import { EditorFormProps } from "@/lib/types";
import { Button } from "@/components/ui/button";

function PersonalInfoForm({ resumeData, setResumeData }: EditorFormProps) {
  console.log("Resume Type:", resumeData.resumeType);

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      address: resumeData.address || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
      website: resumeData.website || "",
      linkedin: resumeData.linkedin || "",
      gitHub: resumeData.gitHub || "",
    },
  });
  useEffect(() => {
    const debouncedUpdate = debounce((values: PersonalInfoValues) => {
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

  const photoInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className=" personal-info max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal Info</h2>
        <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
      </div>
      <Form {...form}>
        <form>
          {resumeData.resumeType !== "Federal Resume" && (
            <FormField
              control={form.control}
              name="photo"
           
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem className="mb-2">
                  <FormLabel>Your Photo</FormLabel>
                  <div className=" flex items-center gap-2">
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                        ref={photoInputRef}
                      />
                    </FormControl>
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        fieldValues.onChange(null);
                        if (photoInputRef.current) {
                          photoInputRef.current.value = "";
                        }
                      }}>
                      Remove
                    </Button>
                  </div>
                  <FormMessage />
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
          )}
          <div className="grid grid-cols-2 gap-3 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {resumeData.resumeType !== "Federal Resume" && (
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Address</FormLabel>
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
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Website</FormLabel>
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
              name="linkedin"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gitHub"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>GitHub (if applicable)</FormLabel>
                  <FormControl>
                    <Input {...field} />
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

export default PersonalInfoForm;
