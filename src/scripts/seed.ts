import mongoose from 'mongoose';
import { Video } from '../models/Video';
import { VideoWatch } from '../models/VideoWatch';
import { connectToDatabase } from '../lib/mongoose';

const sampleVideos = [
  {
    title: "Introduction to Next.js",
    youtubeId: "Sklc_fQBmcs",
    points: 10,
    duration: "10:15"
  },
  {
    title: "Building Modern UIs",
    youtubeId: "bMknfKXIFA8",
    points: 15,
    duration: "15:30"
  },
  {
    title: "TypeScript Fundamentals",
    youtubeId: "BwuLxPH8IDs",
    points: 20,
    duration: "20:45"
  },
  {
    title: "MongoDB with Node.js",
    youtubeId: "pWbMrx5rVBE",
    points: 25,
    duration: "25:00"
  }
];

const sampleUserEmail = "test@example.com";

export default async function seed() {
  try {
    console.log('🌱 Starting seed...');
 
    
    // Clear existing data
    await Video.deleteMany({});
    await VideoWatch.deleteMany({});
    
    // Insert videos
    const insertedVideos = await Video.insertMany(sampleVideos);
    console.log(`✅ Inserted ${insertedVideos.length} videos`);
    
    // Create some watch history
    const watchData = insertedVideos.slice(0, 2).map(video => ({
      userId: sampleUserEmail,
      videoId: video._id,
      watchTime: 300, // 5 minutes in seconds
      completedAt: new Date()
    }));
    
    await VideoWatch.insertMany(watchData);
    console.log(`✅ Created watch history for ${watchData.length} videos`);
    
    console.log('✨ Seed completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  }
}

 
 