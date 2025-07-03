// "use client"; // Enables client-side hooks like useState, useEffect, etc.

// import SectionTitle from "@/components/SectionTitle";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { getSteps } from "./steps";

// import Breadcrumbs from "./Breadcrumbs"; // Navigation steps UI
// import Footer from "./forms/Footer"; // Navigation + status bar
// import { ResumeValues } from "@/lib/validation";
// import ResumePreviewContainer from "./ResumePreviewContainer";
// import { cn, mapToResumeValues } from "@/lib/utils"; // cn = className joiner, mapToResumeValues = transforms DB data into form-ready format
// import useUnloadWarning from "@/hooks/useUnloadWarning"; // Warns user if they try to leave with unsaved changes
// import useAutoSaveResume from "./useAutoSaveResume"; // Tracks and autosaves resume changes
// import { ResumeServerData } from "@/lib/types"; // Resume type from DB
// import { parseResumeWithAI, saveParsedResumeData } from "./forms/action"; // AI parsing logic for uploaded resumes
// import SkeletonForm from "./forms/SkeletonForm"; // Placeholder skeleton shown while parsing

// interface ResumeEditorProps {
//   resumeToEdit: ResumeServerData | null; // Incoming resume to edit, or null if new
// }

// function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
//   const searchParams = useSearchParams(); // For reading ?step= and ?resumeType=
//   const [isParsing, setIsParsing] = useState(false); // State to track whether parsing is in progress
//   const resumeTypeFromTemplate = searchParams.get("resumeType") || ""; // Resume type pulled from URL

//   // Initialize resumeData state
//   const [resumeData, setResumeData] = useState<ResumeValues>(() => {
//     if (resumeToEdit) {
//       // If resume has structured sections already, map them to form format
//       if (
//         resumeToEdit.education?.length ||
//         resumeToEdit.workExperience?.length ||
//         resumeToEdit.techSkills?.length
//       ) {
//         return mapToResumeValues(resumeToEdit);
//       }

//       // If resume has only raw text (e.g. uploaded), fall back to empty form + template
//       return {
//         resumeTitle: "",
//         description: "",
//         resumeType: resumeTypeFromTemplate,
//       };
//     }

//     // Brand new resume with no existing data
//     return {
//       resumeTitle: "",
//       description: "",
//       resumeType: resumeTypeFromTemplate,
//     };
//   });

//   // AI-powered resume parsing logic (for uploaded text-based resumes)
//   useEffect(() => {
//     const controller = new AbortController(); // Abort controller in case user navigates away

//     // Only parse if rawTextContent exists and there are no structured entries
//     const shouldParse =
//       resumeToEdit &&
//       resumeToEdit.rawTextContent &&
//       !resumeToEdit.education?.length &&
//       !resumeToEdit.workExperience?.length &&
//       !resumeToEdit.techSkills?.length;

//     const parse = async () => {
//       if (shouldParse && resumeToEdit?.rawTextContent) {
//         setIsParsing(true); // Show skeleton UI

//         const parsed = await parseResumeWithAI(resumeToEdit.rawTextContent); // Use AI to extract structured info

//         if (parsed && !controller.signal.aborted) {
//           // Update form data with parsed values
//           setResumeData((prev) => ({
//             ...prev,
//             ...parsed,
//             resumeType: resumeTypeFromTemplate || prev.resumeType,
//           }));

//           // Save structured data to DB
//           await saveParsedResumeData(resumeToEdit.id, parsed);
//         }

//         if (!controller.signal.aborted) {
//           setIsParsing(false); // Hide skeleton once parsing finishes
//         }
//       }
//     };

//     parse();

//     return () => {
//       controller.abort(); // Cancel parse if component unmounts
//       setIsParsing(false);
//     };
//   }, [resumeToEdit, resumeTypeFromTemplate]);

//   // Fetch step definitions based on resume type
//   const steps = getSteps(resumeData.resumeType);

//   // Track whether preview is shown on mobile
//   const [showSmResumePreview, setShowSmResumePreview] = useState(false);

//   // Handle autosave and warn if user tries to leave with unsaved changes
//   const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
//   useUnloadWarning(hasUnsavedChanges);

//   // Get current step from URL, fallback to first step
//   const currentStep = searchParams.get("step") || steps[0].key;

//   // Set step and update browser URL
//   function setStep(key: string) {
//     const newSearchParams = new URLSearchParams(searchParams);
//     newSearchParams.set("step", key);
//     window.history.pushState(null, "", `?${newSearchParams.toString()}`);
//   }

//   // Get the form component for the current step
//   const FormComponent = steps.find(
//     (step) => step.key === currentStep
//   )?.component;

//   return (
//     <div className="flex grow flex-col">
//       {/* Header with title and instructions */}
//       <header className="px-3 font-semibold">
//         <SectionTitle
//           text="Build Your Resume"
//           subtext=" Follow the steps below to create your resume. Your progress will be saved automatically."
//         />
//       </header>

