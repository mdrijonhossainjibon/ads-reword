import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Comment } from '@/models/Comment';
import { connectToDatabase } from '@/lib/mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const comments = await Comment.find({ videoId: params.id })
      .sort({ createdAt: -1 })
      .populate('replies');

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const session : any = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { content, parentId } = await request.json();

    if (!content?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Comment content is required' },
        { status: 400 }
      );
    }

    const commentData = {
      videoId: params.id,
      content: content.trim(),
      username: session.user.name || 'Anonymous',
      avatar: session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
      parentId: parentId || null
    };

    const newComment = await Comment.create(commentData);

    // If this is a reply, add it to the parent comment's replies array
    if (parentId) {
      await Comment.findByIdAndUpdate(parentId, {
        $push: { replies: newComment._id }
      });
    }

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to post comment' },
      { status: 500 }
    );
  }
}
