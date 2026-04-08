import prisma from "@/lib/prisma";

export async function getDbUserByClerkId(clerkId: string) {
  if (!clerkId) {
    throw new Error("Missing clerkId");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      id: true,
      clerkId: true,
      email: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
