/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `user_subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `user_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_subscriptions" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_clerkId_key" ON "user_subscriptions"("clerkId");

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
