import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-out(.*)",
  "/api/stripe-webhook",
]); // Allow "/sign-in" to prevent redirect loops

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // Get the user ID from Clerk
  console.log(
    `Middleware triggered: ${req.url} | UserID: ${userId || "Guest"}`
  );

  // Prevent redirect loop: Don't redirect users who are already on a public page
  if (!userId && !isPublicRoute(req)) {
    console.log("🔄 Redirecting unauthenticated user to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect to a sign-in page instead
  }

  return NextResponse.next(); // Continue request as normal
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Apply middleware to all routes except static files
};
