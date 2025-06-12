// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { FileUserIcon, PencilIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface FooterProps {
//   currentStep: string;
//   setCurrentStep: (step: string) => void;
//   showPreview: boolean;
//   setShowPreview: (show: boolean) => void;
//   isSaving: boolean;
//   steps: { key: string; label: string }[];
// }

// export default function CoverLetterFooter({
//   currentStep,
//   setCurrentStep,
//   showPreview,
//   setShowPreview,
//   isSaving,
//   steps,
// }: FooterProps) {
//   const currentIndex = steps.findIndex((step) => step.key === currentStep);
//   const previousStep = steps[currentIndex - 1]?.key;
//   const nextStep = steps[currentIndex + 1]?.key;

//   return (
//     <footer className="w-full border-t px-3 py-3">
//       <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <Button
//             variant="secondary"
//             onClick={() => {
//               if (previousStep) setCurrentStep(previousStep);
//             }}
//             disabled={!previousStep}>
//             Previous Step
//           </Button>

//           <Button
//             onClick={() => {
//               if (nextStep) setCurrentStep(nextStep);
//             }}
//             disabled={!nextStep}>
//             Next Step
//           </Button>
//         </div>

//         <Button
//           variant="outline"
//           size="icon"
//           onClick={() => setShowPreview(!showPreview)}
//           className="md:hidden"
//           title={showPreview ? "Show input form" : "Show preview"}>
//           {showPreview ? <PencilIcon /> : <FileUserIcon />}
//         </Button>

//         <div className="flex items-center gap-3">
//           <Button variant="secondary" asChild>
//             <Link href="/coverletter">Close</Link>
//           </Button>
//           <p
//             className={cn(
//               "text-muted-foreground opacity-0 transition-opacity",
//               isSaving && "opacity-100"
//             )}>
//             Saving...
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
