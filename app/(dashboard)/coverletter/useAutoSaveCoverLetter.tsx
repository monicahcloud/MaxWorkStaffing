"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { CoverLetterValues } from "@/lib/validation";
import { toast } from "sonner";
import { fileReplacer } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { saveCoverLetter } from "./action";

// Utility to omit the userPhoto (File) field before cloning or comparing
// function omitFileField<T extends { userPhoto?: unknown }>(
//   obj: T
// ): Omit<T, "userPhoto"> {
//   const { userPhoto, ...rest } = obj;
//   return rest;
// }

export default function useAutoSaveCoverLetter(
  coverletterData: CoverLetterValues
) {
  const searchParams = useSearchParams();
  const [coverletterId, setCoverletterId] = useState(coverletterData.id);
  const debounced = useDebounce(coverletterData, 1500);
  // This lastSavedWithFile includes the userPhoto key for comparison
  // const [lastSavedWithFile, setLastSavedWithFile] = useState(coverletterData);
  // This lastSaved omits userPhoto for safe cloning/comparison
  const [lastSaved, setLastSaved] = useState(structuredClone(coverletterData));
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debounced]);
  console.log("Saving cover letter:", coverletterData);
  // Or wherever you call your save function
  // useEffect(() => {
  //   if (coverletterData.id && coverletterData.id !== coverletterId) {
  //     setCoverletterId(coverletterData.id);
  //   }
  // }, [coverletterData.id, coverletterId]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);
        // Log debounced data before saving
        console.log("Saving cover letter. Debounced data:", debounced);

        // Omit file for save/clone
        const newData = structuredClone(debounced);
        console.log("newData (no userPhoto):", newData);

        // Only send userPhoto if it actually changed
        // const userPhotoChanged =
        //   JSON.stringify(lastSavedWithFile.userPhoto, fileReplacer) !==
        //   JSON.stringify(debounced.userPhoto, fileReplacer);
        // console.log("userPhotoChanged:", userPhotoChanged);
        const updateCoverLetter = await saveCoverLetter({
          // ...debounced,
          ...newData,
          ...(JSON.stringify(lastSaved.userPhoto, fileReplacer) ===
            JSON.stringify(newData.userPhoto, fileReplacer) && {
            userPhoto: undefined,
          }),
          // ...(userPhotoChanged ? {} : { userPhoto: undefined }),
          id: coverletterId,
        });
        setCoverletterId(updateCoverLetter.id);
        setLastSaved(newData);

        if (searchParams.get("coverletterId") !== updateCoverLetter.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("coverletterId", updateCoverLetter.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error("Autosave failed:", error);

        toast.error("Could not save changes", {
          description: () => (
            <div className="space-y-3">
              <p>We couldn&apos;t save your changes. Please try again.</p>
              <Button
                variant="secondary"
                onClick={() => {
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
    // eslint-disable-next-line
  }, [debounced, isSaving, lastSaved, isError, coverletterId, searchParams]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(coverletterData) !== JSON.stringify(lastSaved),
  };
}
