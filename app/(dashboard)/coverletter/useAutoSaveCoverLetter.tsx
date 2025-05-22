"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { CoverLetterValues } from "@/lib/validation";
import { toast } from "sonner";
import { fileReplacer } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { saveCoverLetter } from "./action";

export default function useAutoSaveCoverLetter(
  coverletterData: CoverLetterValues
) {
  const searchParams = useSearchParams();
  const [coverletterId, setCoverletterId] = useState(coverletterData.id);
  const debounced = useDebounce(coverletterData, 1500);
  const [lastSaved, setLastSaved] = useState(structuredClone(coverletterData));
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debounced]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debounced);

        const updateCoverLetter = await saveCoverLetter({
          ...newData,
          ...(JSON.stringify(lastSaved.userPhoto, fileReplacer) ===
            JSON.stringify(newData.userPhoto, fileReplacer) && {
            userPhoto: undefined,
          }),
          id: coverletterId,
        });

        setCoverletterId(updateCoverLetter.id);
        setLastSaved(newData);

        const currentId = searchParams.get("coverletterId");
        if (currentId !== updateCoverLetter.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("coverletterId", updateCoverLetter.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }

        toast.success("Cover letter saved");
      } catch (error) {
        console.error("Autosave failed:", error);
        setIsError(true);

        toast.error("Could not save changes", {
          description: () => (
            <div className="space-y-3">
              <p>We couldn’t save your changes. Please try again.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  toast.dismiss();
                  save();
                }}>
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debounced, fileReplacer) !==
      JSON.stringify(lastSaved, fileReplacer);

    if (hasUnsavedChanges && debounced && !isSaving && !isError) {
      save();
    }
  }, [debounced, isSaving, lastSaved, isError, coverletterId, searchParams]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(coverletterData, fileReplacer) !==
      JSON.stringify(lastSaved, fileReplacer),
  };
}
