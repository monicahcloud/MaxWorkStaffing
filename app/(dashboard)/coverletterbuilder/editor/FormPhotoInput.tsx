"use client";

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

export function FormPhotoInput({ name }: { name: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      name={name}
      render={({ field: { value, ...fieldValues } }) => (
        <FormItem className="col-span-2">
          <FormLabel>Upload Photo (optional)</FormLabel>
          <div className="flex items-center gap-4">
            <FormControl>
              <Input
                {...fieldValues}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    alert("Only image files are allowed.");
                    if (inputRef.current) inputRef.current.value = "";
                    return;
                  }

                  fieldValues.onChange(file);
                }}
                ref={inputRef}
              />
            </FormControl>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                fieldValues.onChange(null);

                if (inputRef.current) inputRef.current.value = "";
              }}>
              Remove
            </Button>
          </div>
          {/* {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={64}
              height={64}
              className="mt-2 h-16 w-16 rounded-full object-cover"
            />
          )} */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
