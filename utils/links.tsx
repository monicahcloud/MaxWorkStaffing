"use client";

import { Blocks, File, FilePen, HomeIcon, List, Users2 } from "lucide-react";
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
    label: "Applications",
    href: "/applications",
    icon: <File />,
  },
  {
    id: nanoid(),
    label: "Resume Builder",
    href: "/resumeBuilder",
    icon: <FilePen />,
  },
  {
    id: nanoid(),
    label: "Add A Job",
    href: "/add-job",
    icon: <Blocks />,
  },
  {
    id: nanoid(),
    label: "Jobs",
    href: "/jobs",
    icon: <Blocks />,
  },
  {
    id: nanoid(),
    label: "Interview Prep",
    href: "/resources",
    icon: <Users2 />,
  },
];

export default links;
