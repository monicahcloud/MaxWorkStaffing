"use client";

import { Button } from "@/components/ui/button";
import { deleteInterviewById } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteInterviewButtonProps {
  interviewId: string;
  clerkId: string;
}

const DeleteInterviewButton = ({
  interviewId,
  clerkId,
}: DeleteInterviewButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview and its feedback?",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const result = await deleteInterviewById({
        interviewId,
        clerkId,
      });

      if (!result.success) {
        alert(result.error || "Failed to delete interview.");
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the interview.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="destructive"
      className="rounded-full">
      <Trash2 className="mr-2 h-4 w-4" />
      {isDeleting ? "Deleting..." : "Delete Interview"}
    </Button>
  );
};

export default DeleteInterviewButton;
