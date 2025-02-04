import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { verifyTelegramWebAppData } from '@/lib/telegram';

export async function GET(request: NextRequest) {
  try {
    // Get the Telegram Web App data from headers
    const initData = request.headers.get('x-telegram-init-data');
    if (!initData) {
      return NextResponse.json(
        { error: 'No Telegram Web App data provided' },
        { status: 401 }
      );
    }

    // Verify the Telegram Web App data
    const telegramUser = await verifyTelegramWebAppData(initData);
    if (!telegramUser) {
      return NextResponse.json(
        { error: 'Invalid Telegram Web App data' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find user by username
    const user = await User.findOne({ username: telegramUser.username }).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Profile API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
