// lib/resume-theme-registry.ts

/* ---------- 1. TYPES ---------- */
export type ResumeLayout =
  | "top-header"
  | "sidebar-left"
  | "sidebar-right"
  | "minimal"
  | "modern-split";

// The four core resume archetypes
export type ResumeCategory =
  | "chronological"
  | "functional"
  | "federal"
  | "combination";

export interface ResumeThemeToken {
  id: string;
  name: string;
  layout: ResumeLayout;
  paletteId: string;
  fontId: string;
  spacing: "compact" | "normal" | "relaxed";
  category: ResumeCategory;
  defaultColor: string;
}

/* ---------- 2. INGREDIENTS (The Library) ---------- */

export const SPACING_OPTIONS: ("compact" | "normal" | "relaxed")[] = [
  "compact",
  "normal",
  "relaxed",
];

export const ColorPalettes = {
  "classic-business": {
    label: "Chronological Classic",
    description:
      "Traditional top-down flow. Ideal for steady career progression in finance or law.",
    primary: "#000000",
    secondary: "#475569",
    accent: "#DC2626",
  },
  "combination-pro": {
    label: "Combination Pro",
    description:
      "A hybrid layout balancing skills and work history for tech and engineering.",
    primary: "#2563EB",
    secondary: "#1E293B",
    accent: "#38BDF8",
  },
  "federal-standard": {
    label: "Federal Standard",
    description:
      "Data-dense, single-column compliance layout for government and GS roles.",
    primary: "#0F172A",
    secondary: "#475569",
    accent: "#CBD5E1",
  },
  "functional-creative": {
    label: "Functional Creative",
    description:
      "Focuses on skills and competencies over timeline. Perfect for career changers.",
    primary: "#BE123C",
    secondary: "#881337",
    accent: "#FFE4E6",
  },
  "modern-tech": {
    label: "Modern Tech",
    description:
      "Clean blue and slate tones suited for technology, engineering, and startup environments.",
    primary: "#2563EB",
    secondary: "#1E293B",
    accent: "#38BDF8",
  },
  "executive-navy": {
    label: "Executive Navy",
    description:
      "Deep navy and neutral gray for leadership, management, and senior professionals.",
    primary: "#0F172A",
    secondary: "#334155",
    accent: "#94A3B8",
  },
  "professional-charcoal": {
    label: "Professional Charcoal",
    description:
      "Dark charcoal with subtle contrast. Clean, modern, and highly versatile.",
    primary: "#111827",
    secondary: "#4B5563",
    accent: "#9CA3AF",
  },
  "medical-teal": {
    label: "Healthcare & Medical",
    description:
      "Calming teal tones ideal for healthcare, wellness, and clinical roles.",
    primary: "#0D9488",
    secondary: "#115E59",
    accent: "#CCFBF1",
  },
  "education-blue": {
    label: "Education Blue",
    description:
      "Trustworthy blue palette suitable for education, academia, and public service.",
    primary: "#1D4ED8",
    secondary: "#1E40AF",
    accent: "#DBEAFE",
  },
  "government-slate": {
    label: "Government Slate",
    description:
      "Muted slate tones designed for federal, government, and compliance-heavy roles.",
    primary: "#0F172A",
    secondary: "#475569",
    accent: "#CBD5E1",
  },
  "legal-burgundy": {
    label: "Legal Burgundy",
    description:
      "Rich burgundy with neutral balance. Excellent for legal, policy, and advisory roles.",
    primary: "#7F1D1D",
    secondary: "#1F2933",
    accent: "#FCA5A5",
  },
  "finance-emerald": {
    label: "Finance Emerald",
    description:
      "Confident green tones associated with growth, stability, and financial expertise.",
    primary: "#047857",
    secondary: "#064E3B",
    accent: "#A7F3D0",
  },
  "creative-rose": {
    label: "Creative Professional",
    description:
      "Bold yet refined rose tones for marketing, branding, and creative industries.",
    primary: "#BE123C",
    secondary: "#881337",
    accent: "#FFE4E6",
  },
  "marketing-purple": {
    label: "Marketing Purple",
    description:
      "Strategic purple palette for marketing, communications, and brand roles.",
    primary: "#6D28D9",
    secondary: "#4C1D95",
    accent: "#EDE9FE",
  },
  "startup-indigo": {
    label: "Startup Indigo",
    description:
      "Energetic indigo tones for early-career professionals and startup environments.",
    primary: "#4338CA",
    secondary: "#312E81",
    accent: "#E0E7FF",
  },
  "design-neutral": {
    label: "Design Neutral",
    description:
      "Minimal grayscale palette that keeps focus on content and layout.",
    primary: "#1F2937",
    secondary: "#6B7280",
    accent: "#E5E7EB",
  },
  "operations-olive": {
    label: "Operations Olive",
    description:
      "Earthy olive tones suitable for logistics, operations, and supply chain roles.",
    primary: "#3F6212",
    secondary: "#365314",
    accent: "#ECFCCB",
  },
  "engineering-steel": {
    label: "Engineering Steel",
    description:
      "Cool steel blues designed for engineering and technical professionals.",
    primary: "#1E3A8A",
    secondary: "#1E293B",
    accent: "#BFDBFE",
  },
  "consulting-slate": {
    label: "Consulting Slate",
    description:
      "Polished slate tones ideal for consulting, strategy, and advisory work.",
    primary: "#020617",
    secondary: "#334155",
    accent: "#CBD5E1",
  },
  "nonprofit-blue": {
    label: "Nonprofit Blue",
    description:
      "Approachable blue palette for nonprofit, social impact, and community roles.",
    primary: "#1E40AF",
    secondary: "#1E3A8A",
    accent: "#DBEAFE",
  },
  "hospitality-sand": {
    label: "Hospitality Sand",
    description:
      "Warm neutral tones for hospitality, tourism, and customer-facing roles.",
    primary: "#78350F",
    secondary: "#92400E",
    accent: "#FEF3C7",
  },
  "data-graphite": {
    label: "Data & Analytics",
    description:
      "Modern graphite tones designed for data, analytics, and BI professionals.",
    primary: "#030712",
    secondary: "#374151",
    accent: "#9CA3AF",
  },
  "early-career-blue": {
    label: "Early Career Blue",
    description:
      "Friendly, confident blue ideal for students, graduates, and entry-level roles.",
    primary: "#2563EB",
    secondary: "#60A5FA",
    accent: "#EFF6FF",
  },
  "executive-black-gold": {
    label: "Executive Black",
    description:
      "High-contrast black with muted gold accent for senior-level professionals.",
    primary: "#000000",
    secondary: "#1F2937",
    accent: "#D4AF37",
  },
};

