import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { Video } from '@/models/Video';
import { connectToDatabase } from '@/lib/mongoose';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const session: any = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const videoId = params.id;
    const currentVideo = await Video.findById(videoId);

    if (!currentVideo) {
      return NextResponse.json(
        { success: false, message: 'Video not found' },
        { status: 404 }
      );
    }

    // Find related videos based on:
    // 1. Same category
    // 2. Similar tags
    // 3. Same channel
    // 4. Recent popularity
    const relatedVideos = await Video.aggregate([
      {
        $match: {
          _id: { $ne: currentVideo._id }, // Exclude current video
          $or: [
            { 'descriptionDetails.category': currentVideo.descriptionDetails?.category },
            { 'descriptionDetails.tags': { $in: currentVideo.descriptionDetails?.tags || [] } },
            { channelName: currentVideo.channelName }
          ]
        }
      },
      {
        $addFields: {
          relevanceScore: {
            $add: [
              { $cond: [{ $eq: ['$channelName', currentVideo.channelName] }, 3, 0] },
              { $cond: [{ $eq: ['$descriptionDetails.category', currentVideo.descriptionDetails?.category] }, 2, 0] },
              {
                $size: {
                  $setIntersection: ['$descriptionDetails.tags', currentVideo.descriptionDetails?.tags || []]
                }
              }
            ]
          }
        }
      },
      { $sort: { relevanceScore: -1, totalViews: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          id: '$_id',
          title: 1,
          thumbnail: { $concat: ['https://i.ytimg.com/vi/', '$youtubeId', '/hqdefault.jpg'] },
          channelName: 1,
          channelAvatar: 1,
          views: 1,
          uploadDate: 1,
          duration: 1,
          subscribers: 1,
          likes: 1,
          description: 1,
          points : 1
        }
      }
    ]);

    return NextResponse.json({ 
      success: true, 
      videos: relatedVideos
    });
  } catch (error) {
    console.error('Error fetching related videos:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
