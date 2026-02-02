"use client";

import { useRef, useEffect, useState } from "react";
import SignaturePad from "signature_pad";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SignatureProps {
  onSave: (dataUrl: string) => void;
  defaultValue?: string;
  penColor?: string;
  fontFamily?: string;
}

export default function Signature({
  onSave,
  defaultValue,
  penColor = "#000",
}: SignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [typedSignature, setTypedSignature] = useState("");
  const [activeTab, setActiveTab] = useState("draw");
  const [hasLoadedDefault, setHasLoadedDefault] = useState(false);

  useEffect(() => {
    if (activeTab !== "draw") return;

    const timeout = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ratio = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      const ctx = canvas.getContext("2d");
      ctx?.scale(ratio, ratio);
      ctx?.clearRect(0, 0, canvas.width, canvas.height); // 💡 Clear before initializing

      if (padRef.current) {
        padRef.current.off();
      }

      const pad = new SignaturePad(canvas, {
        penColor,
      });

      padRef.current = pad;

      canvas.addEventListener("mouseup", () => {
        if (!pad.isEmpty()) setHasDrawn(true);
      });

      if (defaultValue && !hasLoadedDefault) {
        pad.fromDataURL(defaultValue, {
          width,
          height,
        });
        setHasDrawn(true);
        setHasLoadedDefault(true); // ✅ Prevent reloading every time
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [activeTab, defaultValue, hasLoadedDefault]);

  const handleClear = () => {
    if (padRef.current) {
      padRef.current.clear();
      setHasDrawn(false);
    }
  };

  const handleSave = () => {
    if (activeTab === "draw" && padRef.current && !padRef.current.isEmpty()) {
      const dataUrl = padRef.current.toDataURL();
      onSave(dataUrl);
    } else if (activeTab === "type" && typedSignature.trim()) {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 150;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // ctx.fillStyle = "#fff";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = penColor;
        ctx.font = "100px cursive";
        ctx.fillText(typedSignature.trim(), 20, 75);
        onSave(canvas.toDataURL());
      }
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <Tabs
          defaultValue="draw"
          value={activeTab}
          onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="draw">Draw</TabsTrigger>
            <TabsTrigger value="type">Type</TabsTrigger>
          </TabsList>

          <TabsContent value="draw">
            <div className="border rounded overflow-hidden w-full">
              <canvas
                ref={canvasRef}
                className="w-full h-[150px]" // Visual size
              />
            </div>

            <div className="flex gap-2 justify-end mt-2">
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={!hasDrawn}>
                Clear
              </Button>
              <Button onClick={handleSave} disabled={!hasDrawn}>
                Save Signature
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="type">
            <Input
              placeholder="Type your signature"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={!typedSignature.trim()}>
                Save Signature
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
