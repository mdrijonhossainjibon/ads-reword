import { NextResponse } from 'next/server';
import { createHash, createHmac } from 'crypto';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const checkTelegramSignature = (data: Omit<TelegramAuthData, 'hash'>, hash: string): boolean => {
  const secretKey = createHash('sha256')
    .update(BOT_TOKEN || '')
    .digest();

  const dataCheckString = Object.entries(data)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\\n');

  const hmac = createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return hmac === hash;
};

export async function POST(request: Request) {
  try {
    const data: TelegramAuthData = await request.json();
    const { hash, ...userData } = data;

    // Check if auth_date is not older than 1 day
    const authTimestamp = userData.auth_date;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp - authTimestamp > 86400) {
      return NextResponse.json(
        { success: false, error: 'Authentication data expired' },
        { status: 401 }
      );
    }

    // Verify Telegram signature
    if (!checkTelegramSignature(userData, hash)) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Create JWT token
    const accessToken = jwt.sign(
      { 
        userId: userData.id,
        username: userData.username 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set JWT token in HTTP-only cookie
    cookies().set('telegram_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({
      success: true,
      user: userData,
      accessToken
    });
  } catch (error) {
    console.error('Telegram login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
