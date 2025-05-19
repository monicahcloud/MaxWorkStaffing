"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "signature_pad";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SignatureProps {
  onSave: (dataUrl: string) => void;
  defaultValue?: string;
}

export default function Signature({ onSave, defaultValue }: SignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const pad = new SignaturePad(canvasRef.current, {
        backgroundColor: "#fff",
        penColor: "#000",
      });
      padRef.current = pad;

      pad.onEnd = () => setHasDrawn(true);

      if (defaultValue) {
        const image = new Image();
        image.src = defaultValue;
        image.onload = () => {
          pad.clear();
          pad._ctx?.drawImage(image, 0, 0);
        };
      }
    }
  }, [defaultValue]);

  const handleClear = () => {
    padRef.current?.clear();
    setHasDrawn(false);
  };

  const handleSave = () => {
    if (!padRef.current?.isEmpty()) {
      const dataUrl = padRef.current.toDataURL();
      onSave(dataUrl);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="border rounded overflow-hidden">
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            className="w-full h-auto"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleClear} disabled={!hasDrawn}>
            Clear
          </Button>
          <Button onClick={handleSave} disabled={!hasDrawn}>
            Save Signature
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
