// app/(dashboard)/coverletterbuilder/templates/template.ts
import modernPreview from "../../../../assets/modern.png";
import simplePreview from "../../../../assets/simple.png";
import classicPreview from "../../../../assets/classic.png";

export const templateMetadata = [
  {
    id: "modern-1", // Maps to THEME_REGISTRY.id
    name: "Modern Professional",
    image: modernPreview,
  },
  {
    id: "professional-1", // Maps to THEME_REGISTRY.id
    name: "Executive Classic",
    image: classicPreview,
  },
  {
    id: "minimal-1", // Maps to THEME_REGISTRY.id
    name: "Clean Minimalist",
    image: simplePreview,
  },
];
