"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ParsingPreviewModalProps {
  data: any;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isRedirecting: boolean;
}

export function ParsingPreviewModal({
  data,
  isOpen,
  onConfirm,
  onCancel,
  isRedirecting,
}: ParsingPreviewModalProps) {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-2xl border-none shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <CheckCircle2 className="size-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              AI Extraction Complete
            </span>
          </div>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
            Review Parsed Data
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-slate-500 uppercase italic">
            Verify the information extracted from your document before entering
            the editor.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[50vh] overflow-y-auto space-y-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
          <div className="space-y-2">
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
              Identity & Contact
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">
                  Full Name
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {data.personalInfo?.firstName}{" "}
                  {data.personalInfo?.lastName || "—"}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase">
                  Target Job Title
                </p>
                <p className="text-sm font-bold text-blue-600">
                  {data.personalInfo?.jobTitle || "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">
              Experience Snapshot
            </h4>
            <div className="space-y-2">
              {data.workExperience?.length > 0 ? (
                data.workExperience.slice(0, 2).map((exp: any, i: number) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {exp.position}
                      </p>
                      <p className="text-[10px] font-medium text-slate-500 uppercase">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-700">
                  <AlertCircle className="size-4" />
                  <p className="text-[10px] font-bold uppercase">
                    No work experience detected
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="font-bold text-[11px] uppercase text-slate-400">
            Discard
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isRedirecting}
            className="grow bg-blue-600 hover:bg-blue-700 font-black uppercase text-[11px] tracking-widest py-6">
            {isRedirecting ? "Syncing..." : "Confirm & Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
