import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';

// List of paths that don't require authentication
const publicPaths = [
  '/mobile/telegram_access',
  '/api/auth/telegram/login',
  '/api/auth/telegram/check',
  '/api/auth/session',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/auth/providers',
  '/api/auth/csrf',
  '/auth/login'
];

const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => path.startsWith(publicPath));
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
 

  // Allow public paths
  if (isPublicPath(path)) {
    return NextResponse.next();
  }

  // First try NextAuth.js session
  const session = await getToken({ req: request });
  if (session) {
    return NextResponse.next();
  }

  

  // If no NextAuth session, try Telegram token
  const telegramToken = request.cookies.get('telegram_token')?.value;

 
  if (telegramToken) {
    try {
      const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';
      jwt.verify(telegramToken, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid
      const loginUrl = new URL('/mobile/telegram_access', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  if(path ==='/mobile'){
    const loginUrl = new URL('/mobile/telegram_access', request.url);
    return NextResponse.redirect(loginUrl);
  }
  

  
  
  // No valid authentication found
  const loginUrl = new URL('/auth/login', request.url);
  return NextResponse.redirect(loginUrl);
  
}

 

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/mobile/:path*',
    '/api/:path*',
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
  ]
};
