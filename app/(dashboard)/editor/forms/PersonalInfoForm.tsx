"use client";

import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
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
import React, { useEffect, useRef, useMemo } from "react";
import { EditorFormProps } from "@/lib/types";
import NextImage from "next/image";
import { THEME_REGISTRY } from "@/lib/resume-theme-registry";
import { Image as ImageIcon, X } from "lucide-react";

function PersonalInfoForm({ resumeData, setResumeData }: EditorFormProps) {
  const themeCategory = useMemo(() => {
    const theme = THEME_REGISTRY.find((t) => t.id === resumeData.themeId);
    return theme?.category || "chronological";
  }, [resumeData.themeId]);

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
      // photo is handled as a file or string (URL)
    },
  });

  useEffect(() => {
    const debouncedUpdate = debounce((values: PersonalInfoValues) => {
      setResumeData((prev) => ({ ...prev, ...values }));
    }, 300);

    const subscription = form.watch((values) => {
      debouncedUpdate(values as PersonalInfoValues);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel();
    };
  }, [form, setResumeData]);

  const photoInputRef = useRef<HTMLInputElement>(null);

  // Watch the photo field to generate a local preview URL
  const photoValue = form.watch("photo");
  const photoPreview = useMemo(() => {
    if (!photoValue) return null;
    if (photoValue instanceof File) return URL.createObjectURL(photoValue);
    return photoValue; // If it's already a URL string from the DB
  }, [photoValue]);

  return (
    <div className="personal-info max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Personal Info
        </h2>
        <p className="text-sm text-muted-foreground italic">
          How should employers contact you?
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          {/* Photo Upload Section - Hidden for Federal by default */}
          {themeCategory !== "federal" && (
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...fieldValues } }) => (
                <FormItem className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 transition-colors hover:border-slate-300">
                  <FormLabel className="text-[10px] font-bold uppercase flex items-center gap-2 mb-4">
                    <ImageIcon className="size-3" /> Profile Photo
                  </FormLabel>
                  <div className="flex items-center gap-6">
                    {photoPreview && (
                      <div className="relative group size-20">
                        <NextImage
                          src={photoPreview}
                          alt="Profile Preview"
                          fill
                          className="rounded-2xl object-cover border-2 border-white shadow-md"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => {
                            onChange(null);
                            if (photoInputRef.current)
                              photoInputRef.current.value = "";
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <X className="size-3" />
                        </button>
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <FormControl>
                        <Input
                          {...fieldValues}
                          type="file"
                          accept="image/*"
                          className="bg-white cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                          }}
                          ref={photoInputRef}
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground italic">
                        Recommended: Square professional headshot (Max 4MB).
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold uppercase ml-1">
                  Target Job Title
                </FormLabel>
                <FormControl>
                  <Input {...field} className="rounded-xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold uppercase ml-1">
                  Location / Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="City, State"
                    className="rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    LinkedIn
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Handle or URL"
                      className="rounded-xl"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gitHub"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    GitHub
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Handle"
                      className="rounded-xl"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-bold uppercase ml-1">
                    Portfolio
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Website URL"
                      className="rounded-xl"
                    />
                  </FormControl>
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
