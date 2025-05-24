// components/form/FormInput.tsx
"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export function FormInput({
  name,
  label,
  type = "text",
  disabled = false,
  readOnly = false, // Add default
}: {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  readOnly?: boolean; // ✅ Accept readOnly
}) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              disabled={disabled}
              readOnly={readOnly} // ✅ Apply readOnly here
              autoFocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
