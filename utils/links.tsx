"use client";

import {
  AreaChart,
  // AppWindow,
  // AreaChart,
  CircleHelp,
  CreditCard,
  HomeIcon,
  Layers,
  List,
  MessageCircleQuestion,
  // SquareTerminal,
  FilePen,
  // Globe,
  // Users,
  UserCheck2,
  //Users,
} from "lucide-react";
import { nanoid } from "nanoid";
type DashboardLinks = {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: DashboardLinks[] = [
  {
    id: nanoid(),
    label: "Dashboard",
    href: "/home",
    icon: <HomeIcon />,
  },
  {
    id: nanoid(),
    label: "Resumes",
    href: "/resumes",
    icon: <List />,
  },

  {
    id: nanoid(),
    label: "Cover Letter",
    href: "/coverletter",
    icon: <FilePen />,
  },
  // {
  //   id: nanoid(),
  //   label: "Personal Profile",
  //   href: "/profile",
  //   icon: <Globe />,
  // },
  // {
  //   id: nanoid(),
  //   label: "Job Search",
  //   href: "/jobsearch",
  //   icon: <AppWindow />,
  // },
  {
    id: nanoid(),
    label: "Job Tracker",
    href: "/addJob",
    icon: <Layers />,
  },

  {
    id: nanoid(),
    label: "Stats",
    href: "/stats",
    icon: <AreaChart />,
  },
  // {
  //   id: nanoid(),
  //   label: "AI Mock Interview",
  //   href: "/interview",
  //   icon: <Users />,
  // },
  {
    id: nanoid(),
    label: "Interviewing Tools",
    href: "/resources",
    icon: <UserCheck2 />,
  },
  {
    id: nanoid(),
    label: "Pricing",
    href: "/billing",
    icon: <CreditCard />,
  },

  {
    id: nanoid(),
    label: "FAQs",
    href: "/faq",
    icon: <MessageCircleQuestion />,
  },
  {
    id: nanoid(),
    label: "Support",
    href: "/support",
    icon: <CircleHelp />,
  },
];

export default links;
