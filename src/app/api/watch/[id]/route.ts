import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
 
import { Video } from '@/models/Video';
import { VideoWatch } from '@/models/VideoWatch';
import { Comment } from '@/models/Comment';
import { connectToDatabase } from '@/lib/mongoose';
import { authOptions } from '../../auth/[...nextauth]/route';

interface VideoData {
  id: string;
  title: string;
  youtubeId: string;
  points: number;
  duration: string;
  completed?: boolean;
  canWatchToday: boolean;
  nextWatchTime?: string;
  likes: number;
  isLiked: boolean;
  description: string;
  channelName: string;
  channelAvatar: string;
  subscribers: string;
  views: string;
  totalViews: number;
  uploadDate: string;
  thumbnail : string
  descriptionDetails: {
    text: string;
    uploadDate: string;
    category: string;
    tags: string[];
  };
  comments?: any[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
   

    const session : any = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const videoId = params.id;
    const video = await Video.findById(videoId);

    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Video not found' },
        { status: 404 }
      );
    }

    // Get comments for the video
    const comments = await Comment.find({ videoId: video._id })
      .sort({ createdAt: -1 })
      .populate('replies');

    // Check if user has watched this video today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastWatch = await VideoWatch.findOne({
      userId: session.user.email,
      videoId: video._id
    }).sort({ completedAt: -1 });

    const canWatchToday = !lastWatch || new Date(lastWatch.completedAt) < today;

    const videoData: VideoData = {
      id: video._id,
      title: video.title,
      youtubeId: video.youtubeId,
      points: video.points,
      duration: video.duration,
      completed: !!lastWatch,
      thumbnail : `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
      canWatchToday,
      nextWatchTime: canWatchToday ? undefined : new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      likes: video.likes,
      isLiked: video.isLiked,
      description: video.description,
      channelName: video.channelName,
      channelAvatar: video.channelAvatar,
      subscribers: video.subscribers,
      views: video.views,
      totalViews: video.totalViews,
      uploadDate: video.uploadDate,
      descriptionDetails: {
        text: video.descriptionDetails?.text,
        uploadDate: video.descriptionDetails?.uploadDate,
        category: video.descriptionDetails?.category,
        tags: video.descriptionDetails?.tags,
      },
      comments
    };

    return NextResponse.json({ success: true, video: videoData });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle video view
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const session : any = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const videoId = params.id;
    const video = await Video.findById(videoId);

    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Video not found' },
        { status: 404 }
      );
    }

    // Record the view
    video.totalViews += 1;
    await video.save();

    // Record user's watch
    await VideoWatch.create({
      userId: session.user.email,
      videoId: video._id,
      completedAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording view:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
