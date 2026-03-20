export type CoverLetterLayout =
  | "classic-left"
  | "centered-header"
  | "split-header"
  | "minimal"
  | "executive"
  | "right-header"
  | "boxed-header"
  | "accent-bar"
  | "two-column-minimal";

export interface CoverLetterThemeToken {
  id: string;
  name: string;
  category: string;
  layout: CoverLetterLayout;
  defaultColor: string;
  fontId: "professional" | "traditional" | "modern";
  spacing: "compact" | "normal" | "relaxed";
  headerAlign: "left" | "center" | "right";
  showDivider: boolean;
}

export const COVER_LETTER_THEME_REGISTRY: CoverLetterThemeToken[] = [
  {
    id: "classic-left",
    name: "Classic Left",
    category: "Professional",
    layout: "classic-left",
    defaultColor: "#111827",
    fontId: "traditional",
    spacing: "normal",
    headerAlign: "left",
    showDivider: true,
  },
  {
    id: "centered-modern",
    name: "Centered Modern",
    category: "Modern",
    layout: "centered-header",
    defaultColor: "#2563EB",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "center",
    showDivider: true,
  },
  {
    id: "executive-red",
    name: "Executive ",
    category: "Leadership",
    layout: "executive",
    defaultColor: "#B91C1C",
    fontId: "professional",
    spacing: "relaxed",
    headerAlign: "left",
    showDivider: true,
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "Minimal",
    layout: "minimal",
    defaultColor: "#0F172A",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "left",
    showDivider: false,
  },
  {
    id: "split-corporate",
    name: "Split Corporate",
    category: "Corporate",
    layout: "split-header",
    defaultColor: "#1D4ED8",
    fontId: "professional",
    spacing: "normal",
    headerAlign: "left",
    showDivider: true,
  },
  {
    id: "right-aligned-pro",
    name: "Right Aligned Pro",
    category: "Professional",
    layout: "right-header",
    defaultColor: "#0F172A",
    fontId: "professional",
    spacing: "normal",
    headerAlign: "right",
    showDivider: true,
  },
  {
    id: "boxed-modern",
    name: "Boxed Modern",
    category: "Modern",
    layout: "boxed-header",
    defaultColor: "#7C3AED",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "left",
    showDivider: false,
  },
  {
    id: "accent-bar-blue",
    name: "Accent Bar",
    category: "Creative",
    layout: "accent-bar",
    defaultColor: "#2563EB",
    fontId: "modern",
    spacing: "normal",
    headerAlign: "left",
    showDivider: false,
  },
  {
    id: "two-column-minimal",
    name: "Two Column Minimal",
    category: "Minimal",
    layout: "two-column-minimal",
    defaultColor: "#111827",
    fontId: "modern",
    spacing: "compact",
    headerAlign: "left",
    showDivider: false,
  },
];
