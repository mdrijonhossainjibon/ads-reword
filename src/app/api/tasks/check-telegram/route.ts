import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import TelegramBot from 'node-telegram-bot-api';

// Initialize Telegram bot with your bot token
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '', { polling: false });

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { taskId, channelUsername } = body;

    if (!channelUsername) {
      return NextResponse.json({ success: false, error: 'Channel username is required' }, { status: 400 });
    }

    // Get user's Telegram ID from your database
    // This is a placeholder - you need to implement the actual database query
    const userTelegramId = ''; // Get this from your database based on session.user.id

    if (!userTelegramId) {
      return NextResponse.json({ success: false, error: 'Telegram account not linked' }, { status: 400 });
    }

    try {
      // Check if user is a member of the channel
      const chatMember = await bot.getChatMember(channelUsername, parseInt(userTelegramId));
      
      // Check member status
      const isSubscribed = ['member', 'administrator', 'creator'].includes(chatMember.status);

      return NextResponse.json({
        success: true,
        isSubscribed,
      });
    } catch (error) {
      console.error('Telegram API error:', error);
      return NextResponse.json({
        success: false,
        isSubscribed: false,
        error: 'Failed to check subscription status'
      });
    }
  } catch (error) {
    console.error('Error checking Telegram subscription:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
