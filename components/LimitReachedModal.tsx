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

export function LimitReachedModal({
  isOpen,
  onClose,
  title = "Limit Reached",
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-[2.5rem] border-none p-8">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className="size-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <AlertDialogTitle className="text-2xl font-black uppercase tracking-tighter">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 font-medium italic">
            You've maximized your current plan's interview sessions. Upgrade to
            Quarterly for the best value and unlimited mock practice.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col gap-2 mt-6">
          <AlertDialogAction className="w-full bg-slate-900 text-white rounded-2xl py-6 font-black uppercase tracking-widest hover:bg-blue-600">
            View Upgrade Options
          </AlertDialogAction>
          <AlertDialogCancel className="w-full border-none text-slate-400 font-bold uppercase text-[10px]">
            Maybe Later
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
