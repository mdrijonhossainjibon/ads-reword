import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

export async function GET(request: Request) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: number;
        username?: string;
      };

      // Here you would typically fetch the user data from your database
      // For now, we'll just return the decoded token data
      return NextResponse.json({
        success: true,
        user: {
          id: decoded.userId,
          username: decoded.username,
          auth_date: Math.floor(Date.now() / 1000)
        },
        accessToken: token
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
