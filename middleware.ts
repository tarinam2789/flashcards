import { clerkMiddleware } from "@clerk/nextjs/server";

console.log('Clerk Publishable Key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default clerkMiddleware({
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico).*)",
  ],
};
