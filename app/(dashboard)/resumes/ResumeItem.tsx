"use client";

import { ResumeServerData } from "@/lib/types";
import Link from "next/link";
import { formatDate } from "date-fns";
import ResumePreview from "@/components/ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { useRef } from "react";
interface ResumeItemProps {
  resume: ResumeServerData;
}
function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group  relative border rounded-lg border-transparent hover:border-border transition-colors p-3 bg-secondary">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center">
          <p className="font-semibold line-clamp-1">
            {resume.resumeTitle || "No Title"}
          </p>
          {resume.resumeType && (
            <p className=" line-clamp-1 text-xs">{resume.resumeType}</p>
          )}
          {resume.description && (
            <p className="text-xs line-clamp-1">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full">
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="shadow-sm group-hover:shadow-lg transition-shadow overflow-hidden"
            contentRef={contentRef}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </Link>
      </div>
    </div>
  );
}

export default ResumeItem;
