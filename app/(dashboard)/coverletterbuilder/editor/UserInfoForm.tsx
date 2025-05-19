"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function UserInfoForm({
  jobTitle,
  setJobTitle,
}: {
  jobTitle: string;
  setJobTitle: (value: string) => void;
}) {
  const form = useFormContext();
  const photoInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Info</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="userPhoto"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem className="col-span-2">
              <FormLabel>Upload Photo (optional)</FormLabel>
              <div className="flex items-center gap-2">
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Job Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
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
              <FormLabel>Your Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userAddress"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Your Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
