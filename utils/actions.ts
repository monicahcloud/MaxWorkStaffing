/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

async function authenticateAndRedirect(): Promise<string> {
  const { userId } = await auth(); // Await the promise
  // console.log("userId", userId);

  if (!userId) {
    redirect("/");
  }

  return userId;
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const clerkUserId = await authenticateAndRedirect();

  try {
    createAndEditJobSchema.parse(values);

    // Find the internal DB userId using clerkId
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!dbUser) throw new Error("User not found");

    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: clerkUserId,
        userId: dbUser.id, // ✅ required for schema
      },
    });

    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = await authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "All") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const skip = (page - 1) * limit;
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const count: number = await prisma.job.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job: JobType | null = null;
  const userId = await authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error(error);
    job = null;
  }
  if (!job) {
    redirect("/addJob");
  }
  return job;
}

export async function getStatsAction(): Promise<{
  Pending: number;
  Interview: number;
  Declined: number;
  Submitted: number;
  Hired: number;
  Offered: number;
}> {
  const userId = await authenticateAndRedirect();
  // just to show Skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: {
        clerkId: userId, // replace userId with the actual clerkId
      },
    });
    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    const defaultStats = {
      Pending: 0,
      Interview: 0,
      Declined: 0,
      Submitted: 0,
      Hired: 0,
      Offered: 0,
      ...statsObject,
    };
    return defaultStats;
  } catch (error) {
    redirect("/addJob");
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = await authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format("MMM YY");

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    redirect("/addJob");
  }
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[]> {
  const interviews = await prisma.interview.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return interviews.map((interview) => ({
    ...interview,
    createdAt: interview.createdAt.toISOString(),
    updatedAt: interview.updatedAt.toISOString(),
  }));
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[]> {
  const { userId, limit = 20 } = params;

  const interviews = await prisma.interview.findMany({
    where: {
      finalized: true,
      NOT: {
        userId: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return interviews.map((interview) => ({
    ...interview,
    createdAt: interview.createdAt.toISOString(),
    updatedAt: interview.updatedAt.toISOString(),
  }));
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await prisma.interview.findUnique({
    where: { id },
  });

  if (!interview) return null;

  return {
    ...interview,
    createdAt: interview.createdAt.toISOString(),
    updatedAt: interview.updatedAt.toISOString(),
  };
}
