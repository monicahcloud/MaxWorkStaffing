// Import component responsible for rendering the visual resume preview
import ResumePreview from "@/components/ResumePreview";

// Utility function to conditionally join Tailwind class names
import { cn } from "@/lib/utils";

// Type definition for the resume data structure (validated shape)
import { ResumeValues } from "@/lib/validation";

// UI controls for modifying resume appearance
import BorderStyleButton from "./BorderStyleButton"; // Button group to change border styles
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues; // Current resume data to preview and edit
  setResumeData: (data: ResumeValues) => void; // Callback to update resume data in parent
  className?: string; // Optional additional className for external styling
}

// Functional component that renders the live preview panel of a resume
export default function ResumePreviewSection({
  resumeData, // The resume content to render in the preview
  setResumeData, // Function to update the resumeData when user interacts
  className, // Optional extra classes passed from parent
}: ResumePreviewSectionProps) {
  return (
    // Root container: hidden on small screens, flex on md+ screens; allows extra classes via `className`
    <div className={cn("group relative hidden w-full md:flex", className)}>
      {/* Floating control panel: appears top-left on hover, or always visible on large screens */}
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-2 lg:top-3 xl:opacity-100">
        {/* Color Picker for theme color customization */}
        <ColorPicker
          color={resumeData.themeColor} // Current theme color
          onChange={(color) =>
            // When a new color is picked, update the resumeData with the new hex value
            setResumeData({ ...resumeData, themeColor: color.hex })
          }
        />

        {/* Border Style toggle (e.g., solid, dashed, none) */}
        <BorderStyleButton
          borderStyle={resumeData.borderStyle} // Current border style
          onChange={(borderStyle) =>
            // Update border style in resumeData when changed
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>

      {/* Main preview area: scrollable, centered content, with secondary background and padding */}
      <div className="flex w-full justify-center overflow-y-auto bg-secondary px-10 py-10">
        {/* Resume preview component with fixed max-width and shadow styling */}
        <ResumePreview
          resumeData={resumeData} // Pass the full resume data to the preview component
          className="max-w-2xl shadow-md" // Style the preview container (centered card)
        />
      </div>
    </div>
  );
}
