"use client";

import { Card } from "@/components/ui/card";
import { FileSearch, FileText, NotebookPen } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const toolCards = [
  {
    icon: <FileText className="text-blue-600 w-6 h-6" />,
    title: "Create A Resume",
    linkHref: "resumebuilder",
  },
  {
    icon: <NotebookPen className="text-blue-600 w-6 h-6" />,
    title: "Create A Cover Letter",
    linkHref: "coverletterbuilder",
  },
  {
    icon: <FileSearch className="text-blue-600 w-6 h-6" />,
    title: "Job Search",
    linkHref: "jobsearch",
  },
  // {
  //   icon: <File className="text-blue-600 w-6 h-6" />,
  //   title: " Job Tracker",
  //   linkHref: "addJob",
  // },
];

export const ResumeTools = () => {
  const router = useRouter();

  return (
    <section className="space-y-8">
      <div>
        <h3 className="text-2xl font-extrabold text-blue-900 mb-4">
          Explore Our Job Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {toolCards.map((tool, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => router.push(`/${tool.linkHref}`)}
              className="text-left w-full">
              <Card className="p-6 border border-gray-300 rounded-lg hover:shadow-md transition">
                <span className="flex items-center space-x-3">
                  <span>{tool.icon}</span>
                  <span className="text-lg font-semibold text-blue-900">
                    {tool.title}
                  </span>
                </span>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
