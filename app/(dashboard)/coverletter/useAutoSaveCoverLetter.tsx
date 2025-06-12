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
  console.log("Saving cover letter:", coverletterData);
  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        console.log("Saving cover letter. Debounced data:", debounced);

        const newData = structuredClone(debounced);
        console.log("newData (no userPhoto):", newData);

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

        if (searchParams.get("coverLetterId") !== updateCoverLetter.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("coverLetterId", updateCoverLetter.id);
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
              <Button variant="secondary" onClick={() => save()}>
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
      JSON.stringify(coverletterData) !== JSON.stringify(lastSaved),
  };
}
