import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export interface AuthUser {
  userId: number;
  username?: string;
}

export async function verifyAuth(): Promise<AuthUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('telegram_token');

  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    
    return {
      userId: payload.userId as number,
      username: payload.username as string | undefined
    };
  } catch (error) {
    return null;
  }
}

export async function createAuthToken(user: AuthUser): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}

export function setAuthCookie(token: string) {
  cookies().set('telegram_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });
}

export function clearAuthCookie() {
  cookies().delete('telegram_token');
}
