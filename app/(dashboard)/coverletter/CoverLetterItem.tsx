// "use client";

// import { CoverLetterServerData } from "@/lib/types";
// import Link from "next/link";
// import CoverLetterPreview from "./CoverLetterPreview";
// import { formatDate } from "date-fns";
// import { mapToCoverLetterValues } from "@/lib/utils";
// import { useRef, useState, useTransition } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//   Download,
//   FilePen,
//   MoreVertical,
//   Printer,
//   Eye,
//   Trash2,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import LoadingButton from "@/components/LoadingButton";
// import { toast } from "sonner";
// import { useReactToPrint } from "react-to-print";
// import { useRouter } from "next/navigation";
// import { deleteCoverLetter } from "../coverletterbuilder/editor/actions";

// import { hasProAccess, SubscriptionLevel } from "@/lib/subscription";
// import usePremiumModal from "@/hooks/usePremiumModal";
// // import RedirectToBilling from "../billing/RedirectToBilling";

// interface CoverLetterProps {
//   coverletter: CoverLetterServerData;
//   subscriptionLevel: SubscriptionLevel;
// }

// export default function CoverLetterItem({
//   coverletter,
//   subscriptionLevel,
// }: CoverLetterProps) {
//   const contentRef = useRef<HTMLDivElement>(null);

//   const reactToPrintFn = useReactToPrint({
//     contentRef,
//     documentTitle: coverletter.companyName || "Cover Letter",
//   });
//   const wasUpdated = coverletter.updatedAt !== coverletter.createdAt;

//   return (
//     <div className="group relative border rounded-lg hover:border-border transition-colors p-3 bg-secondary space-y-3">
//       <div className="space-y-1 text-left">
//         <div>
//           <p className="font-semibold line-clamp-1 cursor-default">
//             {coverletter.companyName || "Untitled"}
//           </p>
//           <p className="text-xs text-muted-foreground">
//             {wasUpdated ? "Updated" : "Created"} on
//             {formatDate(coverletter.updatedAt, "MMM d, yyyy ")}
//           </p>
//         </div>
//         <div>
//           <Link
//             href={`/coverletterbuilder/editor?coverLetterId=${coverletter.id}`}
//             className="relative inline-block w-full">
//             <CoverLetterPreview
//               coverLetterData={mapToCoverLetterValues(coverletter)}
//               contentRef={contentRef}
//               className="h-54 shadow-sm group-hover:shadow-lg transition-shadow overflow-hidden"
//             />
//           </Link>
//         </div>
//         <div className="absolute inset-x-0 bottom-0 16 bg-linear-to-t from-white to-transparent" />
//       </div>
//       {/* More Menu Actions */}
//       <MoreMenu
//         coverletter={coverletter}
//         onPrintClick={() => reactToPrintFn?.()}
//         contentRef={contentRef}
//         subscriptionLevel={subscriptionLevel}
//       />
//     </div>
//   );
// }
// interface MoreMenuProps {
//   coverletter: CoverLetterServerData;
//   onPrintClick: () => void;
//   contentRef: React.RefObject<HTMLDivElement | null>;
//   subscriptionLevel: SubscriptionLevel;
// }

// function MoreMenu({
//   coverletter,
//   onPrintClick,
//   subscriptionLevel,
// }: MoreMenuProps) {
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   // const [showRedirect, setShowRedirect] = useState(false);
//   const router = useRouter();
//   const canAccessPremium = hasProAccess(subscriptionLevel);
//   const { setOpen } = usePremiumModal();
//   // if (showRedirect && !canAccessPremium) return <RedirectToBilling />;

//   function handleEdit() {
//     router.push(`/coverletterbuilder/editor?coverLetterId=${coverletter.id}`);
//   }
//   function handleView() {
//     router.push(`/coverletter/preview/${coverletter.id}`);
//   }
//   function handlePremiumAction(callback: () => void) {
//     if (canAccessPremium) {
//       callback();
//     } else {
//       setOpen(true); // 👈 opens the modal instead of redirecting
//     }
//   }
//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100">
//             <MoreVertical className="size-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <>
//             <DropdownMenuItem
//               className="flex items-center gap-2"
//               onClick={handleEdit}>
//               <FilePen className="size-4" />
//               Edit
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="flex items-center gap-2"
//               onClick={handleView}>
//               <Eye className="size-4" />
//               View
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className="flex items-center gap-2"
//               onClick={() => handlePremiumAction(() => onPrintClick())}>
//               <Printer className="size-4" />
//               Print
//             </DropdownMenuItem>
//             <DropdownMenuItem
//               onClick={() => handlePremiumAction(() => onPrintClick())}>
//               <Download className="size-4" />
//               Download
//             </DropdownMenuItem>
//           </>

//           <DropdownMenuItem
//             className="flex items-center gap-2 text-destructive"
//             onClick={() => setShowDeleteConfirmation(true)}>
//             <Trash2 className="size-4" />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <DeleteConfirmationDialog
//         coverletterId={coverletter.id}
//         open={showDeleteConfirmation}
//         onOpenChange={setShowDeleteConfirmation}
//       />
//     </>
//   );
// }

// interface DeleteConfirmationDialogProps {
//   coverletterId: string;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// function DeleteConfirmationDialog({
//   coverletterId,
//   open,
//   onOpenChange,
// }: DeleteConfirmationDialogProps) {
//   const [isPending, startTransition] = useTransition();

//   async function handleDelete() {
//     startTransition(async () => {
//       try {
//         await deleteCoverLetter(coverletterId);
//         onOpenChange(false);
//       } catch (error) {
//         console.error(error);
//         toast.error("Something went wrong. Please try again.");
//       }
//     });
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Delete Coverletter?</DialogTitle>
//           <DialogDescription>
//             This will permanently delete this coverletter. This action cannot be
//             undone.
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <LoadingButton
//             variant="destructive"
//             onClick={handleDelete}
//             loading={isPending}>
//             Delete
//           </LoadingButton>
//           <Button variant="secondary" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
