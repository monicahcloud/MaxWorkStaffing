import { ResumeValues } from "@/lib/validation";
import { ResumeThemeToken } from "@/lib/resume-theme-registry";
import { ResumeVisualStyle } from "@/lib/get-resume-visual-style";

export interface SectionProps {
  data: ResumeValues;
  theme: ResumeThemeToken;
  visualStyle: ResumeVisualStyle;
}
