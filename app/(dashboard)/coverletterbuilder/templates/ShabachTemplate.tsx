// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { cn } from "@/lib/utils";
// import { CoverLetterValues } from "@/lib/validation";
// import useDimensions from "@/hooks/useDimensions";
// import fallbackImage from "../../../../assets/jobseeker.jpg";
// import { BorderStyles } from "../../editor/BorderStyleButton";
// import { Globe, Mail } from "lucide-react";

// interface CoverLetterPreviewProps {
//   coverletterData: CoverLetterValues;
//   className?: string;
//   contentRef?: React.Ref<HTMLDivElement>;
// }

// export function ShabachTemplate({
//   className,
//   coverletterData,
//   contentRef,
// }: CoverLetterPreviewProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { width } = useDimensions(containerRef as React.RefObject<HTMLElement>);

//   return (
//     <div
//       className={cn(
//         " aspect-[210/297] bg-black text-white print:bg-black print:text-white h-fit w-full",
//         className
//       )}
//       ref={containerRef}>
//       <div
//         className={cn("space-y-6 p-6 origin-top-left", !width && "invisible")}
//         style={{
//           zoom: (1 / 794) * width,
//         }}
//         ref={contentRef}
//         id="coverletterPreviewContent">
//         <div>
//           <MemoizedHeaderSection coverletterData={coverletterData} />
//           <MemoizedUserPhoto coverletterData={coverletterData} />
//           <MemoizedRecipientSection coverletterData={coverletterData} />
//           <MemoizedBodySection coverletterData={coverletterData} />
//           <MemoizedSignatureSection coverletterData={coverletterData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Subcomponents ---

// function HeaderSection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   return (
//     <div className="flex w-[100%] space-y-6  justify-between font-lora">
//       {/* Name Block */}
//       <div style={{ color: coverletterData.themeColor }}>
//         <h1 className="text-6xl font-lora leading-none tracking-wider uppercase">
//           {coverletterData.firstName || ""}
//         </h1>
//         <div className="h-1 w-20 bg-white my-9" />
//         <h2 className="text-6xl pl-25 -mt-20 font-lora tracking-wider uppercase">
//           {coverletterData.lastName || ""}
//         </h2>
//       </div>
//       {/* Contact Block */}
//       <div
//         className="text-lg text-right space-y-1 pr-8"
//         style={{ color: coverletterData.themeColor }}>
//         <p className="flex gap-2">
//           <Mail /> {coverletterData.userEmail || ""}
//         </p>
//         <p className="flex gap-2">
//           <Globe /> {coverletterData.website || ""}
//         </p>
//       </div>
//     </div>
//   );
// }
// const MemoizedHeaderSection = React.memo(HeaderSection);

// function UserPhoto({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   const { userPhoto, borderStyle } = coverletterData;

//   const [photoSrc, setPhotoSrc] = useState(
//     userPhoto instanceof File ? "" : userPhoto
//   );

//   useEffect(() => {
//     const objectUrl =
//       userPhoto instanceof File ? URL.createObjectURL(userPhoto) : "";
//     if (objectUrl) setPhotoSrc(objectUrl);
//     if (userPhoto === null) setPhotoSrc("");
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [userPhoto]);

//   return (
//     <div className="flex justify-end -my-10">
//       <div className="overflow-hidden">
//         <Image
//           src={photoSrc || fallbackImage}
//           alt="User Photo"
//           width={100}
//           height={100}
//           className="object-cover w-62"
//           style={{
//             borderRadius:
//               borderStyle === BorderStyles.SQUARE
//                 ? "0px"
//                 : borderStyle === BorderStyles.CIRCLE
//                 ? "9999px"
//                 : "10%",
//           }}
//           priority
//         />
//       </div>
//     </div>
//   );
// }
// const MemoizedUserPhoto = React.memo(UserPhoto);

// function RecipientSection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   return (
//     <div className=" text-lg -mt-50 font-lora">
//       <p className=" mb-5 ">
//         {new Date().toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })}
//       </p>
//       <p className=" text-white">{coverletterData.recipientName}</p>
//       <p>{coverletterData.companyName}</p>
//       <p>{coverletterData.companyAddress}</p>
//       <div className="h-px w-50 bg-white mt-4" />
//     </div>
//   );
// }
// const MemoizedRecipientSection = React.memo(RecipientSection);

// function BodySection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   return (
//     <div className="text-lg mt-5 font-lora text-white/90 space-y-5 leading-relaxed">
//       <p>
//         {coverletterData.recipientName
//           ? `Dear ${coverletterData.recipientName},`
//           : "To Whom It May Concern,"}
//       </p>

//       {coverletterData.body ? (
//         <div dangerouslySetInnerHTML={{ __html: coverletterData.body }} />
//       ) : (
//         <p>A cover letter allows you to professionally introduce yourself...</p>
//       )}
//     </div>
//   );
// }
// const MemoizedBodySection = React.memo(BodySection);

// function SignatureSection({
//   coverletterData,
// }: {
//   coverletterData: CoverLetterValues;
// }) {
//   const signatureUrl =
//     typeof coverletterData.signatureUrl === "string" &&
//     coverletterData.signatureUrl.trim() !== ""
//       ? coverletterData.signatureUrl
//       : undefined;
//   const displayName =
//     (coverletterData.firstName || "") + " " + (coverletterData.lastName || "");
//   return (
//     <div className="mt-4 text-lg font-lora ">
//       <p>Best Regards,</p>
//       {signatureUrl ? (
//         <div className="w-[500px] -ml-6">
//           <Image
//             src={signatureUrl}
//             alt="Signature"
//             width={275}
//             height={100}
//             className="object-contain"
//           />
//         </div>
//       ) : (
//         <p className="italic text-xl">{displayName}</p>
//       )}
//       <p className=""></p>
//     </div>
//   );
// }
// const MemoizedSignatureSection = React.memo(SignatureSection);
