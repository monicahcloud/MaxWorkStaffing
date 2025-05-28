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

// Simulate an upload function (replace with your API/S3/Cloudinary logic)
async function uploadImage(file: File): Promise<string> {
  // TODO: replace with your actual upload logic!
  await new Promise((resolve) => setTimeout(resolve, 500));
  return URL.createObjectURL(file); // This is NOT a real upload—replace in production!
}

export function FormPhotoInput({
  name,
  onPhotoUploaded,
  initialUrl,
}: {
  name: string;
  onPhotoUploaded: (url: string) => void;
  initialUrl?: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [uploading, setUploading] = useState(false);

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
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  console.log("File selected:", file);

                  if (!file) return;

                  // Show a local preview
                  const reader = new FileReader();
                  reader.onload = () => {
                    setPreview(reader.result as string);
                    console.log("Preview data URL:", reader.result);
                  };
                  reader.readAsDataURL(file);

                  // Upload to server/storage
                  setUploading(true);
                  try {
                    const url = await uploadImage(file);
                    console.log("Uploaded file, received URL:", url);
                    onPhotoUploaded(url); // set the url in parent form state
                  } catch (err) {
                    console.error("Photo upload failed:", err);
                  }
                  setUploading(false);
                }}
                ref={inputRef}
              />
            </FormControl>
            <Button
              variant="secondary"
              type="button"
              disabled={uploading}
              onClick={() => {
                fieldValues.onChange(null);
                setPreview(null);
                onPhotoUploaded(""); // clear photo url from parent form state
                if (inputRef.current) inputRef.current.value = "";
              }}>
              Remove
            </Button>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
