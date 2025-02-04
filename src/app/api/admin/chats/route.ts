import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Message } from '@/models/Message';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Get all active chats
export async function GET() {
  try {
    const session : any= await getServerSession(authOptions);
    
    if (!session?.user  ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get unique rooms with their latest messages
    const activeChats = await Message.aggregate([
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$roomId',
          userId: { $first: '$userId' },
          lastMessage: { $first: '$message' },
          timestamp: { $first: '$timestamp' },
          unreadCount: { 
            $sum: {
              $cond: [{ $eq: ['$read', false] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          roomId: '$_id',
          userId: 1,
          lastMessage: 1,
          timestamp: 1,
          unreadCount: 1,
          _id: 0
        }
      }
    ]);

    return NextResponse.json(activeChats);
  } catch (error) {
    console.error('Error fetching active chats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
