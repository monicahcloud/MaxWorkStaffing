// "use client";
// import React, { useRef } from "react";
// import useDimensions from "@/hooks/useDimensions";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { CoverLetterValues } from "@/lib/validation";

// interface Props {
//   coverletterData: CoverLetterValues;
//   className?: string;
//   contentRef?: React.Ref<HTMLDivElement>;
// }

// export function TodahTemplate({
//   coverletterData,
//   className,
//   contentRef,
// }: Props) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

//   return (
//     <div
//       className={cn(
//         "bg-white text-black h-fit w-full aspect-[210/297]",
//         className
//       )}
//       ref={containerRef}>
//       <div
//         className={cn("", !width && "invisible")}
//         style={{
//           zoom: (1 / 794) * width,
//         }}
//         ref={contentRef}
//         id="resumePreviewContent">
//         <TodahHeaderSection coverletterData={coverletterData} />
//         <TodahBodySection coverletterData={coverletterData} />
//         <TodahSignatureSection coverletterData={coverletterData} />
//       </div>
//     </div>
//   );
// }

// // --- Header Section ---
// function TodahHeaderSection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   const { firstName, lastName, userAddress, userPhone, userEmail, jobTitle } =
//     coverletterData;

//   return (
//     <div className="flex flex-col mt-10 font-serif mx-10">
//       <div className="flex items-end space-x-4">
//         <h1 className="text-4xl font-serif leading-none tracking-wider items-start uppercase">
//           {firstName} {lastName}
//         </h1>
//       </div>
//       <div className="flex flex-col">
//         <div className="flex  items-center justify-between">
//           <h2 className="text-2xl font-serif leading-none tracking-wide">
//             {jobTitle}
//           </h2>
//           <p className="text-md">{userPhone}</p>
//         </div>

//         <div className="flex flex-col text-end">
//           <p className="text-md">{userEmail}</p>
//           <p className="text-md">{userAddress}</p>
//         </div>
//         <div className="h-0.5 w-full bg-black my-2" />
//       </div>
//     </div>
//   );
// }

// // --- Body Section ---
// function TodahBodySection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   const {
//     recipientName,
//     companyName,
//     companyPhone,
//     companyEmail,
//     companyAddress,
//     body,
//   } = coverletterData;

//   return (
//     <div className="text-left mt-6 mx-10 leading-relaxed font-serif">
//       <p className="text-xl text-end mt-5 mb-5">
//         {new Date().toLocaleDateString()}
//       </p>
//       <p className="text-md">{recipientName}</p>
//       <p className="text-md">{companyName}</p>
//       <p className="text-md mt-5">{companyPhone}</p>
//       <p className="text-md">{companyEmail}</p>
//       <p className="text-md">{companyAddress}</p>
//       <div className="space-y-5 leading-relaxed mt-5">
//         <h1>
//           {recipientName ? `Dear ${recipientName},` : "To Whom It May Concern,"}
//         </h1>
//         <div
//           className="space-y-5 leading-relaxed mt-5 text-md"
//           dangerouslySetInnerHTML={{
//             __html:
//               body ||
//               `<p>A cover letter allows you to professionally introduce yourself...</p>`,
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// // --- Signature Section ---
// function TodahSignatureSection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   const { signatureUrl, firstName, lastName } = coverletterData;
//   const displayName =
//     firstName || lastName
//       ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
//       : "Your Name";

//   return (
//     <div className="mt-5 text-md space-y-2 mx-10 font-serif">
//       <p>Sincerely,</p>
//       {signatureUrl ? (
//         <div className="w-[250px] -ml-10 ">
//           <Image
//             src={signatureUrl}
//             alt="Signature"
//             width={200}
//             height={100}
//             className="object-contain"
//           />
//         </div>
//       ) : (
//         <p className="italic text-xl">{displayName}</p>
//       )}
//     </div>
//   );
// }
