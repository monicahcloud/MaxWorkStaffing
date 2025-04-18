"use server";

import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

async function authenticateAndRedirect(): Promise<string> {
  const { userId } = await auth(); // Await the promise

  if (!userId) {
    redirect("/");
  }

  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = await authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,

        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// type GetAllJobsActionTypes = {
//   search?: string;
//   jobStatus?: string;
//   page?: number;
//   limit?: number;
// };

// export async function getAllJobsAction({
//   search,
//   jobStatus,
//   page = 1,
//   limit = 10,
// }: GetAllJobsActionTypes): Promise<{
//   jobs: JobType[];
//   count: number;
//   page: number;
//   totalPages: number;
// }> {
//   const userId = await authenticateAndRedirect();

//   try {
//     let whereClause: Prisma.JobWhereInput = {
//       clerkId: userId,
//     };
//     if (search) {
//       whereClause = {
//         ...whereClause,
//         OR: [
//           {
//             position: {
//               contains: search,
//             },
//           },
//           {
//             company: {
//               contains: search,
//             },
//           },
//         ],
//       };
//     }
//     if (jobStatus && jobStatus !== "all") {
//       whereClause = {
//         ...whereClause,
//         status: jobStatus,
//       };
//     }

//     const jobs: JobType[] = await prisma.job.findMany({
//       where: whereClause,
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return { jobs, count: 0, page: 1, totalPages: 0 };
//   } catch (error) {
//     console.error(error);
//     return { jobs: [], count: 0, page: 1, totalPages: 0 };
//   }
// }

// export async function deleteJobAction(id: string): Promise<JobType | null> {
//   const userId = await authenticateAndRedirect();

//   try {
//     const job: JobType = await prisma.job.delete({
//       where: {
//         id,
//         clerkId: userId,
//       },
//     });
//     return job;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export async function updateJobAction(
//   id: string,
//   values: CreateAndEditJobType
// ): Promise<JobType | null> {
//   const userId = await authenticateAndRedirect();

//   try {
//     const job: JobType = await prisma.job.update({
//       where: {
//         id,
//         clerkId: userId,
//       },
//       data: {
//         ...values,
//       },
//     });
//     return job;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// export async function getSingleJobAction(id: string): Promise<JobType | null> {
//   let job: JobType | null = null;
//   const userId = await authenticateAndRedirect();

//   try {
//     job = await prisma.job.findUnique({
//       where: {
//         id,
//         clerkId: userId,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     job = null;
//   }
//   if (!job) {
//     redirect("/jobs");
//   }
//   return job;
// }
