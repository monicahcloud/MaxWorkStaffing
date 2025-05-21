import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { CoverLetterValues } from "@/lib/validation";
import { toast } from "sonner";
// coverletter/useAutoSaveCoverLetter.ts
async function saveCoverLetterViaApi(
  values: CoverLetterValues
): Promise<CoverLetterValues> {
  const res = await fetch("/api/cover-letter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) throw new Error("Failed to save");

  return res.json();
}

export default function useAutoSaveCoverLetter(values: CoverLetterValues) {
  const [id, setId] = useState(values.id);
  const debounced = useDebounce(values, 1500);
  const [lastSaved, setLastSaved] = useState(structuredClone(values));
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (
      JSON.stringify(debounced) === JSON.stringify(lastSaved) ||
      isSaving ||
      isError
    )
      return;

    const save = async () => {
      setIsSaving(true);
      setIsError(false);

      try {
        const result = await saveCoverLetterViaApi({ ...debounced, id });

        setId(result.id);
        setLastSaved(debounced);

        toast.success("Cover letter saved");
      } catch (err) {
        console.error("Autosave failed:", err);
        setIsError(true);

        toast.error("Failed to save cover letter", {
          description: "Your recent changes were not saved.",
        });
      } finally {
        setIsSaving(false);
      }
    };

    save();
  }, [debounced]);

  return {
    isSaving,
    hasUnsavedChanges: JSON.stringify(values) !== JSON.stringify(lastSaved),
  };
}
