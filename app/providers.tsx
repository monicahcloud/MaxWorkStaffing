"use client";

import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { queryClient } from "@/lib/react-query-client";

function Providers({ children }: { children: React.ReactNode }) {
  // const [queryClient] = useState(() => {
  //   return new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         staleTime: 60 * 1000 * 5,
  //       },
  //     },
  //   });
  // });
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default Providers;
