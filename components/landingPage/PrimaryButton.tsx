import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  PrimaryButtonProps
>(({ className, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(
        // layout
        "inline-flex items-center justify-center rounded-full px-10",
        // size (aligned with hero CTAs)
        "h-14 text-base  uppercase font-bold",
        // typography
        "tracking-tight",
        // colors (brand)
        "bg-red-600 text-white",
        "hover:bg-red-700",
        // states
        "transition-colors duration-200",
        "disabled:opacity-50 disabled:pointer-events-none",
        // focus (a11y)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
        className,
      )}
      {...props}>
      {children}
    </Comp>
  );
});

PrimaryButton.displayName = "PrimaryButton";
