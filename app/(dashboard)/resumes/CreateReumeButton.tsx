"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export default function CreateResumeButton({
  canCreate,
}: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button asChild className="new-resume mx-auto flex w-fit gap-2">
        <Link href="/resumebuilder">
          <PlusSquare className="size-5" />
          Create New Resume
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild className="new-resume mx-auto flex w-fit gap-2">
      <span
        onClick={() => premiumModal.setOpen(true)}
        className="flex items-center gap-2 cursor-pointer">
        <PlusSquare className="size-5" />
        Create New Resume
      </span>
    </Button>
  );
}
