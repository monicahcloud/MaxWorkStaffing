// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { FormProvider } from "react-hook-form";
// import LetterBodyForm from "./LetterBody";
// import Signature from "@/components/SignaturePad";
// import UserInfoForm from "./UserInfoForm";
// import EmployerInfoForm from "./EmployerInfo";
// import { getContrastColor } from "@/lib/getContrastColor";
// import { templateStyles } from "../templates/templateStyles";
// import { CoverLetterValues } from "@/lib/validation";
// import { useEffect } from "react";

// const steps = [
//   { key: "user", label: "Personal Info" },
//   { key: "employer", label: "Employer Info" },
//   { key: "body", label: "Letter Body" },
//   { key: "signature", label: "Signature" },
// ];

// export function CoverLetterFormBuilder({
//   form,
//   stepIndex,
//   setSignatureUrl,
//   signatureUrl,
//   selectedTemplate,
//   setCoverLetterData,
// }: {
//   form: any;
//   stepIndex: number;
//   setSignatureUrl: (url: string) => void;
//   signatureUrl: string;
//   selectedTemplate: string;
//   coverletterData: CoverLetterValues;
//   setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterValues>>;
// }) {
//   const currentTemplateStyle = templateStyles[selectedTemplate] || {
//     background: "#ffffff",
//   };
//   const penColor = getContrastColor(currentTemplateStyle.background);

//   const stepComponents: Record<string, React.ReactNode> = {
//     user: <UserInfoForm selectedTemplate={selectedTemplate} />,
//     employer: <EmployerInfoForm />,
//     body: <LetterBodyForm />,
//     signature: (
//       <Signature
//         onSave={(dataUrl) => {
//           setSignatureUrl(dataUrl);
//           form.setValue("signatureUrl", dataUrl);
//         }}
//         defaultValue={signatureUrl}
//         penColor={penColor}
//         fontFamily={selectedTemplate === "Shabach" ? "cursive" : "serif"}
//       />
//     ),
//   };

//   useEffect(() => {
//     const subscription = form.watch((updatedValues) => {
//       setCoverLetterData(updatedValues);
//     });

//     return () => subscription.unsubscribe();
//   }, [form, setCoverLetterData]);

//   return (
//     <FormProvider {...form}>
//       <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
//         <div className="space-y-1.5 text-center">
//           <h2 className="text-2xl font-semibold">Cover Letter Builder</h2>
//           <p className="text-sm text-muted-foreground">
//             Step {stepIndex + 1} of {steps.length}
//           </p>
//         </div>
//         {stepComponents[steps[stepIndex].key]}
//       </form>
//     </FormProvider>
//   );
// }
