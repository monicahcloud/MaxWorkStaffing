"use client";

import React, { useRef, useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CoverLetterFormProps } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormStepWrapper from "./FormStepWrapper";
import { cn } from "@/lib/utils";

export default function SignatureForm({
  form,
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const sigPadRef = useRef<SignaturePad>(null);

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    coverLetterData.signatureUrl
  );
  const [penColor, setPenColor] = useState(
    coverLetterData.signatureColor || "#000000"
  );
  const [typedName, setTypedName] = useState("");

  const fontOptions = [
    { label: "Elegant", value: "Dancing Script, cursive" },
    { label: "Classic", value: "Great Vibes, cursive" },
    { label: "Modern", value: "Pacifico, cursive" },
    { label: "Casual", value: "Caveat, cursive" },
  ];
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);

  // Sync preview URL when parent data changes (e.g., initial load)
  useEffect(() => {
    setPreviewUrl(coverLetterData.signatureUrl);
  }, [coverLetterData.signatureUrl]);

  // FIX: Sync state to parent using functional update to satisfy ESLint
  useEffect(() => {
    setCoverLetterData((prev) => ({ ...prev, signatureColor: penColor }));
    form.setValue("signatureColor", penColor);
  }, [penColor, form, setCoverLetterData]);

  // Clean up blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSaveDrawn = () => {
    const pad = sigPadRef.current;
    if (pad && !pad.isEmpty()) {
      const url = pad.getTrimmedCanvas().toDataURL("image/png");
      setPreviewUrl(url);
      form.setValue("signatureUrl", url);
      setCoverLetterData((prev) => ({ ...prev, signatureUrl: url }));
    }
  };

  const handleSaveTyped = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 120;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = penColor;
      ctx.font = `48px ${selectedFont}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(
        typedName || "Signature",
        canvas.width / 2,
        canvas.height / 2
      );

      const url = canvas.toDataURL("image/png");
      setPreviewUrl(url);
      form.setValue("signatureUrl", url);
      setCoverLetterData((prev) => ({ ...prev, signatureUrl: url }));
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("signatureUrl", url);
      setCoverLetterData((prev) => ({ ...prev, signatureUrl: url }));
    }
  };

  return (
    <FormStepWrapper
      title="Personal Signature"
      description="Add a professional touch by drawing, typing, or uploading your signature.">
      <div className="space-y-6">
        {/* Color Picker Section */}
        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-slate-400">
              Ink Color
            </span>
            <span className="text-xs font-bold text-slate-600 uppercase">
              {penColor}
            </span>
          </div>
          <input
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
            className="w-10 h-10 p-1 rounded-lg bg-white border border-slate-200 cursor-pointer shadow-sm"
          />
        </div>

        <Tabs defaultValue="draw" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-xl">
            <TabsTrigger
              value="draw"
              className="text-[10px] font-black uppercase tracking-widest">
              Draw
            </TabsTrigger>
            <TabsTrigger
              value="type"
              className="text-[10px] font-black uppercase tracking-widest">
              Type
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="text-[10px] font-black uppercase tracking-widest">
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="draw" className="mt-4 space-y-4">
            <div className="border-2 border-dashed border-slate-200 rounded-xl bg-white p-2 overflow-hidden">
              <SignaturePad
                ref={sigPadRef}
                canvasProps={{
                  width: 500,
                  height: 150,
                  className: "w-full h-32 cursor-crosshair",
                }}
                penColor={penColor}
                backgroundColor="rgba(0,0,0,0)"
              />
            </div>

            {/* FIX: Use a grid instead of flex to force equal button sizes */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => sigPadRef.current?.clear()}
                className="text-[10px] font-black uppercase tracking-widest border-slate-200 hover:bg-slate-50">
                Clear Pad
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSaveDrawn}
                className="text-[10px] font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 shadow-sm">
                Save Signature
              </Button>
            </div>
          </TabsContent>
          {/* TYPE TAB */}
          <TabsContent value="type" className="mt-4 space-y-4">
            <Input
              placeholder="Type your name..."
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              className="bg-slate-50/50 border-slate-200"
            />
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  type="button"
                  onClick={() => setSelectedFont(font.value)}
                  className={cn(
                    "p-3 rounded-lg border text-left transition-all",
                    selectedFont === font.value
                      ? "border-blue-600 bg-blue-50/50 shadow-sm"
                      : "border-slate-100 bg-slate-50/30 hover:bg-slate-50"
                  )}>
                  <span className="text-[8px] font-black uppercase text-slate-400 block mb-1">
                    {font.label}
                  </span>
                  <span
                    className="text-xl truncate block"
                    style={{ fontFamily: font.value, color: penColor }}>
                    {typedName || "Signature"}
                  </span>
                </button>
              ))}
            </div>

            {/* Unified Button Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTypedName("")}
                className="text-[10px] font-black uppercase tracking-widest border-slate-200">
                Reset Text
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleSaveTyped}
                className="text-[10px] font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700">
                Save Type
              </Button>
            </div>
          </TabsContent>

          {/* UPLOAD TAB */}
          <TabsContent value="upload" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/30 cursor-pointer hover:bg-slate-50 transition-all group">
                  <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-blue-500 transition-colors">
                    Click to Upload Image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUpload}
                  />
                </label>
              </div>

              {/* Consistent Grid even for single actions keeps the UI from jumping */}
              <div className="grid grid-cols-2 gap-3">
                <div className="invisible" />{" "}
                {/* Empty spacer to keep the Save button on the right */}
                <Button
                  type="button"
                  size="sm"
                  disabled={!previewUrl?.startsWith("blob:")}
                  className="text-[10px] font-black uppercase tracking-widest bg-blue-600">
                  Confirm Upload
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {previewUrl && (
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">
              Active Signature
            </span>
            <div className="bg-slate-50/50 p-6 rounded-xl flex justify-center border border-slate-100 border-dashed">
              <Image
                src={previewUrl}
                alt="Signature Preview"
                width={200}
                height={60}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </FormStepWrapper>
  );
}
