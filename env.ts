// import { createEnv } from "@t3-oss/env-nextjs";
// import { z } from "zod";

// export const env = createEnv({
//   server: {
//     DATABASE_URL: z.string().min(1).url(),
//     OPENAI_API_KEY: z.string().min(1),
//     CLERK_SECRET_KEY: z.string().min(1),
//     PGHOST: z.string().min(1),
//     PGUSER: z.string().min(1),
//     PGHOST_UNPOOLED: z.string().min(1),
//     PGPASSWORD: z.string().min(1),
//     POSTGRES_URL: z.string().min(1),
//     POSTGRES_URL_NON_POOLING: z.string().min(1),
//     POSTGRES_USER: z.string().min(1),
//     POSTGRES_HOST: z.string().min(1),
//     POSTGRES_PASSWORD: z.string().min(1),
//     POSTGRES_DATABASE: z.string().min(1),
//     POSTGRES_URL_NO_SSL: z.string().min(1),
//     POSTGRES_PRISMA_URL: z.string().min(1),
//     STRIPE_SECRET_KEY: z.string().min(1),
//     STRIPE_WEBHOOK_SECRET: z.string().min(1),
//     BLOB_READ_WRITE_TOKEN: z.string().min(1),
//     CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1),
//     ADZUNA_APP_KEY: z.string().min(1),
//     ADZUNA_APP_ID: z.string().min(1),
//     AFFINDA_DOCUMENT_TYPE_ID: z.string().min(1),
//     PIKR_CLIENT_ID: z.string().min(1),
//     PIKR_CLIENT_AUTH_KEY: z.string().min(1),
//     STRIPE_PRICE_ID_MONTHLY: z.string().min(1),
//     STRIPE_PRICE_7_DAY_ACCESS: z.string().min(1),
//     STRIPE_PRICE_ID_QUARTERLY: z.string().min(1),
//   },
//   client: {
//     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
//     NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
//     NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
//     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
//     NEXT_PUBLIC_BASE_URL: z.string().min(1).url(),
//     NEXT_PUBLIC_VAPI_WEB_TOKEN: z.string().min(1),
//     NEXT_PUBLIC_VAPI_WORKFLOW_ID: z.string().min(1),
//   },
//   experimental__runtimeEnv: {
//     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
//       process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
//     NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
//     NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
//     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,

//     NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
//     NEXT_PUBLIC_VAPI_WEB_TOKEN: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN,
//     NEXT_PUBLIC_VAPI_WORKFLOW_ID: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
//   },
// });
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().optional(),
    OPENAI_API_KEY: z.string().optional(),
    CLERK_SECRET_KEY: z.string().optional(),
    PGHOST: z.string().optional(),
    PGUSER: z.string().optional(),
    PGHOST_UNPOOLED: z.string().optional(),
    PGPASSWORD: z.string().optional(),
    POSTGRES_URL: z.string().optional(),
    POSTGRES_URL_NON_POOLING: z.string().optional(),
    POSTGRES_USER: z.string().optional(),
    POSTGRES_HOST: z.string().optional(),
    POSTGRES_PASSWORD: z.string().optional(),
    POSTGRES_DATABASE: z.string().optional(),
    POSTGRES_URL_NO_SSL: z.string().optional(),
    POSTGRES_PRISMA_URL: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    BLOB_READ_WRITE_TOKEN: z.string().optional(),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().optional(),
    ADZUNA_APP_KEY: z.string().optional(),
    ADZUNA_APP_ID: z.string().optional(),
    AFFINDA_DOCUMENT_TYPE_ID: z.string().optional(),
    PIKR_CLIENT_ID: z.string().optional(),
    PIKR_CLIENT_AUTH_KEY: z.string().optional(),
    STRIPE_PRICE_ID_MONTHLY: z.string().optional(),
    STRIPE_PRICE_7_DAY_ACCESS: z.string().optional(),
    STRIPE_PRICE_ID_QUARTERLY: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().optional(),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_VAPI_WEB_TOKEN: z.string().optional(),
    NEXT_PUBLIC_VAPI_WORKFLOW_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_VAPI_WEB_TOKEN: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN,
    NEXT_PUBLIC_VAPI_WORKFLOW_ID: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
  },
  // This is the magic line
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION || process.env.NODE_ENV === "development",
});
