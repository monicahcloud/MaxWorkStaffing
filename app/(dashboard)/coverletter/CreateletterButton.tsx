"use client";

import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

export default function CreateLetterButton() {
  return (
    <Button asChild className="mx-auto flex w-fit gap-2">
      <Link href="/coverletterbuilder">
        <PlusSquare className="size-5" />
        Create New Cover Letter
      </Link>
    </Button>
  );
}
