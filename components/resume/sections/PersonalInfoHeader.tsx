"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ResumeValues } from "@/lib/validation";
import { ResumeThemeToken } from "@/lib/resume-theme-registry";
import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";
import { cn } from "@/lib/utils";

interface PersonalInfoHeaderProps {
  data: ResumeValues;
  theme: ResumeThemeToken;
  visualStyle: ResumeVisualStyle;
  showPhotoInHeader?: boolean;
}

export default function PersonalInfoHeader({
  data,
  theme,
  visualStyle,
  showPhotoInHeader = true,
}: PersonalInfoHeaderProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    address,
    linkedin,
    website,
    photo,
    showPhoto,
  } = data || {};

  const safeFirstName = firstName?.trim() || "Your";
  const safeLastName = lastName?.trim() || "Name";
  const fullName = `${safeFirstName} ${safeLastName}`.trim();
  const safeJobTitle = jobTitle?.trim() || "Professional Title";

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) {
      setPhotoSrc(null);
      return;
    }

    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPhotoSrc(photo);
  }, [photo]);

  if (!data) {
    return <div className="mb-6 h-28 w-full" />;
  }

  const shouldShowPhoto =
    showPhotoInHeader &&
    visualStyle.photoStyle !== "hidden" &&
    Boolean(showPhoto && photoSrc);

  const photoSizeClass =
    visualStyle.headerStyle === "centered"
      ? "h-28 w-28"
      : theme.layout === "minimal"
        ? "h-[72px] w-[72px]"
        : visualStyle.headerStyle === "band"
          ? "h-20 w-20"
          : "h-24 w-24";

  const photoShapeClass =
    visualStyle.photoStyle === "circle" ? "rounded-full" : "rounded-2xl";

  const photoNode = shouldShowPhoto ? (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border border-slate-200 bg-slate-100 shadow-sm",
        photoSizeClass,
        photoShapeClass,
      )}>
      <Image
        src={photoSrc!}
        alt={`${fullName} profile photo`}
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  ) : null;

  const nameNode =
    visualStyle.nameStyle === "stacked" ? (
      <h1
        className="text-4xl font-black uppercase tracking-tighter"
        style={{ color: "var(--primary)" }}>
        <span className="block">{safeFirstName}</span>
        <span className="block">{safeLastName}</span>
      </h1>
    ) : (
      <h1
        className="text-4xl font-black uppercase tracking-tighter"
        style={{ color: "var(--primary)" }}>
        {fullName}
      </h1>
    );

  const jobTitleClass = cn(
    "uppercase",
    visualStyle.jobTitleStyle === "accented" &&
      "text-sm font-black tracking-[0.22em] text-[var(--primary)]",
    visualStyle.jobTitleStyle === "strong" &&
      "text-base font-bold tracking-[0.18em] text-slate-500",
    visualStyle.jobTitleStyle === "subtle" &&
      "text-xs font-semibold tracking-[0.16em] text-slate-400",
  );

  const jobTitleNode = <p className={jobTitleClass}>{safeJobTitle}</p>;

  const contactItems = [address, phone, email, linkedin, website].filter(
    Boolean,
  );

  const inlineContactBlock = (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-slate-400">
      {contactItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );

  const centeredContactBlock = (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-400">
      {contactItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );

  const stackedContactBlock = (
    <div className="space-y-1 text-right text-xs font-semibold text-slate-400">
      {address && <div>{address}</div>}
      {phone && <div>{phone}</div>}
      {email && <div>{email}</div>}
      {linkedin && <div>{linkedin}</div>}
      {website && <div>{website}</div>}
    </div>
  );

  if (visualStyle.headerStyle === "centered") {
    return (
      <div className="space-y-3 text-center">
        {shouldShowPhoto ? (
          <div className="flex justify-center">{photoNode}</div>
        ) : null}

        {nameNode}
        {jobTitleNode}
        {centeredContactBlock}
      </div>
    );
  }

  if (visualStyle.headerStyle === "band") {
    return (
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            {photoNode}

            <div className="min-w-0">
              {nameNode}
              <div className="mt-2">{jobTitleNode}</div>
            </div>
          </div>

          {visualStyle.contactStyle === "stacked" ? (
            stackedContactBlock
          ) : (
            <div className="flex max-w-[260px] flex-wrap justify-end gap-x-4 gap-y-1 text-right text-xs font-semibold text-slate-400">
              {contactItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (visualStyle.headerStyle === "split") {
    return (
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {photoNode}

          <div className="min-w-0 space-y-2">
            {nameNode}
            {jobTitleNode}
          </div>
        </div>
        {stackedContactBlock}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        {photoNode}

        <div className="min-w-0 space-y-2">
          {nameNode}
          {jobTitleNode}
        </div>
      </div>
      {inlineContactBlock}
    </div>
  );
}
