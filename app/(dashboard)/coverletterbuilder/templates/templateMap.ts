import { JSX } from "react";
import { ShabachTemplate } from "./ShabachTemplate";
import { TodahTemplate } from "./TodahTemplate";
import Zamar from "./Zamar";
import { CoverLetterTemplateProps } from "@/utils/types";

export const templateMap: Record<
  string,
  (props: CoverLetterTemplateProps) => JSX.Element
> = {
  Shabach: ShabachTemplate,
  Todah: TodahTemplate,
  Zamar: Zamar,
};
