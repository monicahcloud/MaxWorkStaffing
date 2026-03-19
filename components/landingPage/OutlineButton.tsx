import Link from "next/link";
import { cn } from "@/lib/utils";

interface OutlineButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function OutlineButton({
  href,
  children,
  className,
}: OutlineButtonProps) {
  const classes = cn(
    "inline-flex h-14 items-center justify-center rounded-full border border-neutral-900 px-8 text-sm font-bold uppercase tracking-[0.16em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
    className,
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
