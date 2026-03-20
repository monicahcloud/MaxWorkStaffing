"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FontPairs } from "@/lib/resume-theme-registry";
import { COVER_LETTER_THEME_REGISTRY } from "@/lib/cover-letter-theme-registry";
import { cn } from "@/lib/utils";
import { CoverLetterValues } from "@/lib/validation";
import NextImage from "next/image";

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterValues;
  className?: string;
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export default function CoverLetterPreview({
  coverLetterData,
  className,
  contentRef,
}: CoverLetterPreviewProps) {
  const theme = useMemo(
    () =>
      COVER_LETTER_THEME_REGISTRY.find(
        (t) => t.id === coverLetterData.themeId,
      ) || COVER_LETTER_THEME_REGISTRY[0],
    [coverLetterData.themeId],
  );

  const primaryColor = coverLetterData.themeColor || theme.defaultColor;
  const fonts = FontPairs[theme.fontId];

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    const photo = coverLetterData.userPhoto;

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
  }, [coverLetterData.userPhoto]);

  const showPhoto = Boolean(photoSrc && coverLetterData.showPhoto);

  const fullName =
    `${coverLetterData.firstName || ""} ${coverLetterData.lastName || ""}`.trim() ||
    "Your Name";

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contactBlock = (
    <>
      <p>{coverLetterData.userEmail}</p>
      <p>{coverLetterData.userPhone}</p>
      <p>{coverLetterData.userAddress}</p>
    </>
  );

  const recipientBlock = (
    <section className="space-y-1 text-[13px]">
      <p className="mb-3 font-bold text-slate-900">{currentDate}</p>
      <p className="font-bold text-slate-900">
        {coverLetterData.recipientName || "Hiring Manager"}
      </p>
      <p className="font-medium text-slate-700">
        {coverLetterData.companyName}
      </p>
      <p className="italic text-slate-500">{coverLetterData.companyAddress}</p>
    </section>
  );

  const bodyBlock = (
    <article className="prose prose-slate max-w-none">
      <div
        className="whitespace-pre-line text-[14px] leading-relaxed text-slate-800 selection:bg-blue-100"
        dangerouslySetInnerHTML={{ __html: coverLetterData.body || "" }}
      />
    </article>
  );

  const signatureBlock = (
    <footer className=" ">
      <p className="text-sm text-slate-600">Sincerely,</p>
      <div className="flex min-h-16 items-center">
        {coverLetterData.signatureUrl ? (
          <NextImage
            src={coverLetterData.signatureUrl}
            alt="Signature"
            width={160}
            height={64}
            className="h-16 w-auto object-contain mix-blend-multiply"
          />
        ) : (
          <p
            className="font-serif text-2xl italic"
            style={{ color: primaryColor }}>
            {fullName}
          </p>
        )}
      </div>
      <p className="text-md font-bold text-slate-900">{fullName}</p>
    </footer>
  );

  const photoNode = showPhoto ? (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
      {photoSrc && (
        <NextImage
          src={photoSrc}
          alt="Profile"
          fill
          className="rounded-xl object-cover border-2 border-white shadow-sm"
          unoptimized
        />
      )}
    </div>
  ) : null;

  function renderClassicLeft() {
    return (
      <>
        <header
          className="flex items-start justify-between border-b-2 pb-5"
          style={{ borderColor: primaryColor }}>
          <div className="flex items-center gap-6">
            {photoNode}
            <div className="space-y-1">
              <h1
                className="text-4xl font-black uppercase tracking-tighter"
                style={{ color: primaryColor, fontFamily: fonts?.heading }}>
                {fullName}
              </h1>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                {coverLetterData.jobTitle}
              </p>
            </div>
          </div>

          <div className="max-w-40 text-right text-[10px] font-bold uppercase leading-relaxed text-slate-400">
            {contactBlock}
          </div>
        </header>

        {recipientBlock}
        {bodyBlock}
        {signatureBlock}
      </>
    );
  }

  function renderCenteredHeader() {
    return (
      <>
        <header className="space-y-1 border-b pb-4 text-center">
          <div className="mx-auto">{photoNode}</div>

          <div>
            <h1
              className="text-4xl font-black uppercase tracking-tighter"
              style={{ color: primaryColor, fontFamily: fonts?.heading }}>
              {fullName}
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              {coverLetterData.jobTitle}
            </p>
          </div>

          <div className="text-[10px] font-bold uppercase leading-relaxed text-slate-400">
            {contactBlock}
          </div>

          {theme.showDivider ? (
            <div
              className="mx-auto h-1 w-20 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
          ) : null}
        </header>

        {recipientBlock}
        {bodyBlock}
        {signatureBlock}
      </>
    );
  }

  function renderSplitHeader() {
    return (
      <>
        <header className="grid grid-cols-[1fr_auto] items-end gap-8 border-b pb-6">
          <div>
            <p
              className="mb-2 text-xs font-bold uppercase tracking-[0.24em]"
              style={{ color: primaryColor }}>
              Cover Letter
            </p>
            <h1
              className="text-4xl font-black uppercase tracking-tighter"
              style={{ color: primaryColor, fontFamily: fonts?.heading }}>
              {fullName}
            </h1>
            <p className="mt-2 text-sm font-medium text-slate-600">
              {coverLetterData.jobTitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {photoNode}
            <div className="text-right text-[10px] font-bold uppercase leading-relaxed text-slate-400">
              {contactBlock}
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-[220px_1fr] gap-10">
          <div className="space-y-3 rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Recipient
            </p>
            <div className="space-y-1 text-[13px]">
              <p className="font-bold text-slate-900 pb-4">{currentDate}</p>
              <p className="font-bold text-slate-900">
                {coverLetterData.recipientName || "Hiring Manager"}
              </p>
              <p className="font-medium text-slate-700">
                {coverLetterData.companyName}
              </p>
              <p className="italic text-slate-500">
                {coverLetterData.companyAddress}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {bodyBlock}
            {signatureBlock}
          </div>
        </div>
      </>
    );
  }

  function renderMinimal() {
    return (
      <>
        <header className="space-y-3 ">
          <h1
            className="text-3xl font-bold"
            style={{ color: primaryColor, fontFamily: fonts?.heading }}>
            {fullName}
          </h1>
          <p className="text-sm text-slate-500">{coverLetterData.jobTitle}</p>
          <div className="text-xs leading-relaxed text-slate-500">
            {contactBlock}
          </div>
        </header>

        <div className="my-6 h-px bg-slate-200" />

        {recipientBlock}
        {bodyBlock}
        {signatureBlock}
      </>
    );
  }

  function renderExecutive() {
    return (
      <>
        <header
          className="border-l-4 pl-5"
          style={{ borderColor: primaryColor }}>
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <h1
                className="text-4xl font-black uppercase tracking-tight"
                style={{ color: primaryColor, fontFamily: fonts?.heading }}>
                {fullName}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {coverLetterData.jobTitle}
              </p>
            </div>

            <div className="flex items-start gap-4">
              {photoNode}
              <div className="text-right text-[10px] font-bold uppercase leading-relaxed text-slate-400">
                {contactBlock}
              </div>
            </div>
          </div>
        </header>

        {recipientBlock}
        {bodyBlock}
        {signatureBlock}
      </>
    );
  }
  function renderRightHeader() {
    return (
      <>
        <header className="text-right border-b pb-3">
          <h1
            className="text-4xl font-black uppercase"
            style={{ color: primaryColor }}>
            {fullName}
          </h1>
          <p className="text-sm text-slate-500">{coverLetterData.jobTitle}</p>
          <div className="mt-2 text-[11px] text-slate-400">{contactBlock}</div>
        </header>

        {recipientBlock}
        {bodyBlock}
        {signatureBlock}
      </>
    );
  }

  function renderBoxedHeader() {
    return (
      <>
        <header
          className="p-3 rounded-sm text-white"
          style={{ backgroundColor: primaryColor }}>
          <h1 className="text-3xl font-black uppercase">{fullName}</h1>
          <p className="text-sm opacity-90">{coverLetterData.jobTitle}</p>
        </header>

        <div className="mt-6 text-sm text-slate-500">{contactBlock}</div>

        {recipientBlock}
        {bodyBlock}
        {signatureBlock}
      </>
    );
  }
  function renderAccentBar() {
    return (
      <div className="flex">
        <div
          className="w-2 mr-6 rounded-full"
          style={{ backgroundColor: primaryColor }}
        />

        <div className="flex-1 space-y-8">
          <header>
            <h1
              className="text-4xl font-black uppercase"
              style={{ color: primaryColor }}>
              {fullName}
            </h1>
            <p className="text-sm text-slate-500">{coverLetterData.jobTitle}</p>
            <div className="mt-2 text-xs text-slate-400">{contactBlock}</div>
          </header>

          {recipientBlock}
          {bodyBlock}
          {signatureBlock}
        </div>
      </div>
    );
  }
  function renderTwoColumnMinimal() {
    return (
      <div className="grid grid-cols-[200px_1fr] gap-4">
        {/* LEFT SIDEBAR */}
        <aside className="space-y-6">
          {/* Name + Title */}
          <div>
            <h2
              className="text-[25px] font-black uppercase tracking-tight text-slate-900"
              style={{ color: primaryColor, fontFamily: fonts?.heading }}>
              {fullName}
            </h2>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              {coverLetterData.jobTitle}
            </p>
          </div>

          {/* Divider */}
          <div
            className="h-0.5 w-12 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />

          {/* Contact Info */}
          <div className="space-y-1 text-xs text-slate-500 leading-relaxed">
            <div className="text-lg text-slate-700">Contact</div>
            <div className="space-y-1">{contactBlock}</div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="space-y-4">
          {/* Subtle top divider */}
          <div className="border-t border-slate-200 pt-6">{recipientBlock}</div>

          {/* Body */}
          <div className="text-[14px] leading-relaxed text-slate-700">
            {bodyBlock}
          </div>

          {/* Signature */}
          <div className="pt-3 border-t border-slate-100">{signatureBlock}</div>
        </div>
      </div>
    );
  }

  function renderLayout() {
    switch (theme.layout) {
      case "centered-header":
        return renderCenteredHeader();
      case "split-header":
        return renderSplitHeader();
      case "minimal":
        return renderMinimal();
      case "executive":
        return renderExecutive();
      case "right-header":
        return renderRightHeader();
      case "boxed-header":
        return renderBoxedHeader();
      case "accent-bar":
        return renderAccentBar();
      case "two-column-minimal":
        return renderTwoColumnMinimal();
      case "classic-left":
      default:
        return renderClassicLeft();
    }
  }

  return (
    <div
      ref={contentRef}
      className={cn(
        "cover-letter-paper-container relative min-h-[297mm] w-full overflow-hidden bg-white shadow-xl transition-all",
        className,
        theme.spacing === "compact" ? "leading-tight" : "leading-normal",
      )}
      style={
        {
          fontFamily: fonts?.body || "sans-serif",
          "--primary": primaryColor,
        } as React.CSSProperties
      }>
      <div className="space-y-10 p-16">{renderLayout()}</div>
    </div>
  );
}
