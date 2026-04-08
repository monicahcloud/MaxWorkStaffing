// import DeleteInterviewButton from "@/components/mockinterview/DeleteInterviewButton";
// import { Button } from "@/components/ui/button";
// import { getInterviewCover } from "@/utils/utils";
// import dayjs from "dayjs";
// import { Calendar1, Layers3, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// function formatInterviewType(type: string) {
//   switch (type) {
//     case "behavioral":
//       return "Behavioral";
//     case "role-specific":
//       return "Role-Specific";
//     case "leadership":
//       return "Leadership";
//     default:
//       return "Mixed";
//   }
// }

// function InterviewCard({
//   id,
//   role,
//   type,
//   techstack,
//   clerkId,
//   createdAt,
//   industry,
// }: InterviewCardProps) {
//   // Replace this later with real feedback lookup if needed
//   const feedback = null as Feedback | null;

//   const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");
//   const normalizedType = formatInterviewType(type);
//   const coverSrc = getInterviewCover(industry || "general");

//   const previewTopics = techstack?.slice(0, 2) || [];

//   return (
//     <div className="mx-auto mb-5 min-h-96 w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5">
//       <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1C20] to-[#08090D] p-6">
//         {/* Type badge */}
//         <p className="absolute right-0 top-0 w-fit rounded-bl-lg bg-slate-500 px-4 py-2 text-sm font-semibold capitalize text-white">
//           {normalizedType}
//         </p>

//         <div>
//           {/* Cover + title */}
//           <Image
//             src={coverSrc}
//             alt={`${industry || "general"} interview cover`}
//             width={90}
//             height={90}
//             className="size-[90px] rounded-full object-cover"
//           />

//           <h3 className="mt-5 text-xl capitalize text-white">
//             {role} Interview
//           </h3>

//           {/* Meta row */}
//           <div className="mt-3 flex flex-wrap gap-4 text-white">
//             <div className="flex items-center gap-2">
//               <Calendar1 className="h-4 w-4" />
//               <p className="text-sm">{formattedDate}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <Star className="h-4 w-4" />
//               <p className="text-sm">
//                 {feedback ? `${feedback.totalScore}/100` : "---/100"}
//               </p>
//             </div>
//           </div>

//           {/* Industry */}
//           {industry && (
//             <p className="mt-3 text-sm text-slate-300">
//               Industry: <span className="text-white">{industry}</span>
//             </p>
//           )}

//           {/* Summary */}
//           <p className="mt-5 line-clamp-2 text-sm leading-7 text-slate-300">
//             {feedback?.finalAssessment ||
//               "You have not taken this interview yet. Start when you're ready."}
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="flex items-end justify-between gap-4 text-white">
//           <div className="flex flex-wrap gap-2">
//             {previewTopics.length > 0 ? (
//               previewTopics.map((topic) => (
//                 <span
//                   key={topic}
//                   className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
//                   {topic}
//                 </span>
//               ))
//             ) : (
//               <div className="flex items-center gap-2 text-sm text-slate-400">
//                 <Layers3 className="h-4 w-4" />
//                 <span>General interview</span>
//               </div>
//             )}
//           </div>

//           <div className="mt-4 flex flex-wrap gap-2">
//             <Button
//               asChild
//               className="rounded-3xl bg-gray-400 text-black hover:bg-gray-300">
//               <Link
//                 href={
//                   feedback ? `/interview/${id}/feedback` : `/interview/${id}`
//                 }>
//                 {feedback ? "Check Feedback" : "View Interview"}
//               </Link>
//             </Button>

//             {clerkId && id && (
//               <DeleteInterviewButton interviewId={id} clerkId={clerkId} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InterviewCard;
import DeleteInterviewButton from "@/components/mockinterview/DeleteInterviewButton";
import { Button } from "@/components/ui/button";
import { getInterviewCover } from "@/utils/utils";
import dayjs from "dayjs";
import { Calendar1, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function formatInterviewType(type: string) {
  switch (type) {
    case "behavioral":
      return "Behavioral";
    case "role-specific":
      return "Role-Specific";
    case "leadership":
      return "Leadership";
    default:
      return "Mixed";
  }
}

interface InterviewCardProps {
  id?: string;
  role: string;
  type: string;
  techstack: string[];
  clerkId?: string;
  createdAt?: string;
  industry?: string | null;
  finalized?: boolean;
  isCompletedView?: boolean;
}

function InterviewCard({
  id,
  role,
  type,
  techstack,
  clerkId,
  createdAt,
  industry,
  finalized,
  isCompletedView = false,
}: InterviewCardProps) {
  const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");
  const normalizedType = formatInterviewType(type);
  const coverSrc = getInterviewCover(industry || "general");
  const previewTopics = techstack?.slice(0, 2) || [];

  // On the /interview dashboard, cards represent completed interviews,
  // so the primary action should be feedback.
  const primaryHref =
    isCompletedView || finalized
      ? `/interview/${id}/feedback`
      : `/interview/${id}`;

  const primaryLabel =
    isCompletedView || finalized ? "View Feedback" : "View Interview";

  return (
    <div className="mx-auto mb-5 min-h-96 w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33] p-0.5">
      <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1C20] to-[#08090D] p-6">
        {/* Type badge */}
        <p className="absolute right-0 top-0 w-fit rounded-bl-lg bg-slate-500 px-4 py-2 text-sm font-semibold capitalize text-white">
          {normalizedType}
        </p>

        <div>
          {/* Cover + title */}
          <Image
            src={coverSrc}
            alt={`${industry || "general"} interview cover`}
            width={90}
            height={90}
            className="size-[90px] rounded-full object-cover"
          />

          <h3 className="mt-5 text-xl capitalize text-white">
            {role} Interview
          </h3>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap gap-4 text-white">
            <div className="flex items-center gap-2">
              <Calendar1 className="h-4 w-4" />
              <p className="text-sm">{formattedDate}</p>
            </div>
          </div>

          {/* Industry */}
          {industry && (
            <p className="mt-3 text-sm text-slate-300">
              Industry: <span className="text-white">{industry}</span>
            </p>
          )}

          {/* Summary */}
          <p className="mt-5 line-clamp-2 text-sm leading-7 text-slate-300">
            {isCompletedView || finalized
              ? "Feedback is available for this interview. Open the report to review your performance and coaching insights."
              : "This interview is ready to continue."}
          </p>
        </div>

        {/* Footer */}
        <div className="space-y-4 text-white">
          <div className="flex flex-wrap gap-2">
            {previewTopics.length > 0 ? (
              previewTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {topic}
                </span>
              ))
            ) : (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Layers3 className="h-4 w-4" />
                <span>General interview</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              className="rounded-3xl bg-gray-400 text-black hover:bg-gray-300">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>

            {clerkId && id && (
              <DeleteInterviewButton interviewId={id} clerkId={clerkId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
