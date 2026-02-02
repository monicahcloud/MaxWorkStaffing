// Simple shared type
import type { ReactElement } from "react";

export type InterviewCard = {
  icon: ReactElement;
  title: string;
  short: string;
  detail: string;
};
