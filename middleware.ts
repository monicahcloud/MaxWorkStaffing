import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-out(.*)",
  "/sso-callback(.*)",
  "/api/stripe-webhook",
  "/api/clerk-webhook(.*)",
  "maxworkstaffing.com",
  "www.maxworkstaffing.com",
]); // Allow "/sign-in" to prevent redirect loops

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); // Get the user ID from Clerk
  console.log(
    `Middleware triggered: ${req.url} | UserID: ${userId || "Guest"}`
  );

  // Prevent redirect loop: Don't redirect users who are already on a public page
  // if (!isPublicRoute(req)) {
  //   console.log("Redirecting unauthenticated user to /");
  //   return NextResponse.redirect(new URL("/", req.url)); // Redirect to a sign-in page instead
  // }
  // Protect private routes - See https://clerk.com/docs/references/nextjs/clerk-middleware#protect-routes-based-on-authentication-status
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  // Removed the return of NextRequest as there's no need to return anything if the request is valid.
});

//   return NextResponse.next(); // Continue request as normal
// });

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Apply middleware to all routes except static files
};
