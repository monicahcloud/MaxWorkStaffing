// components/form/FormPhotoInput.tsx
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
import { useRef, useState } from "react";
import Image from "next/image";

export function FormPhotoInput({ name }: { name: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    fieldValues.onChange(file);
                  }
                }}
                ref={inputRef}
              />
            </FormControl>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                fieldValues.onChange(null);
                setPreview(null);
                if (inputRef.current) inputRef.current.value = "";
              }}>
              Remove
            </Button>
          </div>
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              className="mt-2 h-16 w-16 rounded-full object-cover"
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
