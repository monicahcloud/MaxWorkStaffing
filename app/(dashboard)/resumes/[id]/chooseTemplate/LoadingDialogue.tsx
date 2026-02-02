"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function LoadingModal() {
  return (
    <Dialog open>
      <DialogTitle></DialogTitle>
      <DialogContent className="flex flex-col items-center gap-4 text-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <p className="text-lg font-semibold">Loading your resume...</p>
        <p className="text-sm text-muted-foreground">
          Please wait while we set things up.
        </p>
      </DialogContent>
    </Dialog>
  );
}
