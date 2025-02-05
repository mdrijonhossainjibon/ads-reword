import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from './lib/auth';

// Define public routes that don't require authentication
const publicRoutes = [
  '/mobile/telegram_access',
  '/auth/login',
  '/auth/register',
  '/',
];

// Define routes that require authentication
const protectedRoutes = [
  '/mobile/tasks',
  '/mobile/watch',
  '/mobile/withdraw',
  '/admin',
  '/mobile'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
 
  // Get the token from the session cookie
  const token = request.cookies.get('next-auth.session-token')?.value;
  

  console.log(token);

  // If user is authenticated and trying to access auth pages, redirect to home
  if (token && (pathname.startsWith('/auth') || pathname === '/mobile/telegram_access')) {
    return NextResponse.rewrite(new URL('/mobile', request.url));
  }

  // For protected routes, check authentication
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.rewrite(new URL(`/mobile/telegram_access?callbackUrl=${callbackUrl}`, request.url));
    }

    // For admin routes, we'll need to verify the role through an API call or JWT payload
    if (pathname.startsWith('/admin')) {
      // Since we can't verify role in middleware directly, redirect to a page that can check
      const response = NextResponse.next();
      response.headers.set('x-middleware-admin-check', 'true');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|public|assets).*)',
    '/api/auth/:path*'
  ]
};
