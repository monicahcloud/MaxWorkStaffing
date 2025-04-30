// "use client";
// import SectionTitle from "@/components/SectionTitle";
// import React, { useState } from "react";
// import { resumeTemplates } from "./ResumeTemplate";
// import ResumeTemplateCard from "./ResumeTemplateCard";
// import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing chevron icons

// function Page() {
//   // Set initial index for the gallery to show the first set of 3 templates
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const templatesPerPage = 3;

//   // Handle next button click
//   const handleNext = () => {
//     if (currentIndex + templatesPerPage < resumeTemplates.length) {
//       setCurrentIndex(currentIndex + templatesPerPage);
//     }
//   };

//   // Handle previous button click
//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - templatesPerPage);
//     }
//   };

//   // Get the current templates to display based on the current index
//   const currentTemplates = resumeTemplates.slice(
//     currentIndex,
//     currentIndex + templatesPerPage
//   );

//   return (
//     <>
//       <div className="px-4">
//         <SectionTitle text="Choose a Template" subtext="" />

//         {/* Navigation buttons */}
//         <div className="flex justify-between mt-4 items-center">
//           {/* Previous chevron */}
//           <button
//             onClick={handlePrevious}
//             disabled={currentIndex === 0}
//             className="bg-slate-700 text-white p-2 rounded disabled:opacity-50 text-sm">
//             <ChevronLeft size={20} />
//           </button>

//           {/* Gallery container */}
//           <div className="flex overflow-x-auto space-x-6 py-4">
//             {currentTemplates.map((template) => (
//               <div key={template.title} className="flex-shrink-0 w-80">
//                 <ResumeTemplateCard template={template} />
//               </div>
//             ))}
//           </div>

//           {/* Next chevron */}
//           <button
//             onClick={handleNext}
//             disabled={currentIndex + templatesPerPage >= resumeTemplates.length}
//             className="bg-slate-700 text-white p-2 rounded disabled:opacity-50 text-sm">
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Page;
"use client";
import SectionTitle from "@/components/SectionTitle";
import React from "react";
import { resumeTemplates } from "./ResumeTemplate";
import ResumeTemplateCard from "./ResumeTemplateCard";
import ResumeBuilderTourButton from "@/components/tourGuide/ResumeBuilderTourButton";

function Page() {
  return (
    <>
      <div className="justify-center items-center mx-auto flex">
        <ResumeBuilderTourButton />
      </div>
      <div id="templates" className="px-4 templates">
        <SectionTitle
          text="Choose a Template"
          subtext="Create a brand new resume from scratch"
        />
      </div>
      <div>
        {/* Grid container */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
          {resumeTemplates.map((template) => (
            <div key={template.title} className="w-full">
              <ResumeTemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
