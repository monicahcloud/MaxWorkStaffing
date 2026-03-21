import { THEME_REGISTRY, ResumeThemeToken } from "@/lib/resume-theme-registry";

export function getValidResumeTheme(themeId?: string | null): ResumeThemeToken {
  return (
    THEME_REGISTRY.find((theme) => theme.id === themeId) ?? THEME_REGISTRY[0]
  );
}
