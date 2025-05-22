/*
  Warnings:

  - You are about to drop the column `email` on the `CoverLetter` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `CoverLetter` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `CoverLetter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoverLetter" DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "photoUrl",
ADD COLUMN     "userEmail" TEXT,
ADD COLUMN     "userPhone" TEXT,
ADD COLUMN     "userPhotoUrl" TEXT,
ALTER COLUMN "borderStyle" DROP NOT NULL,
ALTER COLUMN "themeColor" DROP NOT NULL;
