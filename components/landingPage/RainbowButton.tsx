import React from "react";
import { cn } from "@/lib/utils";

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex h-11 items-center justify-center rounded-xl px-8 py-2 font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
        "bg-red-600 text-white hover:bg-red-700",
        "dark:bg-red-500 dark:hover:bg-red-600 dark:text-black",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}>
      {children}
    </button>
  );
});

RainbowButton.displayName = "RainbowButton";
