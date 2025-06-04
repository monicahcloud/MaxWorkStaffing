-- AlterTable
ALTER TABLE "CoverLetter" ALTER COLUMN "themeColor" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "content" JSONB;
