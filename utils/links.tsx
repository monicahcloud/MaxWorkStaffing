"use client";

import { CreditCard, FilePen, HomeIcon, List, Users2 } from "lucide-react";
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
  // {
  //   id: nanoid(),
  //   label: "Add A Job",
  //   href: "/add-job",
  //   icon: <Blocks />,
  // },
  // {
  //   id: nanoid(),
  //   label: "Jobs",
  //   href: "/jobs",
  //   icon: <Blocks />,
  // },
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
];

export default links;
