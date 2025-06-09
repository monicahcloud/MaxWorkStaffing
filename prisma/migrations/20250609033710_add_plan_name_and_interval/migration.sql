-- DropIndex
DROP INDEX "user_subscriptions_userId_key";

-- AlterTable
ALTER TABLE "user_subscriptions" ADD COLUMN     "stripeInterval" TEXT,
ADD COLUMN     "stripePlanName" TEXT,
ALTER COLUMN "stripeCustomerId" DROP NOT NULL,
ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL,
ALTER COLUMN "stripePriceId" DROP NOT NULL,
ALTER COLUMN "stripeCurrentPeriodEnd" DROP NOT NULL;
