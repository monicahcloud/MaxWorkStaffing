// // app/resumeBuilder/ResumeTempleCard.tsx

// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";

// interface ResumeTemplate {
//   title: string;
//   image: string;
//   href: string;
//   description: string[];
//   resumeType: string; // Updated to resumeType
// }

// interface ResumeTemplateCardProps {
//   template: ResumeTemplate;
// }

// const ResumeTemplateCard: React.FC<ResumeTemplateCardProps> = ({
//   template,
// }) => {
//   const router = useRouter();
//   const [hovered, setHovered] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [resumeTitle, setResumeTitle] = useState("");

//   const handleCreateResume = async () => {
//     try {
//       const requestBody = {
//         title: resumeTitle,
//         resumeType: template.resumeType,
//       };

//       console.log("Request Body:", requestBody);

//       const res = await fetch("/api/create-resume", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await res.json();

//       if (res.ok && data?.message) {
//         // Redirect with resumeId
//         router.push(
//           `${template.href}?resumeId=${
//             data.resumeId
//           }&resumeTitle=${encodeURIComponent(resumeTitle)}`
//         );
//       } else {
//         console.error("Failed to create resume", data);
//       }
//     } catch (err) {
//       console.error("API Error", err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full max-w-[280px] mx-auto">
//       <h2 className="text-center text-lg font-semibold whitespace-nowrap mb-2">
//         {template.title}
//       </h2>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <div
//             className="cursor-pointer transition transform hover:scale-105 shadow-md rounded-lg overflow-hidden relative"
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}>
//             <div className="relative w-[200px] h-[280px] sm:w-[240px] sm:h-[320px]">
//               <Image
//                 src={template.image}
//                 alt={`${template.title} Template`}
//                 fill
//                 className={`object-cover rounded-lg transition-all duration-300 ${
//                   hovered ? "blur-md opacity-40" : "blur-0 opacity-100"
//                 }`}
//               />
//               {hovered && (
//                 <ul className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-800 bg-opacity-75 text-white text-md p-3 rounded-lg">
//                   {template.description.map((item, index) => (
//                     <li key={index} className="mb-1 text-center">
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </DialogTrigger>

//         {/* Dialog Box */}
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add a title for your new resume.</DialogTitle>
//           </DialogHeader>
//           <Input
//             placeholder="e.g. My Federal Resume"
//             value={resumeTitle}
//             onChange={(e) => setResumeTitle(e.target.value)}
//           />
//           <DialogFooter>
//             <Button onClick={handleCreateResume} disabled={!resumeTitle.trim()}>
//               Create & Continue
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ResumeTemplateCard;
