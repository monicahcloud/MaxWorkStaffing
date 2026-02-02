import prisma from "./prisma";

export async function getResumeByShareToken(token: string) {
  return await prisma.resume.findFirst({
    where: {
      shareToken: token,
    },
    include: {
      workExperience: true,
      education: true,
      techSkills: true,
      // certifications: true,
      // projects: true,
      // languages: true,
      // achievements: true,
    },
  });
}
