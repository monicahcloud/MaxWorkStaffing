"use client";

import {
  AppWindow,
  CircleHelp,
  CreditCard,
  HomeIcon,
  Layers,
  List,
  MessageCircleQuestion,
  FilePen,
  UserCheck2,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type LinkItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type LinkGroup = {
  title: string;
  items: LinkItem[];
};

export const linkGroups: LinkGroup[] = [
  {
    title: "Main Navigation",
    items: [
      {
        label: "Dashboard",
        href: "/home",
        icon: <HomeIcon className="w-4 h-4" />,
      },
      {
        label: "Resumes",
        href: "/resumes",
        icon: <List className="w-4 h-4" />,
      },
      {
        label: "Cover Letter",
        href: "/coverletter",
        icon: <FilePen className="w-4 h-4" />,
      },
      {
        label: "Job Search",
        href: "/jobsearch",
        icon: <AppWindow className="w-4 h-4" />,
      },
      {
        label: "Job Tracker",
        href: "/addJob",
        icon: <Layers className="w-4 h-4" />,
      },
      {
        label: "Pricing",
        href: "/billing",
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        label: "FAQs",
        href: "/faq",
        icon: <MessageCircleQuestion className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Resources & Support",
    items: [
      {
        label: "Articles & Insights",
        href: "/blog",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        label: "Expert Interview & Resume Tips",
        href: "/resources",
        icon: <UserCheck2 className="w-4 h-4" />,
      },
      {
        label: "Support",
        href: "/support",
        icon: <CircleHelp className="w-4 h-4" />,
      },
    ],
  },
];

export const GroupedSidebarLinks = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-6 text-muted-foreground">
      {linkGroups.map((group, groupIdx) => (
        <div key={group.title}>
          <h4 className="px-3 text-md font-semibold tracking-wide text-gray-400 uppercase mb-2">
            {group.title}
          </h4>
          <ul className="space-y-1">
            {group.items.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    pathname === link.href
                      ? "bg-muted text-foreground font-semibold"
                      : "hover:bg-muted/70"
                  )}>
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {groupIdx < linkGroups.length - 1 && (
            <hr className="my-4 border-red-700" />
          )}
        </div>
      ))}
    </div>
  );
};
