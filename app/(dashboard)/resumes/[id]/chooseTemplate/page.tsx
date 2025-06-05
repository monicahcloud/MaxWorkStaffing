// "use client";
// import React from "react";
// import { useParams } from "next/navigation";
// import { useResume } from "@/hooks/useResume";
// import SectionTitle from "@/components/SectionTitle";
// import { resumeTemplates } from "@/app/(dashboard)/resumebuilder/ResumeTemplate";
// import ResumeTemplateCard from "@/app/(dashboard)/resumebuilder/ResumeTemplateCard";

// const ChooseTemplatePDF = () => {
//   const params = useParams();
//   const idParam = params.id;
//   const resumeId = Array.isArray(idParam) ? idParam[0] : idParam;

//   if (!resumeId) return <p>Invalid resume ID.</p>;
//   const { data: resume, isLoading, error } = useResume(resumeId);

//   if (isLoading) return <p>Loading...</p>;
//   if (error || !resume) return <p>Error loading resume.</p>;

//   return (
//     <div>
//       <SectionTitle
//         text="Choose a Template for:"
//         subtext={`${resume.resumeTitle || "Untitled"}`}
//       />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
//         {resumeTemplates.map((template) => (
//           <ResumeTemplateCard
//             key={template.resumeType}
//             template={template}
//             resumeId={resumeId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChooseTemplatePDF;

import Image from "next/image";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { resumeTemplates } from "@/app/(dashboard)/resumebuilder/ResumeTemplate";
import { updateResumeType } from "./action";
import SectionTitle from "@/components/SectionTitle";

export default async function ChooseTemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const resumeId = params.id;
  console.log("Rendering template chooser for resumeId:", resumeId);

  return (
    <>
      <div className="justify-center items-center mx-auto flex"></div>
      <div id="templates" className="px-4 templates">
        <SectionTitle
          text="Choose a Template"
          subtext="Create a brand new resume using your uploaded resume."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8">
        {resumeTemplates.map((template) => (
          <form
            key={template.title}
            action={updateResumeType}
            className="w-full">
            <input type="hidden" name="resumeId" value={resumeId} />
            <input
              type="hidden"
              name="resumeType"
              value={template.resumeType}
            />

            <button type="submit" className="w-full">
              <Card className="cursor-pointer hover:shadow-lg transition-all p-4">
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="relative w-[300px] h-[400px]">
                    <Image
                      src={template.image}
                      alt={template.title}
                      className="rounded-lg object-contain w-full h-full"
                    />
                  </div>
                  <div className="w-full border-t border-gray-300" />
                  <CardDescription className="text-center">
                    {template.title}
                  </CardDescription>
                </CardContent>
              </Card>
            </button>
          </form>
        ))}
      </div>
    </>
  );
}
