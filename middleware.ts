import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sign-out(.*)",
  "/sso-callback(.*)",
  "/api/stripe-webhook",
  "/api/clerk-webhook(.*)",
  "/api/adzuna(.*)",
  "/api/jobspikr(.*)",
  "/api/vapi(.*)",
  "/verify",
]); // Allow "/sign-in" to prevent redirect loops

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
  matcher: ["/((?!_next|.*\\..*).*)"], // Apply middleware to all routes except static files
};
