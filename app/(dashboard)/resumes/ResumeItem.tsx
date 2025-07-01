"use client";

import { ResumeServerData } from "@/lib/types";
import Link from "next/link";
import { formatDate } from "date-fns";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { useRef, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  FilePen,
  MoreVertical,
  Printer,
  Trash2,
} from "lucide-react";
import { deleteResume } from "./action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import ShareResume from "@/components/ReactShareButton";
import ShareButton from "@/app/share/ShareButton";
import { SubscriptionLevel } from "@/lib/subscription";

interface ResumeItemProps {
  resume: ResumeServerData;
  subscriptionLevel: SubscriptionLevel;
}

function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.resumeTitle || "Resume",
  });

  const wasUpdated = resume.updatedAt !== resume.createdAt;
  const isUploaded = resume.isUploaded && resume.uploadedFileUrl;
  const fileExt = resume.uploadedFileUrl?.split(".").pop()?.toLowerCase();
  const isPDF = fileExt === "pdf";

  return (
    <TooltipProvider>
      <div className="group relative border rounded-lg hover:border-border transition-colors p-3 bg-secondary space-y-3">
        {/* Title + Tooltip on hover */}
        <div className="text-left space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="font-semibold line-clamp-1 cursor-default">
                {resume.resumeTitle || "Untitled"}
              </p>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{resume.isUploaded ? "Uploaded Resume" : "Created Resume"}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-xs text-muted-foreground">
            {resume.isUploaded
              ? "Uploaded"
              : wasUpdated
              ? "Updated"
              : "Created"}{" "}
            on {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </div>

        {/* Preview Area */}
        <div>
          {isUploaded ? (
            <div className="space-y-2">
              {isPDF ? (
                <iframe
                  src={`${resume.uploadedFileUrl}#toolbar=0&view=fitH`}
                  title="PDF Preview"
                  className="w-full h-[216px] border rounded shadow-sm"
                />
              ) : (
                <div className="w-full h-[216px] flex items-center justify-center text-xs text-muted-foreground border rounded">
                  No preview available
                </div>
              )}

              <Link href={`/resumes/${resume.id}/chooseTemplate`}>
                <Button variant="outline" className="w-full">
                  Choose Template
                </Button>
              </Link>
            </div>
          ) : (
            <Link
              href={`/editor?resumeId=${resume.id}`}
              className="relative inline-block w-full">
              <ResumePreview
                resumeData={mapToResumeValues(resume)}
                className="h-[216px] shadow-sm group-hover:shadow-lg transition-shadow overflow-hidden"
                contentRef={contentRef}
              />
            </Link>
          )}
        </div>

        {/* More Menu Actions */}
        <MoreMenu
          resume={resume}
          isUploaded={!!resume.isUploaded}
          isPDF={isPDF}
          onPrintClick={() => reactToPrintFn?.()}
          contentRef={contentRef}
        />
      </div>
    </TooltipProvider>
  );
}

export default ResumeItem;

interface MoreMenuProps {
  resume: ResumeServerData;
  isUploaded: boolean;
  isPDF: boolean;
  onPrintClick: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

function MoreMenu({ resume, isUploaded, onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const router = useRouter();

  function handleEdit() {
    router.push(`/editor?resumeId=${resume.id}`);
  }
  function handleView() {
    router.push(`/resumes/${resume.id}`);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isUploaded && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/resumes/${resume.id}/chooseTemplate`}>
                  <span className="flex items-center gap-2">
                    <FilePen className="size-4" />
                    Choose Template
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href={resume.uploadedFileUrl!}
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
                    <Eye className="size-4" />
                    View
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href={resume.uploadedFileUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  download>
                  <span className="flex items-center gap-2">
                    <Printer className="size-4" />
                    Print
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href={resume.uploadedFileUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  download>
                  <span className="flex items-center gap-2">
                    <Download className="size-4" />
                    Download
                  </span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {!isUploaded && (
            <>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={handleEdit}>
                <FilePen className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={handleView}>
                <FilePen className="size-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={onPrintClick}>
                <Printer className="size-4" />
                Print
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPrintClick()}>
                <Download className="size-4" />
                Download
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive"
            onClick={() => setShowDeleteConfirmation(true)}>
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isUploaded ? (
        <ShareResume resumeUrl={resume.uploadedFileUrl!} />
      ) : (
        <ShareButton type="resume" id={resume.id} />
      )}

      <DeleteConfirmationDialog
        resumeId={resume.id}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}>
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
