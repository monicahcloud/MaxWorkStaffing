"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertCircle,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  User,
} from "lucide-react";

interface ParsingPreviewModalProps {
  data: any;
  isOpen: boolean;
  onUseRecommended: () => void;
  onChooseTemplate: () => void;
  onCancel: () => void;
  isRedirecting: boolean;
  isFederal?: boolean;
  recommendedTemplate?: string;
}

export function ParsingPreviewModal({
  data,
  isOpen,
  onUseRecommended,
  onChooseTemplate,
  onCancel,
  isRedirecting,
  isFederal = false,
  recommendedTemplate = isFederal ? "Federal" : "Chronological",
}: ParsingPreviewModalProps) {
  if (!data) return null;

  // Normalize parser output so the modal remains stable even when some fields are missing.
  const firstName = data.personalInfo?.firstName || "";
  const lastName = data.personalInfo?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Not detected";

  const email = data.personalInfo?.email || "";
  const phone = data.personalInfo?.phone || "";
  const address = data.personalInfo?.address || "";
  const jobTitle = data.personalInfo?.jobTitle || "";

  // Summary should be treated as a string.
  const summary = typeof data.summary === "string" ? data.summary.trim() : "";

  const workExperience = Array.isArray(data.workExperience)
    ? data.workExperience
    : [];

  const education = Array.isArray(data.education) ? data.education : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  // Build simple warnings so the user can spot weak extraction before opening the editor.
  const warnings: string[] = [];

  if (!email) warnings.push("No email address was detected.");
  if (!phone) warnings.push("No phone number was detected.");
  if (!summary) warnings.push("No professional summary was detected.");
  if (workExperience.length === 0) {
    warnings.push("No work experience entries were detected.");
  }
  if (education.length === 0) {
    warnings.push("No education entries were detected.");
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="h-[90vh] w-[96vw] max-w-none overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090D] p-0 text-white shadow-2xl sm:max-w-[96vw] lg:h-[88vh] lg:w-[1100px] lg:max-w-[1100px]">
        <div className="relative h-full">
          <div className="absolute left-[-80px] top-[-80px] h-56 w-56 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-red-600/15 blur-3xl" />

          <div className="grid h-full min-h-0 lg:grid-cols-[340px_minmax(0,1fr)]">
            <div className="min-h-0 overflow-y-auto border-b border-white/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <DialogHeader className="space-y-4 text-left">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  AI Extraction Complete
                </div>

                <div className="space-y-2">
                  <DialogTitle className="text-3xl font-black uppercase leading-none tracking-tighter">
                    Review what we captured
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-7 text-slate-300">
                    We analyzed your uploaded resume and prepared it for the
                    editor. Review the extracted information and choose how you
                    want to continue.
                  </DialogDescription>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Recommended Template
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    {isFederal ? (
                      <Shield className="h-4 w-4 text-red-300" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-blue-300" />
                    )}
                    <p className="text-xl font-semibold text-white">
                      {recommendedTemplate}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {isFederal
                      ? "Federal mode is enabled, so we recommend sending this resume into the federal template."
                      : "This resume appears to fit best in the recommended template, but you can choose another one before entering the editor."}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Quick Snapshot
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    <p>Name: {fullName}</p>
                    <p>Job Title: {jobTitle || "Not detected"}</p>
                    <p>Skills: {skills.length}</p>
                    <p>Work Entries: {workExperience.length}</p>
                    <p>Education Entries: {education.length}</p>
                  </div>
                </div>

                {warnings.length > 0 && (
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                    <div className="flex items-center gap-2 text-amber-200">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.18em]">
                        Needs Review
                      </p>
                    </div>

                    <ul className="mt-3 space-y-2 text-sm text-amber-100">
                      {warnings.map((warning) => (
                        <li key={warning}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel: extracted content preview */}
            <div className="flex min-h-0 min-w-0 flex-col">
              <div className="min-h-0 min-w-0 flex-1 space-y-6 overflow-y-auto p-6 lg:p-8">
                {/* Identity and contact */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Identity and Contact
                  </h4>

                  <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <User className="mt-0.5 h-4 w-4 text-blue-300" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Full Name
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {fullName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BriefcaseBusiness className="mt-0.5 h-4 w-4 text-blue-300" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Target Job Title
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {jobTitle || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-blue-300" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Email
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {email || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 text-blue-300" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Phone
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {phone || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-blue-300" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400">
                          Address
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {address || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Summary Snapshot
                  </h4>

                  {summary ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm leading-7 text-slate-200">
                        {summary}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
                      No professional summary detected.
                    </div>
                  )}
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Experience Snapshot
                  </h4>

                  {workExperience.length > 0 ? (
                    <div className="space-y-3">
                      {workExperience.slice(0, 3).map((exp: any, i: number) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <p className="text-sm font-semibold text-white">
                            {exp.position || "Untitled Role"}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            {exp.company || "Unknown Company"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {exp.startDate || "—"} - {exp.endDate || "Present"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
                      No work experience detected.
                    </div>
                  )}
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Education Snapshot
                  </h4>

                  {education.length > 0 ? (
                    <div className="space-y-3">
                      {education.slice(0, 2).map((edu: any, i: number) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                          <p className="text-sm font-semibold text-white">
                            {edu.degree || "Degree not detected"}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            {edu.school || "School not detected"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
                      No education entries detected.
                    </div>
                  )}
                </div>
              </div>

              {/* Sticky footer actions */}
              <DialogFooter className="border-t border-white/10 bg-[#08090D] p-4 sm:flex-row sm:justify-end">
                <Button
                  variant="ghost"
                  onClick={onCancel}
                  className="text-[11px] font-bold uppercase text-slate-400">
                  Cancel Upload
                </Button>

                <Button
                  variant="outline"
                  onClick={onChooseTemplate}
                  disabled={isRedirecting}
                  className="border-white/15 bg-transparent text-[11px] font-black uppercase tracking-[0.18em] text-white hover:bg-white/10">
                  Choose Template First
                </Button>

                <Button
                  onClick={onUseRecommended}
                  disabled={isRedirecting}
                  className="bg-blue-600 px-6 py-6 text-[11px] font-black uppercase tracking-[0.18em] hover:bg-blue-700">
                  {isRedirecting
                    ? "Opening Editor..."
                    : "Use Recommended Template"}
                </Button>
              </DialogFooter>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
