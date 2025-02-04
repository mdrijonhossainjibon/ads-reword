import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { Video } from '@/models/Video';
import { VideoWatch } from '@/models/VideoWatch';
import { connectToDatabase } from '@/lib/mongoose';
import { authOptions } from '../../auth/[...nextauth]/route';
import User from '@/models/User';

export async function POST(request : Request) {
  try {
    await connectToDatabase();

    const session  : any = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { videoId, watchTime } = await request.json();
   

    if (!videoId || typeof watchTime !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Invalid data provided' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Video not found' },
        { status: 404 }
      );
    }
   
    await VideoWatch.create({
      userId:  session.user.email,
      videoId: video._id,
      watchTime,
      completedAt : new Date()
    });

   // Update user points
   const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      $inc: {
        balance : video.points || 0,
        watchedAds : 1
      }
    },
    { new: true, upsert: true } // Ensure the user document is created if it doesn't exist
  );

      return NextResponse.json({
        success: true,
        points: updatedUser.points,
        totalEarned: updatedUser.totalEarned
      });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}