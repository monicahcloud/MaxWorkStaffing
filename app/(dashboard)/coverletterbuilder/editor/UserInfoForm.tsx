// components/form/UserInfoForm.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { FormPhotoInput } from "./FormPhotoInput";
import { FormInput } from "./FormInput";

export default function UserInfoForm({
  selectedTemplate,
}: {
  selectedTemplate: string;
}) {
  useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal Info</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormPhotoInput name="userPhoto" />
        <FormInput name="firstName" label="First Name" />
        <FormInput name="lastName" label="Last Name" />
        <FormInput
          name="jobTitle"
          label="Job Title (if applicable)"
          disabled={selectedTemplate === "Shabach"}
        />
        <FormInput name="userEmail" label="Email" type="email" />
        <FormInput name="userPhone" label="Phone" type="tel" />
        <FormInput name="website" label="Website" type="tel" />
        <div className="col-span-2">
          <FormInput name="userAddress" label="Address" />
        </div>
      </div>
    </div>
  );
}
