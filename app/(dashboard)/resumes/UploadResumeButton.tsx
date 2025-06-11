"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react"; //
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UploadResumeButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first selected file
    const file = e.target.files?.[0];
    if (!file) return; // If no file is selected, exit early

    // Prepare a FormData object to send the file to the server
    const formData = new FormData();
    formData.append("file", file); // Append the selected file under the key 'file'
    setIsUploading(true); // Show loading spinner immediately
    try {
      // Send a POST request to the API endpoint responsible for resume upload
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      // If the request was successful, show success toast and notify parent to refresh resumes
      if (res.ok) {
        toast.success("Resume uploaded successfully!");
        // ✅ Refresh resumes list without full page reload
        // startTransition(() => {
        router.refresh(); // Refresh the page
        // });
      } else {
        // Handle failed response with a toast error
        toast.error("Upload failed. Please try again.");
      }
    } catch {
      toast.error("Unexpected error occurred.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };
  return (
    <>
      {/* Hidden file input for accepting .pdf, .doc, or .docx files only */}
      <input
        ref={inputRef} // Associate this element with the useRef hook
        type="file"
        accept=".pdf,.doc,.docx" // Restrict file types
        onChange={handleFileChange} // Trigger upload when a file is selected
        className="hidden" // Hidden from view; shown indirectly via button click
      />

      <Button
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="upload-resume mx-auto flex w-fit gap-2">
        {isUploading ? (
          <>
            <span className="animate-spin rounded-full border-2 border-white border-t-transparent size-4"></span>
            Uploading...
          </>
        ) : (
          <>
            <UploadCloud className="size-5" />
            Upload Resume
          </>
        )}
      </Button>
    </>
  );
}
