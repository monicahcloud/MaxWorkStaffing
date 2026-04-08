"use client";

import { Button } from "@/components/ui/button";
import { deleteFeedbackByInterviewId } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteFeedbackButtonProps {
  interviewId: string;
  clerkId: string;
}

const DeleteFeedbackButton = ({
  interviewId,
  clerkId,
}: DeleteFeedbackButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const result = await deleteFeedbackByInterviewId({
        interviewId,
        clerkId,
      });

      if (!result.success) {
        alert(result.error || "Failed to delete feedback.");
        return;
      }

      router.push("/interview");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting feedback.");
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
      {isDeleting ? "Deleting..." : "Delete Feedback"}
    </Button>
  );
};

export default DeleteFeedbackButton;
