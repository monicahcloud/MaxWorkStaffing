"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

export default function UploadResumeButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Upload failed. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Unexpected error occurred.");
    }

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        onClick={() => inputRef.current?.click()}
        className=" upload-resume mx-auto flex w-fit gap-2">
        <UploadCloud className="size-5" />
        Upload Resume
      </Button>
    </>
  );
}
