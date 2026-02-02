"use client";

import { userInfoSchema, UserInfoValues } from "@/lib/validation";
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
import React, { useEffect, useRef, useState } from "react";
import { CoverLetterFormProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import FormStepWrapper from "./FormStepWrapper";
import { mapToUserInfoValues } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

export default function CoverLetterPersonalInfoForm({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const form = useForm<UserInfoValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: mapToUserInfoValues(coverLetterData),
  });

  const photoInputRef = useRef<HTMLInputElement>(null);

  // Local state for the image preview
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    coverLetterData.userPhotoUrl || null
  );

  // Sync form values to the parent state for auto-save
  useEffect(() => {
    const subscription = form.watch((values) => {
      setCoverLetterData((prev) => ({ ...prev, ...values }));
    });
    return () => subscription.unsubscribe();
  }, [form, setCoverLetterData]);

  // Handle local file preview logic
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormStepWrapper
      title="Personal Branding"
      description="Tell the employer who you are and how to reach you.">
      <Form {...form}>
        <form className="space-y-6">
          {/* --- PHOTO SECTION --- */}
          <FormField
            control={form.control}
            name="userPhoto"
            render={({ field: { value, onChange, ...fieldValues } }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Professional Photo
                </FormLabel>
                <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 shadow-sm">
                  {/* Image Preview Circle */}
                  <div className="relative size-20 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-md shrink-0 flex items-center justify-center">
                    {photoPreview ? (
                      <Image
                        src={photoPreview}
                        alt="Profile Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[8px] font-black uppercase text-slate-400">
                        No Photo
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 grow">
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, onChange)}
                        ref={photoInputRef}
                        className="bg-white cursor-pointer text-xs h-9 file:text-blue-600 file:font-bold file:uppercase file:text-[10px] file:border-none file:bg-transparent"
                      />
                    </FormControl>

                    {photoPreview && (
                      <Button
                        variant="ghost"
                        type="button"
                        className="text-[10px] uppercase font-black text-red-500 hover:text-red-600 hover:bg-red-50 h-auto p-1 w-fit flex items-center gap-1"
                        onClick={() => {
                          onChange(null);
                          setPhotoPreview(null);
                          if (photoInputRef.current)
                            photoInputRef.current.value = "";
                        }}>
                        <X className="size-3" /> Remove Photo
                      </Button>
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- NAME SECTION --- */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-slate-50/50 border-slate-200"
                    />
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
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-slate-50/50 border-slate-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* --- TITLE SECTION --- */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Professional Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Senior Software Engineer"
                    className="bg-slate-50/50 border-slate-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- CONTACT SECTION --- */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="bg-slate-50/50 border-slate-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="bg-slate-50/50 border-slate-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="userAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Mailing Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="City, State"
                    className="bg-slate-50/50 border-slate-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* --- SOCIAL SECTION --- */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Portfolio/Website
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://yourportfolio.com"
                      className="bg-slate-50/50 border-slate-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    LinkedIn URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="linkedin.com/in/username"
                      className="bg-slate-50/50 border-slate-200"
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
