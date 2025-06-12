"use client";

import React, { useRef, useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CoverLetterFormProps } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    { label: "Dancing Script", value: "Dancing Script, cursive" },
    { label: "Great Vibes", value: "Great Vibes, cursive" },
    { label: "Pacifico", value: "Pacifico, cursive" },
    { label: "Caveat", value: "Caveat, cursive" },
  ];
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);

  useEffect(() => {
    setPreviewUrl(coverLetterData.signatureUrl);
  }, [coverLetterData.signatureUrl]);

  useEffect(() => {
    setCoverLetterData({ ...coverLetterData, signatureColor: penColor });
    form.setValue("signatureColor", penColor);
  }, [penColor]);

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
      setCoverLetterData({ ...coverLetterData, signatureUrl: url });
    }
  };

  const handleSaveTyped = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 120;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0)"; // transparent background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = penColor;
      ctx.font = `48px ${selectedFont}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);

      const url = canvas.toDataURL("image/png");
      setPreviewUrl(url);
      form.setValue("signatureUrl", url);
      setCoverLetterData({ ...coverLetterData, signatureUrl: url });
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("signatureUrl", url);
      setCoverLetterData({ ...coverLetterData, signatureUrl: url });
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="font-semibold text-2xl">Signature</h2>
        <p className="text-sm text-muted-foreground">
          Add your personal touch—draw your signature, type it in your favorite
          font, or upload a polished version to complete your cover letter with
          style.
        </p>
      </div>

      <Tabs defaultValue="draw" className="w-full">
        {/* Draw Tab */}
        <div className="flex justify-between items-center mb-4">
          <TabsList className="">
            <TabsTrigger value="draw">Draw</TabsTrigger>
            <TabsTrigger value="type">Type</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <label htmlFor="penColor" className="font-medium">
              Signature Color:
            </label>
            <input
              id="penColor"
              type="color"
              value={penColor}
              onChange={(e) => setPenColor(e.target.value)}
              className="w-8 h-8 p-0 border-0"
            />
            <span className="text-sm">{penColor}</span>
          </div>
        </div>
        <TabsContent value="draw">
          <SignaturePad
            ref={sigPadRef}
            canvasProps={{
              width: 400,
              height: 120,
              className: "border rounded bg-white",
            }}
            penColor={penColor}
            backgroundColor="rgba(0,0,0,0)"
          />

          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              onClick={() => sigPadRef.current?.clear()}
              variant="outline">
              Clear
            </Button>
            <Button type="button" onClick={handleSaveDrawn}>
              Save Signature
            </Button>
          </div>
        </TabsContent>

        {/* Type Tab */}
        <TabsContent value="type">
          <Input
            placeholder="Type your name"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap mt-2">
            {fontOptions.map((font) => (
              <button
                key={font.value}
                type="button"
                onClick={() => setSelectedFont(font.value)}
                className={`border px-2 py-1 rounded ${
                  selectedFont === font.value
                    ? "border-purple-600"
                    : "border-gray-300"
                }`}>
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </button>
            ))}
          </div>
          <div className="border rounded bg-white px-4 py-2 mt-4">
            <p
              className="text-3xl"
              style={{ color: penColor, fontFamily: selectedFont }}
            />
          </div>
          <Button className="mt-2" type="button" onClick={handleSaveTyped}>
            Save Typed Signature
          </Button>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload">
          <Input type="file" accept="image/*" onChange={handleUpload} />
        </TabsContent>
      </Tabs>

      {/* Preview */}
      <div>
        <h4 className="font-medium">Preview:</h4>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Signature Preview"
            width={200}
            height={60}
            className="border rounded bg-white"
          />
        )}
      </div>
    </div>
  );
}
