/*
  Warnings:

  - You are about to drop the column `userPhotoUrl` on the `CoverLetter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoverLetter" DROP COLUMN "userPhotoUrl",
ADD COLUMN     "signatureColor" TEXT,
ALTER COLUMN "borderStyle" SET DEFAULT 'squircle';
