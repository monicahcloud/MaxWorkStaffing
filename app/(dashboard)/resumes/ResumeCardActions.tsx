"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Trash2, Loader2 } from "lucide-react";
import { deleteResume } from "./action";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ResumeCardActions({
  resumeId,
  resumeTitle,
}: {
  resumeId: string;
  resumeTitle: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        toast.success("Document deleted permanently");
      } catch (error) {
        toast.error("Could not delete resume");
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteDialog(true)}
        className="p-2.5 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full border border-slate-100 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 flex items-center justify-center">
        <Trash2 className="size-4" />
      </button>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-4xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black uppercase tracking-tighter text-xl">
              Permanently Delete?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs font-medium text-slate-500 uppercase italic">
              You are about to delete "{resumeTitle || "Untitled"}". This action
              cannot be undone and will remove all associated data and photos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl font-bold text-[10px] uppercase border-slate-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-xl bg-red-600 hover:bg-red-700 font-black text-[10px] uppercase text-white shadow-lg shadow-red-900/20">
              {isPending ? (
                <Loader2 className="animate-spin size-3" />
              ) : (
                "Delete Resume"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
