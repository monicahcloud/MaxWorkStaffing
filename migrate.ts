import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const resumes = await prisma.resume.findMany({
    select: { id: true, userId: true },
  });

  for (const resume of resumes) {
    const user = await prisma.user.findUnique({
      where: { id: resume.userId },
      select: { clerkId: true },
    });

    if (!user) {
      console.error(`No user found for resume ${resume.id}`);
      continue;
    }

    await prisma.resume.update({
      where: { id: resume.id },
      data: { clerkId: user.clerkId },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
