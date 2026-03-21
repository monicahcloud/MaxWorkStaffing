import { ResumeThemeToken } from "@/lib/resume-theme-registry";

export type ResumeVisualStyle = {
  headerStyle: "classic" | "centered" | "split" | "band";
  sectionTitleStyle: "underline" | "caps" | "bar" | "boxed";
  skillsStyle: "chips" | "list" | "compact";
  experienceStyle: "stacked" | "timeline" | "minimal";
  educationStyle: "stacked" | "inline";
  contactStyle: "inline" | "stacked";
  sidebarTone: "none" | "soft" | "strong";
  nameStyle: "single-line" | "stacked";
  photoStyle: "hidden" | "rounded" | "circle";
  jobTitleStyle: "subtle" | "strong" | "accented";
  sectionSpacing: "tight" | "normal" | "airy";
  headingAlign: "left" | "center";
};

const LAYOUT_STYLE_MAP: Record<ResumeThemeToken["layout"], ResumeVisualStyle> =
  {
    "top-header": {
      headerStyle: "classic",
      sectionTitleStyle: "underline",
      skillsStyle: "chips",
      experienceStyle: "stacked",
      educationStyle: "stacked",
      contactStyle: "inline",
      sidebarTone: "none",
      nameStyle: "single-line",
      photoStyle: "rounded",
      jobTitleStyle: "strong",
      sectionSpacing: "normal",
      headingAlign: "left",
    },
    "sidebar-left": {
      headerStyle: "split",
      sectionTitleStyle: "bar",
      skillsStyle: "chips",
      experienceStyle: "stacked",
      educationStyle: "stacked",
      contactStyle: "stacked",
      sidebarTone: "strong",
      nameStyle: "stacked",
      photoStyle: "circle",
      jobTitleStyle: "accented",
      sectionSpacing: "normal",
      headingAlign: "left",
    },
    "sidebar-right": {
      headerStyle: "split",
      sectionTitleStyle: "caps",
      skillsStyle: "compact",
      experienceStyle: "timeline",
      educationStyle: "stacked",
      contactStyle: "stacked",
      sidebarTone: "soft",
      nameStyle: "single-line",
      photoStyle: "circle",
      jobTitleStyle: "subtle",
      sectionSpacing: "tight",
      headingAlign: "left",
    },
    minimal: {
      headerStyle: "classic",
      sectionTitleStyle: "caps",
      skillsStyle: "list",
      experienceStyle: "minimal",
      educationStyle: "inline",
      contactStyle: "inline",
      sidebarTone: "none",
      nameStyle: "single-line",
      photoStyle: "rounded",
      jobTitleStyle: "subtle",
      sectionSpacing: "tight",
      headingAlign: "left",
    },
    "modern-split": {
      headerStyle: "band",
      sectionTitleStyle: "boxed",
      skillsStyle: "chips",
      experienceStyle: "timeline",
      educationStyle: "inline",
      contactStyle: "inline",
      sidebarTone: "soft",
      nameStyle: "single-line",
      photoStyle: "rounded",
      jobTitleStyle: "accented",
      sectionSpacing: "airy",
      headingAlign: "left",
    },
  };

const THEME_STYLE_OVERRIDES: Partial<
  Record<ResumeThemeToken["id"], Partial<ResumeVisualStyle>>
