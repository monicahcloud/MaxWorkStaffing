import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const [resumeId, setResumeId] = useState(resumeData.id);
  const debounceResumeData = useDebounce(resumeData, 1500);

  const [lastSaveData, setLastSavedData] = useState(
    structuredClone(resumeData)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debounceResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debounceResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(lastSaveData.photo?.toString() === newData.photo?.toString() && {
            photo: undefined,
          }),
          id: resumeId,
        });
        setResumeId(updatedResume.id);
        setLastSavedData(newData);
        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);

        toast.error("Could not save changes", {
          description: (
            <div className="space-y-3">
              <p>Could not save changes.</p>
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

    // console.log(
    //   "debouncedResumeData",
    //   JSON.stringify(debounceResumeData, fileReplacer)
    // );
    // console.log("lastSavedData", JSON.stringify(lastSaveData, fileReplacer));

    const hasUnsavedChanges =
      JSON.stringify(debounceResumeData) !== JSON.stringify(lastSaveData);

    if (hasUnsavedChanges && debounceResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debounceResumeData,
    isSaving,
    lastSaveData,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSaveData),
  };
}
