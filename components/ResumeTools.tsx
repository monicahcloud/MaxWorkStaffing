// "use client";

// import { Card } from "@/components/ui/card";
// import { File, FileText, NotebookPen } from "lucide-react";

// const toolCards = [
//   {
//     icon: <FileText className="text-blue-600 w-6 h-6 " />,
//     title: "Create A Resume",
//     description: "Build a resume for the job you want. Fast and easy to use!",
//     linkText: "Get Resume",
//     linkHref: "resumebuilder",
//   },
//   {
//     icon: <NotebookPen className="text-blue-600 w-6 h-6 capitalize" />,
//     title: "Create A Cover Letter",
//     description:
//       "Instantly create a professional Cover Letter to impress employers.",
//     linkText: "Get Cover Letter",
//     linkHref: "coverletter",
//   },
//   {
//     icon: <File className="text-blue-600 w-6 h-6 " />,
//     title: "Add Job To Job Tracker",
//     description:
//       "Manage and monitor your job search with a simple, streamlined tracker.",
//     linkText: "Add Job",
//     linkHref: "addJob",
//   },
//   // {
//   //   icon: <IdCard className="text-blue-600 w-6 h-6" />,
//   //   title: "Claim Professional Profile",
//   //   description: "Be found by recruiters online with a professional profile",
//   //   linkText: "Get a Profile",
//   //   linkHref: "profile",
//   // },
// ];

// export const ResumeTools = () => {
//   return (
//     <section className=" space-y-8">
//       {/* Job Tools Section */}
//       <div>
//         <h3 className="text-2xl font-extrabold text-blue-900 mb-4">
//           Explore Our Job Tools
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {toolCards.map((tool, idx) => (
//             <Card
//               key={idx}
//               className="p-6 border border-gray-300 rounded-lg space-y-3">
//               <div>{tool.icon}</div>
//               <h4 className="text-lg font-bold text-blue-900">{tool.title}</h4>
//               <p className="text-sm text-gray-600">{tool.description}</p>
//               <a
//                 href={tool.linkHref}
//                 className="text-blue-600 font-semibold text-sm hover:underline">
//                 {tool.linkText}
//               </a>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

"use client";

import { Card } from "@/components/ui/card";
import { File, FileSearch, FileText, NotebookPen } from "lucide-react";
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
    linkHref: "coverletter",
  },
  {
    icon: <FileSearch className="text-blue-600 w-6 h-6" />,
    title: "Job Search",
    linkHref: "jobsearch",
  },
  {
    icon: <File className="text-blue-600 w-6 h-6" />,
    title: " Job Tracker",
    linkHref: "addJob",
  },
];

export const ResumeTools = () => {
  const router = useRouter();

  return (
    <section className="space-y-8">
      <div>
        <h3 className="text-2xl font-extrabold text-blue-900 mb-4">
          Explore Our Job Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
