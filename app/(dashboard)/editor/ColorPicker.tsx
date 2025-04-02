import React, { useState } from "react";
import { TwitterPicker, ColorChangeHandler, Color } from "react-color";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="change resume color"
          onClick={() => setShowPopover(true)}>
          <Palette className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-none bg-transparent"
        align="end">
        <TwitterPicker triangle="hide" color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
