"use client";

import React, { useMemo } from "react";
import {
  THEME_REGISTRY,
  ColorPalettes,
  FontPairs,
} from "@/lib/resume-theme-registry";
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
  // 1. Identify active theme based on user selection
  const theme = useMemo(
    () =>
      THEME_REGISTRY.find((t) => t.id === coverLetterData.themeId) ||
      THEME_REGISTRY[0],
    [coverLetterData.themeId]
  );

  const palette = ColorPalettes[theme.paletteId as keyof typeof ColorPalettes];
  const fonts = FontPairs[theme.fontId as keyof typeof FontPairs];

  // 2. Determine if photo should be visible
  // const showPhoto = coverLetterData.userPhotoUrl && coverLetterData.showPhoto;
  // NEW: Logic to handle both saved URLs and unsaved local Files
  const photoSrc = useMemo(() => {
    const photo = coverLetterData.userPhoto; // This matches your CoverLetterValues type
    if (!photo) return null;

    // If it's a File object (newly uploaded but not saved), create a local URL
    if (photo instanceof File) {
      return URL.createObjectURL(photo);
    }

    // If it's already a string (URL from database or userPhotoUrl)
    return photo;
  }, [coverLetterData.userPhoto]);

  // Use photoSrc instead of coverLetterData.userPhotoUrl
  const showPhoto = photoSrc && coverLetterData.showPhoto;
  return (
    <div
      ref={contentRef}
      className={cn(
        "cover-letter-paper-container",
        "relative w-full bg-white transition-all min-h-[297mm] shadow-xl overflow-hidden",
        className,
        theme.spacing === "compact" ? "leading-tight" : "leading-normal"
      )}
      style={
        {
          fontFamily: fonts?.body || "sans-serif",
          "--primary": coverLetterData.themeColor || palette?.primary || "#000",
        } as React.CSSProperties
      }>
      <div className="p-16 space-y-10">
        {/* --- DYNAMIC HEADER WITH PHOTO TOGGLE --- */}
        <header
          className="flex justify-between items-start border-b-2 pb-8 transition-all duration-500"
          style={{ borderColor: "var(--primary)" }}>
          <div className="flex items-center">
            {/* Smooth transition for photo appearing/disappearing */}
            <div
              className={cn(
                "relative shrink-0 overflow-hidden transition-all duration-500 ease-in-out",
                showPhoto ? "size-24 opacity-100 mr-6" : "size-0 opacity-0 mr-0"
              )}>
              {photoSrc && (
                <NextImage
                  src={photoSrc}
                  alt="Profile"
                  fill
                  className="object-cover rounded-xl border-2 border-white shadow-sm"
                  unoptimized // Critical for blob: URLs
                />
              )}
            </div>

            <div className="space-y-1">
              <h1
                className="text-4xl font-black uppercase tracking-tighter transition-colors duration-300"
                style={{ color: "var(--primary)" }}>
                {coverLetterData.firstName} {coverLetterData.lastName}
              </h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
                {coverLetterData.jobTitle}
              </p>
            </div>
          </div>

          <div className="text-[10px] text-right font-bold uppercase text-slate-400 leading-relaxed">
            <p>{coverLetterData.userEmail}</p>
            <p>{coverLetterData.userPhone}</p>
            <p className="max-w-37.5">{coverLetterData.userAddress}</p>
          </div>
        </header>

        {/* --- RECIPIENT BLOCK --- */}
        <section className="space-y-1 text-[13px]">
          <p className="font-bold text-slate-900 mb-6">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-bold text-slate-900">
            {coverLetterData.recipientName || "Hiring Manager"}
          </p>
          <p className="font-medium text-slate-700">
            {coverLetterData.companyName}
          </p>
          <p className="text-slate-500 italic">
            {coverLetterData.companyAddress}
          </p>
        </section>

        {/* --- BODY CONTENT --- */}
        <article className="prose prose-slate max-w-none">
          <div
            className="text-[14px] leading-relaxed text-slate-800 whitespace-pre-line selection:bg-blue-100"
            dangerouslySetInnerHTML={{ __html: coverLetterData.body || "" }}
          />
        </article>

        {/* --- SIGNATURE AREA --- */}
        <footer className="pt-12 space-y-4">
          <p className="text-sm text-slate-600">Sincerely,</p>
          <div className="min-h-16 flex items-center">
            {coverLetterData.signatureUrl ? (
              <NextImage
                src={coverLetterData.signatureUrl}
                alt="Signature"
                className="h-16 w-auto object-contain mix-blend-multiply"
              />
            ) : (
              <p
                className="text-2xl italic font-serif"
                style={{ color: "var(--primary)" }}>
                {coverLetterData.firstName} {coverLetterData.lastName}
              </p>
            )}
          </div>
          <p className="font-bold text-sm text-slate-900">
            {coverLetterData.firstName} {coverLetterData.lastName}
          </p>
        </footer>
      </div>
    </div>
  );
}
