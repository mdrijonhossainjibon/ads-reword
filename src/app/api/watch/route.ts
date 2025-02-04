import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
 
import { Video } from '@/models/Video';
import { VideoWatch } from '@/models/VideoWatch';
import { connectToDatabase } from '@/lib/mongoose';
import { authOptions } from '../auth/[...nextauth]/route';
 
export async function GET() {
  try {
    await connectToDatabase();
     
    const session : any = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all videos
    const videos = await Video.find({}).lean();
    
    // Fetch watched videos for the current user
    const watchedVideos = await VideoWatch.find({
      userId: session.user.email,
      completedAt: { $exists: true }
    }) ;
    

    // Calculate stats
    const videosWithWatchStatus = videos.map(video => ({
      id: video._id ,
      title: video.title,
      thumbnail: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
      duration: video.duration,
      points: video.points,
      youtubeId: video.youtubeId,
      watched: watchedVideos.some(w => w.videoId  === video._id)
    }));

    const stats = {
      totalEarned: watchedVideos.length * 10, // Assuming 10 points per video
      videosWatched: watchedVideos.length,
      totalVideos: videos.length,
      timeUntilReset: 14400000 // 4 hours in milliseconds
    };

    return NextResponse.json({
      success: true,
      stats,
      videos: videosWithWatchStatus
    });
  } catch (error) {
    console.error('Error in GET /api/watch:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const session : any= await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { videoId, youtubeId, watchTime } = body;

    if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid video ID' },
        { status: 400 }
      );
    }

    // Find the video
    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      );
    }

    // Check if video was already watched
    const existingWatch = await VideoWatch.findOne({
      userId: session.user.email,
      videoId,
      completedAt: { $exists: true }
    });

    if (existingWatch) {
      return NextResponse.json({
        success: false,
        error: 'Video already watched',
        points: 0
      });
    }

    // Create or update watch record
    await VideoWatch.findOneAndUpdate(
      {
        userId: session.user.email,
        videoId
      },
      {
        userId: session.user.email,
        videoId,
        watchTime,
        completedAt: new Date()
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Video watched successfully',
      points: video.points
    });
  } catch (error) {
    console.error('Error in POST /api/watch:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update video status' },
      { status: 500 }
    );
  }
}
