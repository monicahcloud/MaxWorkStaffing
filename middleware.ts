import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sign-out(.*)",
  "/sso-callback(.*)",
  "/api/stripe-webhook(.*)",
  "/api/clerk-webhook(.*)",
  "/api/adzuna(.*)",
  "/api/jobs(.*)",
  "/api/generate-blog-post(.*)",
  "/api/jobspikr(.*)",
  "/api/vapi(.*)",
  "/api/user(.*)",
  "/verify",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // Get the user ID from Clerk
  console.log(
    `Middleware triggered: ${req.url} | UserID: ${userId || "Guest"}`
  );

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next(); // Continue request as normal
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/stripe-webhook).*)"], // Apply middleware to all routes except static files
};
