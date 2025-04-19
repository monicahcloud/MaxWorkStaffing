"use client";

import {
  AppWindow,
  AreaChart,
  CircleHelp,
  CreditCard,
  FilePen,
  HomeIcon,
  Layers,
  List,
  MessageCircleQuestion,
  SquareTerminal,
  Users2,
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
    label: "Resume Builder",
    href: "/resumebuilder",
    icon: <FilePen />,
  },

  {
    id: nanoid(),
    label: "Add Job",
    href: "/addJob",
    icon: <Layers />,
  },
  {
    id: nanoid(),
    label: "All Jobs",
    href: "/jobs",
    icon: <AppWindow />,
  },
  {
    id: nanoid(),
    label: "Stats",
    href: "/stats",
    icon: <AreaChart />,
  },
  {
    id: nanoid(),
    label: "Interview Prep",
    href: "/resources",
    icon: <Users2 />,
  },
  {
    id: nanoid(),
    label: "Billing",
    href: "/billing",
    icon: <CreditCard />,
  },
  {
    id: nanoid(),
    label: "Services",
    href: "/services",
    icon: <SquareTerminal />,
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
