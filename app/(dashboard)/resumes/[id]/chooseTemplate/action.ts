"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

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

  const pollForParsed = async (id: string, maxAttempts = 15) => {
    let attempts = 0;
    while (attempts < maxAttempts) {
      console.log(`🔍 Polling DB for parsed resume... Attempt ${attempts + 1}`);
      const data = await prisma.resume.findUnique({
        where: { id },
        include: { education: true, workExperience: true },
      });

      if (data?.parsed) {
        console.log("✅ Resume is parsed and ready.");
        return data;
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    console.error("⏰ Resume parsing timed out.");
    throw new Error("Resume parsing timed out. Please try again later.");
  };

  const parsedData = await pollForParsed(resumeId);
  const newResume = await prisma.resume.create({
    data: {
      userId: uploadedResume.userId,
      user: { connect: { clerkId: uploadedResume.userId } },

      resumeTitle: parsedData.resumeTitle || "Untitled",
      resumeType,
      rawTextContent: uploadedResume.rawTextContent,
      summary: parsedData.summary || "",

      // Flattened personal info
      firstName: parsedData?.firstName,
      lastName: parsedData?.lastName,
      jobTitle: parsedData?.jobTitle,
      email: parsedData?.email,
      phone: parsedData?.phone,
      address: parsedData?.address,
      website: parsedData?.website,
      linkedin: parsedData?.linkedin,
      gitHub: parsedData?.gitHub,

      techSkills: {
        create: parsedData.skills?.map((s: string) => ({ name: s })) || [],
      },

      education: {
        create:
          parsedData.education?.map((edu) => ({
            description: edu.description,
            degree: edu.degree,
            school: edu.school,
            location: edu.location,
            createdAt: edu.createdAt,
            updatedAt: edu.updatedAt,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })) || [],
      },

      workExperience: {
        create:
          parsedData.workExperience?.map((job) => {
            const { resumeId, id, ...jobInfo } = job;

            return {
              ...jobInfo,
              startDate: jobInfo.startDate
                ? new Date(jobInfo.startDate)
                : undefined,
              endDate: jobInfo.endDate ? new Date(jobInfo.endDate) : undefined,
            };
          }) || [],
      },
    },
  });

  redirect(`/editor?resumeId=${newResume.id}&resumeType=${resumeType}`);
}
