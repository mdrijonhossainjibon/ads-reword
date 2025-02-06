// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/api/auth/.*',
  '/mobile/telegram_access'
];



const PUBLIC_ROUTES = ["/", "/about", "/contact", "/auth/signin"];


export default withAuth(
  function middleware(req) {

    const { pathname } = req.nextUrl;

    // Check if the route is public
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

    console.log(req.nextauth.token);

    // If it's a public route, allow access
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // If not authenticated, redirect to sign-in
    if (!req.nextauth.token) {
      return NextResponse.rewrite(new URL("/auth/signin", req.url));
    }


  // If authenticated, allow access
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow if the user is authenticated
      
        return !!token;
      },
    },
  }
);

// Define routes configuration
export const config = {
  matcher: ["/admin/dashboard/:path*", "/profile/:path*" , "/mobile/:path*"], // Protected routes
};
