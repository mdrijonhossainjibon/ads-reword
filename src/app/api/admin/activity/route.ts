import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Activity } from '@/models/Activity';

export async function GET() {
  try {
    await connectToDatabase();

    const activities = await Activity.find()
      .populate('user', 'name username')
      .sort({ createdAt: -1 })
      .limit(10);

    const formattedActivities = activities.map(activity => ({
      id: activity._id,
      user: activity.user.name || activity.user.username,
      action: activity.action,
      details: activity.details,
      time: formatTime(activity.createdAt)
    }));

    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}
