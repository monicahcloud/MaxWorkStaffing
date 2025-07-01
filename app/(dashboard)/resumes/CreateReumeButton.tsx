"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function CreateResumeButton() {
  return (
    <Button asChild className="new-resume mx-auto flex w-fit gap-2">
      <Link href="/resumebuilder">
        <PlusSquare className="size-5" />
        Create New Resume
      </Link>
    </Button>
  );
}
