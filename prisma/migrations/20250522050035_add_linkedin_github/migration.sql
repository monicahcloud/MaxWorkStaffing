/*
  Warnings:

  - You are about to drop the column `userEmail` on the `CoverLetter` table. All the data in the column will be lost.
  - You are about to drop the column `userPhone` on the `CoverLetter` table. All the data in the column will be lost.
  - You are about to drop the column `userPhotoUrl` on the `CoverLetter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoverLetter" DROP COLUMN "userEmail",
DROP COLUMN "userPhone",
DROP COLUMN "userPhotoUrl",
ADD COLUMN     "borderStyle" TEXT NOT NULL DEFAULT 'solid',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "gitHub" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "themeColor" TEXT NOT NULL DEFAULT '#000000';
