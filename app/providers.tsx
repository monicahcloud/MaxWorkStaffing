// app/providers.tsx
"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { queryClient } from "@/lib/react-query-client";
import { NextStep, NextStepProvider } from "nextstepjs";
import steps from "@/components/tourGuide/tour";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <NextStepProvider>
          <NextStep steps={steps}>{children}</NextStep>
        </NextStepProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
