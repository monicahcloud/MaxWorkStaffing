// import React, { useState } from "react";
// import { ColorChangeHandler, Color } from "react-color";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Palette } from "lucide-react";
// import usePremiumModal from "@/hooks/usePremiumModal";
// import { canUseCustomizations } from "@/lib/permissions";
// import { useSubscriptionLevel } from "../SubscriptionLevelProvider";
// import Compact from "react-color/lib/components/compact/Compact";

// interface ColorPickerProps {
//   color: Color | undefined;
//   onChange: ColorChangeHandler;
// }

// export default function ColorPicker({ color, onChange }: ColorPickerProps) {
//   const subscriptionLevel = useSubscriptionLevel();
//   const premiumModal = usePremiumModal();
//   const [showPopover, setShowPopover] = useState(false);

//   return (
//     <Popover open={showPopover} onOpenChange={setShowPopover}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           title="change resume color"
//           onClick={() => {
//             if (!canUseCustomizations(subscriptionLevel)) {
//               premiumModal.setOpen(true);
//               return;
//             }
//             setShowPopover(true);
//           }}>
//           <Palette className="size-5" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent
//         className="w-auto p-0 border-none bg-transparent"
//         align="end">
//         <Compact color={color} onChange={onChange} />
//       </PopoverContent>
//     </Popover>
//   );
// }
