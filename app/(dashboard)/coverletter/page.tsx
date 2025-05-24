export const dynamic = "force-dynamic";

import React from "react";
import { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import CreateLetterButton from "./CreateletterButton";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import CoverLetterItem from "./CoverLetterItem";

export const metadata: Metadata = {
  title: "Cover Letters",
};
async function CoverLetterRoute() {
  const session = auth();
  const userId = (await session)?.userId;

  if (!userId) {
    return null;
  }

  const [coverletter, totalCount] = await Promise.all([
    prisma.coverLetter.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);
  return (
    <main>
      <SectionTitle text="my Cover Letters" subtext={`Total: ${totalCount}`} />
      <div className="p-10 md:px-20 lg:px-32">

        <div className="w-full flex justify-center">
          <div className="flex items-center gap-4">
            <CreateLetterButton />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 gap-5">
          {coverletter.map((letter) => (
            <CoverLetterItem key={letter.id} coverletter={letter} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CoverLetterRoute;
