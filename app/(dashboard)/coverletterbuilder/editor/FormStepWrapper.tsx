// components/coverletterbuilder/editor/FormStepWrapper.tsx
import React from "react";

interface FormStepWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function FormStepWrapper({
  title,
  description,
  children,
}: FormStepWrapperProps) {
  return (
    <div className="mx-auto max-w-xl space-y-6 py-2">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
          {title}
        </h2>
        <p className="text-sm font-medium text-slate-500">{description}</p>
      </div>
      <hr className="border-slate-200" />
      {children}
    </div>
  );
}
