import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Message } from '@/models/Message';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const session : any= await getServerSession(authOptions);
    
    console.log(session);
    if (!session?.user ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { roomId } = params;

    // Get all messages for the specific room
    const messages = await Message.find({ roomId })
      .sort({ timestamp: 1 })
      .lean();

    // Mark all unread messages as read
    await Message.updateMany(
      { roomId, read: false },
      { $set: { read: true } }
    );

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching room messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