//       {/* Main content: left = form, right = preview */}
//       <main className="relative grow">
//         <div className="absolute bottom-0 top-0 flex w-full">
//           {/* Left side: step-by-step form editor */}
//           <div
//             className={cn(
//               "p-3 space-y-6 overflow-y-auto w-full md:w-1/2",
//               showSmResumePreview && "hidden" // Hide on mobile if preview is open
//             )}>
//             <Breadcrumbs
//               currentStep={currentStep}
//               setCurrentStep={setStep}
//               resumeType={resumeData.resumeType}
//             />

//             {/* Render current step’s form */}
//             {FormComponent && (
//               <FormComponent
//                 resumeData={resumeData}
//                 setResumeData={setResumeData}
//               />
//             )}
//           </div>

//           {/* Right side: live preview */}
//           <div className="md:block md:w-1/2 border-l">
//             {isParsing ? (
//               <SkeletonForm /> // Show loading placeholder while parsing
//             ) : (
//               <ResumePreviewContainer
//                 resumeData={resumeData}
//                 setResumeData={setResumeData}
//                 className={cn("h-full w-full", showSmResumePreview && "flex")}
//               />
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Footer with next/back buttons and save status */}
//       <Footer
//         currentStep={currentStep}
//         setCurrentStep={setStep}
//         showSmResumePreview={showSmResumePreview}
//         setShowSmResumePreview={setShowSmResumePreview}
//         isSaving={isSaving}
//       />
//     </div>
//   );
// }

// export default ResumeEditor;
"use client";

import SectionTitle from "@/components/SectionTitle";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSteps } from "./steps";

import Breadcrumbs from "./Breadcrumbs";
import Footer from "./forms/Footer";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewContainer from "./ResumePreviewContainer";
import { cn, mapToResumeValues } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "./useAutoSaveResume";
import { ResumeServerData } from "@/lib/types";
import { parseResumeWithAI, saveParsedResumeData } from "./forms/action";
import SkeletonForm from "./forms/SkeletonForm";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resumeTypeFromURL = searchParams.get("resumeType") || "";
  //const resumeId = searchParams.get("resumeId");
  const stepParam = searchParams.get("step");

  const [isParsing, setIsParsing] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeValues>(() => {
    if (resumeToEdit) {
      if (
        resumeToEdit.education?.length ||
        resumeToEdit.workExperience?.length ||
        resumeToEdit.techSkills?.length
      ) {
        return mapToResumeValues(resumeToEdit);
      }

      return {
        resumeTitle: "",
        description: "",
        resumeType: resumeTypeFromURL,
      };
    }

    return {
      resumeTitle: "",
      description: "",
      resumeType: resumeTypeFromURL,
    };
  });

  const steps = getSteps(resumeData.resumeType);
  const validStepKeys = steps.map((s) => s.key);

  const [currentStep, setCurrentStep] = useState(steps[0]?.key || "");

  // Parse AI resume if needed
  useEffect(() => {
    const controller = new AbortController();
    const shouldParse =
      resumeToEdit &&
      resumeToEdit.rawTextContent &&
      !resumeToEdit.education?.length &&
      !resumeToEdit.workExperience?.length &&
      !resumeToEdit.techSkills?.length;

    const parse = async () => {
      if (shouldParse && resumeToEdit?.rawTextContent) {
        setIsParsing(true);
        const parsed = await parseResumeWithAI(resumeToEdit.rawTextContent);

        if (parsed && !controller.signal.aborted) {
          setResumeData((prev) => ({
            ...prev,
            ...parsed,
            resumeType: resumeTypeFromURL || prev.resumeType,
          }));
          await saveParsedResumeData(resumeToEdit.id, parsed);
        }

        if (!controller.signal.aborted) {
          setIsParsing(false);
        }
      }
    };

    parse();
    return () => controller.abort();
  }, [resumeToEdit, resumeTypeFromURL]);

  // Handle step validation & default
  useEffect(() => {
    if (stepParam && validStepKeys.includes(stepParam)) {
      setCurrentStep(stepParam);
    } else {
      setCurrentStep(steps[0]?.key || "");

      // Optional: auto-correct URL step param
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("step", steps[0]?.key || "");
      router.replace(`?${newParams.toString()}`);
    }
  }, [stepParam, steps, validStepKeys, router, searchParams]);

  // Step change function
  const updateStep = (key: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("step", key);
    window.history.pushState(null, "", `?${newParams.toString()}`);
    setCurrentStep(key);
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  return (
    <div className="flex grow flex-col">
      <header className="px-3 font-semibold">
        <SectionTitle
          text="Build Your Resume"
          subtext="Follow the steps below to create your resume. Your progress will be saved automatically."
        />
      </header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "p-3 space-y-6 overflow-y-auto w-full md:w-1/2",
              showSmResumePreview && "hidden"
            )}>
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={updateStep}
              resumeType={resumeData.resumeType}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>

          <div className="md:block md:w-1/2 border-l">
            {isParsing ? (
              <SkeletonForm />
            ) : (
              <ResumePreviewContainer
                resumeData={resumeData}
                setResumeData={setResumeData}
                className={cn("h-full w-full", showSmResumePreview && "flex")}
              />
            )}
          </div>
        </div>
      </main>

      <Footer
        currentStep={currentStep}
        setCurrentStep={updateStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
        resumeType={resumeData.resumeType}
      />
    </div>
  );
}

export default ResumeEditor;
