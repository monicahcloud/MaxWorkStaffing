import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
// console.log("🔐 Loaded environment variables:", {

//   DATABASE_URL: process.env.DATABASE_URL,
//   OPENAI_API_KEY: process.env.OPENAI_API_KEY,
//   CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
//   PGHOST: process.env.PGHOST,
//   PGUSER: process.env.PGUSER,
//   PGHOST_UNPOOLED: process.env.PGHOST_UNPOOLED,
//   PGPASSWORD: process.env.PGPASSWORD,
//   POSTGRES_URL: process.env.POSTGRES_URL,
//   POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
//   POSTGRES_USER: process.env.POSTGRES_USER,
//   POSTGRES_HOST: process.env.POSTGRES_HOST,
//   POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
//   POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
//   POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
//   POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
//   STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
//   STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
//   BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,

//   // Public client-side variables
//   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
//   NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
//   NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
//   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
//   NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY:
//     process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
//   NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY:
//     process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
//   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
// });

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1).url(),
    OPENAI_API_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    PGHOST: z.string().min(1),
    PGUSER: z.string().min(1),
    PGHOST_UNPOOLED: z.string().min(1),
    PGPASSWORD: z.string().min(1),
    POSTGRES_URL: z.string().min(1),
    POSTGRES_URL_NON_POOLING: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),
    POSTGRES_URL_NO_SSL: z.string().min(1),
    POSTGRES_PRISMA_URL: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    BLOB_READ_WRITE_TOKEN: z.string().min(1),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: z.string().min(1).url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