export const FontPairs = {
  professional: { heading: "Inter", body: "Roboto" },
  traditional: { heading: "Playfair Display", body: "Source Sans Pro" },
  technical: { heading: "JetBrains Mono", body: "Inter" },
  modern: { heading: "Montserrat", body: "Open Sans" },
};

/* ---------- 3. THE REGISTRY GENERATOR ---------- */

const generateRegistry = (): ResumeThemeToken[] => {
  const registry: ResumeThemeToken[] = [];

  // Define Archetype mapping to ensure "beautiful and different" defaults
  const archetypes: {
    category: ResumeCategory;
    layout: ResumeLayout;
    palette: string;
  }[] = [
    {
      category: "chronological",
      layout: "top-header",
      palette: "classic-business",
    },
    {
      category: "functional",
      layout: "sidebar-left",
      palette: "creative-rose",
    },
    { category: "federal", layout: "top-header", palette: "government-slate" },
    { category: "combination", layout: "modern-split", palette: "modern-tech" },
  ];

  const paletteKeys = Object.keys(
    ColorPalettes
  ) as (keyof typeof ColorPalettes)[];
  const fontKeys = Object.keys(FontPairs) as (keyof typeof FontPairs)[];

  // 1. Generate core Archetypes first to ensure they appear first in the list
  archetypes.forEach((art) => {
    registry.push({
      id: `${art.category}-master`.toLowerCase(),
      name: `${
        art.category.charAt(0).toUpperCase() + art.category.slice(1)
      } Template`,
      category: art.category,
      layout: art.layout,
      paletteId: art.palette,
      fontId: "professional",
      spacing: art.category === "federal" ? "compact" : "normal",
      defaultColor: "#0f172a",
    });
  });

  // 2. Generate the rest of the combinations for variety
  const layouts: ResumeLayout[] = [
    "top-header",
    "sidebar-left",
    "sidebar-right",
    "minimal",
    "modern-split",
  ];

  layouts.forEach((layout) => {
    paletteKeys.forEach((paletteId) => {
      fontKeys.forEach((fontId) => {
        const id = `${layout}-${paletteId}-${fontId}`.toLowerCase();

        // Skip if already added as an archetype
        if (registry.find((r) => r.id === id)) return;

        // Categorize based on layout
        let category: ResumeCategory = "chronological";
        if (layout === "sidebar-left") category = "functional";
        if (layout === "modern-split") category = "combination";
        if (paletteId === "government-slate") category = "federal";

        const palette = ColorPalettes[paletteId as keyof typeof ColorPalettes];
        registry.push({
          id,
          name: `${ColorPalettes[paletteId].label} (${layout.replace(
            "-",
            " "
          )})`,
          layout,
          paletteId,
          fontId,
          spacing: layout === "top-header" ? "compact" : "normal",
          category,
          defaultColor: palette.primary,
        });
      });
    });
  });

  return registry;
};

export const THEME_REGISTRY = generateRegistry();
