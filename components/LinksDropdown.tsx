"use client";
import { cn } from "@/lib/utils";
import links from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function LinksDropdown() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 text-xl transition-all hover:text-primary"
          )}
          href={link.href}
          key={link.id}>
          {link.icon}
          <span className="capitalize"> {link.label}</span>
        </Link>
      ))}
    </>
  );
}

export default LinksDropdown;
