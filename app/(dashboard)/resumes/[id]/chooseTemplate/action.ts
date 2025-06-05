// "use server";

// import { redirect } from "next/navigation";
// import prisma from "@/lib/prisma";
// import { parseResumeWithAI } from "@/app/(dashboard)/editor/forms/action";

// export async function updateResumeType(formData: FormData) {
//   const resumeId = formData.get("resumeId")?.toString();
//   const resumeType = formData.get("resumeType")?.toString();

//   if (!resumeId || !resumeType) {
//     throw new Error("Missing resumeId or resumeType");
//   }

//   // Get uploaded resume (source of rawTextContent)
//   const uploadedResume = await prisma.resume.findUnique({
//     where: { id: resumeId },
//   });

//   if (!uploadedResume || !uploadedResume.rawTextContent) {
//     throw new Error("Uploaded resume not found or missing raw text");
//   }

//   // Parse text with AI again (or reuse logic)
//   const parsedData = await parseResumeWithAI(uploadedResume.rawTextContent);

//   // Create a new resume with parsed content and selected template
//   const newResume = await prisma.resume.create({
//     data: {
//       userId: uploadedResume.userId, // 👈 required
//       user: { connect: { clerkId: uploadedResume.userId } }, // 👈 required relation

//       resumeTitle: parsedData.resumeTitle || "Untitled",
//       resumeType,
//       rawTextContent: uploadedResume.rawTextContent,
//       ...parsedData,

//       techSkills: {
//         create:
//           parsedData.skills?.map((skill: string) => ({ name: skill })) || [],
//       },
//       education: {
//         create: parsedData.education || [],
//       },
//       workExperience: {
//         create:
//           parsedData.workExperience?.map((job: any) => ({
//             ...job,
//             startDate: job.startDate ? new Date(job.startDate) : undefined,
//             endDate: job.endDate ? new Date(job.endDate) : undefined,
//           })) || [],
//       },
//     },
//   });

//   // Redirect to the resume editor
//   redirect(`/editor?resumeId=${newResume.id}&resumeType=Uploaded`);
// }
"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { parseResumeWithAI } from "@/app/(dashboard)/editor/forms/action";

export async function updateResumeType(formData: FormData) {
  const resumeId = formData.get("resumeId")?.toString();
  const resumeType = formData.get("resumeType")?.toString();

  if (!resumeId || !resumeType) {
    throw new Error("Missing resumeId or resumeType");
  }

  const uploadedResume = await prisma.resume.findUnique({
    where: { id: resumeId },
  });

  if (!uploadedResume || !uploadedResume.rawTextContent) {
    throw new Error("Uploaded resume not found or missing raw text");
  }

  const parsedData = await parseResumeWithAI(uploadedResume.rawTextContent);

  const newResume = await prisma.resume.create({
    data: {
      userId: uploadedResume.userId,
      user: { connect: { clerkId: uploadedResume.userId } },

      resumeTitle: parsedData.resumeTitle || "Untitled",
      resumeType,
      rawTextContent: uploadedResume.rawTextContent,
      summary: parsedData.summary || "",

      // Flattened personal info
      firstName: parsedData.personalInfo?.firstName,
      lastName: parsedData.personalInfo?.lastName,
      jobTitle: parsedData.personalInfo?.jobTitle,
      email: parsedData.personalInfo?.email,
      phone: parsedData.personalInfo?.phone,
      address: parsedData.personalInfo?.address,
      website: parsedData.personalInfo?.website,
      linkedin: parsedData.personalInfo?.linkedin,
      gitHub: parsedData.personalInfo?.gitHub,

      techSkills: {
        create: parsedData.skills?.map((s: string) => ({ name: s })) || [],
      },

      education: {
        create:
          parsedData.education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })) || [],
      },

      workExperience: {
        create:
          parsedData.workExperience?.map((job) => ({
            ...job,
            startDate: job.startDate ? new Date(job.startDate) : undefined,
            endDate: job.endDate ? new Date(job.endDate) : undefined,
          })) || [],
      },
    },
  });

  redirect(`/editor?resumeId=${newResume.id}&resumeType=Uploaded`);
}
