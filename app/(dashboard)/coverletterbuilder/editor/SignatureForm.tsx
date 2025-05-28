"use client";

import React, { useRef, useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { CoverLetterFormProps } from "@/lib/types";

export default function SignatureForm({
  form,
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const sigPadRef = useRef<SignaturePad>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    coverLetterData.signatureUrl
  );
  const [penColor, setPenColor] = useState<string>(
    coverLetterData.signatureColor || "#000000"
  );

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

  const handleSaveSignature = () => {
    const pad = sigPadRef.current;
    if (pad && !pad.isEmpty()) {
      const url = pad.getTrimmedCanvas().toDataURL("image/png");
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Draw Your Signature</h3>
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
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => sigPadRef.current?.clear()}
          variant="outline">
          Clear
        </Button>
        <Button type="button" onClick={handleSaveSignature}>
          Save Signature
        </Button>
      </div>
      <div>
        <h4 className="font-medium">Or upload an image:</h4>
        <Input type="file" accept="image/*" onChange={handleUpload} />
      </div>
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
