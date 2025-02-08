import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    
  }
);

// Protect these routes
export const config = {
  matcher: [
    "/mobile/:path*",
    "/dashboard/:path*",
    // Add more protected routes here
    // Exclude auth routes
    "/((?!auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
