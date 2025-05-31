"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useResume } from "@/hooks/useResume";
import SectionTitle from "@/components/SectionTitle";
import { resumeTemplates } from "@/app/(dashboard)/resumebuilder/ResumeTemplate";
import ResumeTemplateCard from "@/app/(dashboard)/resumebuilder/ResumeTemplateCard";

const ChooseTemplatePDF = () => {
  const params = useParams();
  const idParam = params.id;
  const resumeId = Array.isArray(idParam) ? idParam[0] : idParam;

  if (!resumeId) return <p>Invalid resume ID.</p>;
  const { data: resume, isLoading, error } = useResume(resumeId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !resume) return <p>Error loading resume.</p>;

  return (
    <div>
      <SectionTitle
        text="Choose a Template for:"
        subtext={`${resume.resumeTitle || "Untitled"}`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
        {resumeTemplates.map((template) => (
          <ResumeTemplateCard
            key={template.resumeType}
            template={template}
            resumeId={resumeId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseTemplatePDF;
