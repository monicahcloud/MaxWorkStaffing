import { JSX } from "react";
import { ShabachTemplate } from "./ShabachTemplate";
import { TodahTemplate } from "./TodahTemplate";
import Zamar from "./Zamar";
import { CoverLetterTemplateProps } from "@/utils/types";
import ClassicTemplate from "./ClassicTemplate";

export const templateMap: Record<
  string,
  (props: CoverLetterTemplateProps) => JSX.Element
> = {
  Shabach: ShabachTemplate,
  Todah: TodahTemplate,
  Zamar: Zamar,
  Classic: ClassicTemplate,
};
