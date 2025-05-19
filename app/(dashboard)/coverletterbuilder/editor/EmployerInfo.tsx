"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EmployerInfoFormProps {
  recipientName: string;
  setRecipientName: (value: string) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
}

export default function EmployerInfoForm({
  recipientName,
  setRecipientName,
  companyName,
  setCompanyName,
}: EmployerInfoFormProps) {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Employer Info</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hiring Manager Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employerAddress"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Employer Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
