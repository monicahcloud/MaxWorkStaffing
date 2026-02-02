/*
  Warnings:

  - A unique constraint covering the columns `[shareToken]` on the table `CoverLetter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shareToken]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CoverLetter" ADD COLUMN     "shareToken" TEXT;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "dateApplied" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "parsed" BOOLEAN DEFAULT false,
ADD COLUMN     "parsedWith" TEXT,
ADD COLUMN     "shareToken" TEXT;

-- AlterTable
ALTER TABLE "user_subscriptions" ADD COLUMN     "status" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CoverLetter_shareToken_key" ON "CoverLetter"("shareToken");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_shareToken_key" ON "Resume"("shareToken");
