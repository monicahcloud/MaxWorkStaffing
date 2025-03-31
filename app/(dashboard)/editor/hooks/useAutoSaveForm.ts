import { useEffect } from "react";
import { UseFormReturn, FieldValues, DeepPartial } from "react-hook-form";
import { debounce } from "lodash";

/**
 * Auto-saves form values to local state (or backend later) with debounce.
 *
 * @param form The react-hook-form instance
 * @param setState Local state update function (e.g., setResumeData)
 * @param delay Debounce time in milliseconds (default: 500ms)
 */
export function useAutoSaveForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  setState: React.Dispatch<React.SetStateAction<DeepPartial<T>>>,
  delay = 500
) {
  useEffect(() => {
    const debouncedUpdate = debounce((values: DeepPartial<T>) => {
      setState((prev) => ({ ...prev, ...values }));
    }, delay);

    const subscription = form.watch((values) => {
      debouncedUpdate(values);
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel(); // cleanup
    };
  }, [form, setState, delay]);
}
