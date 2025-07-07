// "use client";

// import React, { useState } from "react";
// import Image, { StaticImageData } from "next/image";

// type SectionWithSideVideoProps = {
//   title: string;
//   description: string;
//   video: string;
//   poster: StaticImageData | string;
//   children: React.ReactNode;
// };

// const SectionWithSideVideo = ({
//   title,
//   description,
//   video,
//   poster,
//   children,
// }: SectionWithSideVideoProps) => {
//   const [play, setPlay] = useState(false);

//   return (
//     <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start max-w-7xl mx-auto px-4 py-12">
//       {/* Left - Video Column (narrower & centered) */}
//       <div className="flex justify-center items-center">
//         <div className="w-full max-w-md aspect-video rounded-lg overflow-hidden border shadow relative">
//           {play ? (
//             <iframe
//               src={`${video}?autoplay=1`}
//               className="w-full h-full"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             />
//           ) : (
//             <div
//               className="relative w-full h-full cursor-pointer"
//               onClick={() => setPlay(true)}>
//               <Image
//                 src={poster}
//                 alt="Video Preview"
//                 className="w-full h-full object-cover"
//                 width={1280}
//                 height={720}
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-white text-5xl bg-red-600 rounded-full p-4">
//                   ▶
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right - Text + Children */}
//       <div className="flex flex-col justify-center">
//         <h2 className="text-3xl font-bold text-red-600 mb-4">{title}</h2>
//         <p className="text-gray-700 mb-6">{description}</p>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default SectionWithSideVideo;
