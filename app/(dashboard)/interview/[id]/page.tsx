// import { getInterviewById } from "@/utils/actions";
// import { getRandomInterviewCover } from "@/utils/utils";
// import { redirect } from "next/navigation";
// import React from "react";
// import Image from "next/image";
// import DisplayTechIcons from "@/components/ui/DisplayTechIcons";
// import Agent from "@/components/mockinterview/Agent";
// import { currentUser } from "@clerk/nextjs/server";
// import SectionTitle from "@/components/SectionTitle";

// const Page = async ({ params }: RouteParams) => {
//   const user = await currentUser();
//   const { id } = await params;
//   const interview = await getInterviewById(id);

//   if (!interview) redirect("/interview");
//   return (
//     <>
//     <SectionTitle text="Mock Interview" subtext="Click on the call button to begin your interview."/>
//       <div className="flex flex-row gap-4 justify-between">
//         <div className="flex flex-row gap-4 items-center max-sm:flex-col">
//           <div className="flex flex-row gap-4 items-center">
//             <Image
//               src={getRandomInterviewCover()}
//               alt="cover-image"
//               width={40}
//               height={40}
//               className="rounded-full object-cover size-[4opx]"
//             />
//             <h3 className="capitalize">{interview.role} Interview</h3>
//             <DisplayTechIcons techStack={interview.techstack} />
//             <p className="bg-gray-600 px-4 py-2 rounded-lg h-fit text-white capitalize">
//               {interview.type}
//             </p>
//           </div>
//           <Agent
//             userName={user?.firstName || "Guest"}
//             userId={user?.id}
//             interviewId={id}
//             type="interview"
//             questions={interview.questions}
//           />
//         </div>
//       </div>
//     </>
//   );
// };
// export default Page;
import { getInterviewById } from "@/utils/actions";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import DisplayTechIcons from "@/components/ui/DisplayTechIcons";
import Agent from "@/components/mockinterview/Agent";
import { currentUser } from "@clerk/nextjs/server";
import SectionTitle from "@/components/SectionTitle";
import { getRandomInterviewCover } from "@/utils/utils";

interface RouteParams {
  params: {
    id: string;
  };
}

const Page = async ({ params }: RouteParams) => {
  const user = await currentUser();
  const interview = await getInterviewById(params.id);

  if (!interview) redirect("/interview");

  return (
    <>
      <SectionTitle
        text="Mock Interview"
        subtext="Engage in a realistic voice interview tailored to your role and experience. Click the call button to practice real-world interview scenarios with an intelligent AI assistant.."
      />

      <div className="flex flex-col gap-6">
        {/* Interview Details */}
        <div className="flex flex-wrap items-center gap-4">
          <Image
            src={getRandomInterviewCover()}
            alt="cover image"
            width={40}
            height={40}
            className="rounded-full object-cover size-[40px]"
          />

          <h3 className="capitalize font-medium text-2xl">
            {interview.role} Interview
          </h3>

          <DisplayTechIcons techStack={interview.techstack || []} />

          <p className="bg-gray-600 px-4 py-2 rounded-lg text-white capitalize">
            {interview.type}
          </p>
        </div>

        {/* Agent Component */}
        <Agent
          userName={user?.firstName || "Guest"}
          userId={user?.id}
          interviewId={interview.id}
          type="interview"
          questions={interview.questions}
          imageUrl={user?.imageUrl || ""}
        />
      </div>
    </>
  );
};

export default Page;
