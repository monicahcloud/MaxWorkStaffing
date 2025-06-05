// Enable client-side rendering for this component (required for hooks like useRef)
"use client";

import { useRef } from "react"; // React hook to persist a reference to the hidden file input element
import { Button } from "@/components/ui/button"; // Reusable button component styled with your design system
import { UploadCloud } from "lucide-react"; // Icon from Lucide used to visually represent upload action
import { toast } from "sonner"; // Notification library used to show success or error messages

// Component definition — expects a function `setUpdateResumes` as a prop
// This function is called after a successful upload to trigger a refresh or update in parent
export default function UploadResumeButton(setUpdateResumes) {
  // Create a ref to access the hidden file input element in the DOM
  const inputRef = useRef<HTMLInputElement>(null);

  // Handler for when a file is selected from the input
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the first selected file
    const file = e.target.files?.[0];
    if (!file) return; // If no file is selected, exit early

    // Prepare a FormData object to send the file to the server
    const formData = new FormData();
    formData.append("file", file); // Append the selected file under the key 'file'

    try {
      // Send a POST request to the API endpoint responsible for resume upload
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      // If the request was successful, show success toast and notify parent to refresh resumes
      if (res.ok) {
        toast.success("Resume uploaded successfully!");
        setUpdateResumes(true); // Notify parent component to re-fetch the resumes
      } else {
        // Handle failed response with a toast error
        toast.error("Upload failed. Please try again.");
      }
    } catch {
      // Catch any unexpected runtime/network errors and show a toast
      toast.error("Unexpected error occurred.");
    }

    // Reset file input to allow re-uploading the same file if needed
    e.target.value = "";
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

      {/* Styled button that, when clicked, opens the file picker by programmatically clicking the hidden input */}
      <Button
        onClick={() => inputRef.current?.click()} // Trigger file input click when button is clicked
        className="upload-resume mx-auto flex w-fit gap-2">
        <UploadCloud className="size-5" /> {/* Upload icon */}
        Upload Resume
      </Button>
    </>
  );
}
