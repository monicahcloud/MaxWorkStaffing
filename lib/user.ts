import prisma from "@/lib/prisma";

export async function getUserMetadata(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { isFirstTimeUser: true },
  });

  return user?.isFirstTimeUser ?? false;
}

export async function markUserAsReturning(clerkId: string) {
  await prisma.user.update({
    where: { clerkId },
    data: { isFirstTimeUser: false },
  });
}
