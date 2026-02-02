"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
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

interface DeleteProps {
  id: string;
  title: string;
  onDelete: (id: string) => Promise<void>;
}

export default function DeleteDocumentButton({
  id,
  title,
  onDelete,
}: DeleteProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await onDelete(id);
        toast.success("Deleted permanently");
      } catch (error) {
        toast.error("Deletion failed");
      }
    });
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowDialog(true);
        }}
        className="absolute -top-2 -right-2 z-50 p-2.5 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full border border-slate-100 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
        title="Delete Document">
        <Trash2 className="size-4" />
      </button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="rounded-4xl border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black uppercase tracking-tighter text-xl text-slate-900">
              Confirm Permanent Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs font-medium text-slate-500 uppercase italic">
              You are about to permanently remove "{title || "Untitled"}". This
              will free up space in your subscription limit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl font-bold text-[10px] uppercase border-slate-200">
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-xl bg-red-600 hover:bg-red-700 font-black text-[10px] uppercase text-white shadow-lg shadow-red-900/20">
              {isPending ? (
                <Loader2 className="animate-spin size-3" />
              ) : (
                "Delete Forever"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
