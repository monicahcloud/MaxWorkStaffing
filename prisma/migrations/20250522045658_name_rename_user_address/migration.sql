/*
  Warnings:

  - You are about to drop the column `address` on the `CoverLetter` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `CoverLetter` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `CoverLetter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoverLetter" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "userAddress" TEXT,
ADD COLUMN     "userEmail" TEXT,
ADD COLUMN     "userPhone" TEXT,
ADD COLUMN     "userPhotoUrl" TEXT,
ALTER COLUMN "template" DROP NOT NULL;
