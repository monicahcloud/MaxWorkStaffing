export const dynamic = "force-dynamic";

import React from "react";
import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CreateLetterButton from "./CreateletterButton";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import CoverLetterItem from "./CoverLetterItem";
import { coverLetterInclude } from "@/lib/types";
import { canCreateResume } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";

export const metadata: Metadata = {
  title: "Cover Letters",
};
async function CoverLetterRoute() {
  const session = auth();
  const userId = (await session)?.userId;

  if (!userId) {
    return null;
  }

  const [coverletter, totalCount, subscriptionLevel] = await Promise.all([
    prisma.coverLetter.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: coverLetterInclude,
    }),
    prisma.coverLetter.count({
      where: {
        userId,
      },
    }),
    // 3. Retrieve the user's current subscription level (e.g., trial, monthly, annual)
    getUserSubscriptionLevel(userId),
  ]);

  return (
    <main>
      <SectionTitle text="my Cover Letters" subtext={`Total: ${totalCount}`} />
      <div className="p-10 md:px-20 lg:px-32">
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4">
            <CreateLetterButton
              canCreate={canCreateResume(subscriptionLevel, totalCount)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
          {coverletter.map((letter) => (
            <CoverLetterItem
              key={letter.id}
              coverletter={letter}
              subscriptionLevel={"free"}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CoverLetterRoute;