> = {
  "chronological-classic": {
    headerStyle: "centered",
    sectionTitleStyle: "underline",
    skillsStyle: "chips",
    experienceStyle: "stacked",
    educationStyle: "stacked",
    contactStyle: "inline",
    nameStyle: "single-line",
    photoStyle: "rounded",
  },

  "executive-navy": {
    headerStyle: "split",
    sectionTitleStyle: "underline",
    skillsStyle: "chips",
    experienceStyle: "stacked",
    educationStyle: "inline",
    contactStyle: "stacked",
    nameStyle: "single-line",
    photoStyle: "rounded",
    jobTitleStyle: "subtle",
    sectionSpacing: "tight",
    headingAlign: "left",
  },

  // "professional-charcoal": {
  //   headerStyle: "classic",
  //   sectionTitleStyle: "caps",
  //   skillsStyle: "compact",
  //   experienceStyle: "minimal",
  //   educationStyle: "inline",
  //   contactStyle: "inline",
  //   nameStyle: "single-line",
  //   photoStyle: "rounded",
  // },

  // "modern-tech-split": {
  //   headerStyle: "band",
  //   sectionTitleStyle: "boxed",
  //   skillsStyle: "chips",
  //   experienceStyle: "timeline",
  //   educationStyle: "inline",
  //   contactStyle: "inline",
  //   sidebarTone: "soft",
  //   nameStyle: "single-line",
  //   photoStyle: "rounded",
  // },

  "combination-pro": {
    headerStyle: "split",
    sectionTitleStyle: "bar",
    skillsStyle: "compact",
    experienceStyle: "timeline",
    educationStyle: "stacked",
    contactStyle: "stacked",
    sidebarTone: "soft",
    nameStyle: "single-line",
    photoStyle: "rounded",
  },

  "functional-creative": {
    headerStyle: "split",
    sectionTitleStyle: "underline",
    skillsStyle: "compact",
    experienceStyle: "stacked",
    educationStyle: "stacked",
    contactStyle: "stacked",
    sidebarTone: "strong",
    nameStyle: "stacked",
    photoStyle: "circle",
  },

  "creative-rose": {
    headerStyle: "centered",
    sectionTitleStyle: "boxed",
    skillsStyle: "compact",
    experienceStyle: "stacked",
    educationStyle: "inline",
    contactStyle: "inline",
    sidebarTone: "strong",
    nameStyle: "stacked",
    photoStyle: "rounded",
    jobTitleStyle: "accented",
    sectionSpacing: "airy",
    headingAlign: "center",
  },

  "marketing-purple": {
    headerStyle: "split",
    sectionTitleStyle: "underline",
    skillsStyle: "chips",
    experienceStyle: "timeline",
    educationStyle: "stacked",
    contactStyle: "stacked",
    sidebarTone: "soft",
    nameStyle: "single-line",
    photoStyle: "circle",
  },

  "federal-standard": {
    headerStyle: "classic",
    sectionTitleStyle: "underline",
    skillsStyle: "chips",
    experienceStyle: "minimal",
    educationStyle: "stacked",
    contactStyle: "stacked",
    sidebarTone: "none",
    nameStyle: "single-line",
    photoStyle: "hidden",
    jobTitleStyle: "subtle",
    sectionSpacing: "tight",
    headingAlign: "left",
  },

  // "government-slate": {
  //   headerStyle: "classic",
  //   sectionTitleStyle: "caps",
  //   skillsStyle: "list",
  //   experienceStyle: "minimal",
  //   educationStyle: "stacked",
  //   contactStyle: "stacked",
  //   sidebarTone: "none",
  //   nameStyle: "single-line",
  //   photoStyle: "hidden",
  // },

  // "legal-burgundy": {
  //   headerStyle: "classic",
  //   sectionTitleStyle: "underline",
  //   skillsStyle: "compact",
  //   experienceStyle: "stacked",
  //   educationStyle: "stacked",
  //   contactStyle: "inline",
  //   nameStyle: "single-line",
  //   photoStyle: "rounded",
  // },

  // "finance-emerald": {
  //   headerStyle: "split",
  //   sectionTitleStyle: "caps",
  //   skillsStyle: "compact",
  //   experienceStyle: "minimal",
  //   educationStyle: "inline",
  //   contactStyle: "inline",
  //   nameStyle: "single-line",
  //   photoStyle: "rounded",
  // },

  "engineering-steel": {
    headerStyle: "split",
    sectionTitleStyle: "bar",
    skillsStyle: "compact",
    experienceStyle: "timeline",
    educationStyle: "stacked",
    contactStyle: "stacked",
    sidebarTone: "soft",
    nameStyle: "single-line",
    photoStyle: "circle",
  },

  // "data-graphite": {
  //   headerStyle: "band",
  //   sectionTitleStyle: "boxed",
  //   skillsStyle: "compact",
  //   experienceStyle: "timeline",
  //   educationStyle: "inline",
  //   contactStyle: "inline",
  //   sidebarTone: "soft",
  //   nameStyle: "single-line",
  //   photoStyle: "rounded",
  //   jobTitleStyle: "subtle",
  // },

  "early-career-blue": {
    headerStyle: "centered",
    sectionTitleStyle: "underline",
    skillsStyle: "chips",
    experienceStyle: "stacked",
    educationStyle: "inline",
    contactStyle: "inline",
    nameStyle: "stacked",
    photoStyle: "rounded",
    jobTitleStyle: "strong",
    sectionSpacing: "airy",
    headingAlign: "center",
  },
};

export function getResumeVisualStyle(
  theme: ResumeThemeToken,
): ResumeVisualStyle {
  const baseStyle = LAYOUT_STYLE_MAP[theme.layout];
  const themeOverride = THEME_STYLE_OVERRIDES[theme.id] ?? {};

  return {
    ...baseStyle,
    ...themeOverride,
  };
}
