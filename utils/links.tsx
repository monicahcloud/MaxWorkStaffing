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
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SubscriptionLevel } from "@/lib/subscription";
import { GlobalUsageTracker } from "@/components/UsageTracker";

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
        label: "Job Tracker",
        href: "/addJob",
        icon: <Layers className="w-4 h-4" />,
      },
      {
        label: "AI Mock Interview",
        href: "/mockinterview",
        icon: <MessageSquare className="w-4 h-4" />,
      },
      {
        label: "Articles & Insights",
        href: "/blog",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        label: "Expert Tips",
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

interface Props {
  onLinkClick?: () => void;
  userStats?: {
    level: SubscriptionLevel;
    interviewCount: number;
    resumeCount: number;
    letterCount: number;
  };
}

export const GroupedSidebarLinks = ({ onLinkClick, userStats }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full justify-between text-muted-foreground">
      <div className="space-y-6">
        {linkGroups.map((group, groupIdx) => (
          <div key={group.title}>
            <h4 className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
              {group.title}
            </h4>
            <ul className="space-y-1">
              {group.items.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onLinkClick}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-sm font-medium",
                      pathname === link.href
                        ? "bg-blue-50 font-bold text-blue-700"
                        : "hover:bg-slate-50 hover:text-slate-900",
                    )}>
                    <span
                      className={clsx(
                        "transition-colors",
                        pathname === link.href
                          ? "text-blue-700"
                          : "text-slate-400",
                      )}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {groupIdx < linkGroups.length - 1 && (
              <hr className="my-6 border-slate-100 mx-3" />
            )}
          </div>
        ))}
      </div>

      {/* --- USAGE TRACKER AT THE BOTTOM --- */}
      {userStats && (
        <div className="mt-8 pt-6 border-t border-slate-100 px-1">
          <GlobalUsageTracker
            level={userStats.level}
            interviewCount={userStats.interviewCount}
            resumeCount={userStats.resumeCount}
            letterCount={userStats.letterCount}
          />
        </div>
      )}
    </div>
  );
};
