"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "../../coverletter/RichTextEditor";

export default function LetterBodyForm() {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      {/* <h3 className="text-lg font-medium">Letter Body</h3> */}
      <FormField
        control={form.control}
        name="body"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Letter Body</FormLabel>
            <FormControl>
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Edit your cover letter here..."
                type="cover-letter"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
