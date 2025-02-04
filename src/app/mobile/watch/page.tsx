"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {  useRouter } from 'next/navigation';
import { Router } from 'next/router';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  points: number;
  watched: boolean;
  youtubeId: string;
}

interface WatchStats {
  totalEarned: number;
  videosWatched: number;
  totalVideos: number;
  timeUntilReset: number;
}

const formatTimeRemaining = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const VideoItem: FC<{ video: Video , router : Router }> = ({ video , router}) => {
 
  const watchVideo =  () => {
     router.push(`/mobile/watch/${video.id}`);
  };
  
  return (
    <div className="video-item" data-video-id={video.id}>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-gray-700/50 transition-colors">
        <div className="flex gap-4">
          <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover"/>
            <div className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white line-clamp-2">{video.title}</h4>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-purple-400">+{video.points} points</span>
              </div>
              {video.watched ? (
                <span className="text-green-400 flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Watched
                </span>
              ) : (
                <button 
                  onClick={watchVideo}
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Watch Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsOverview: FC<{ stats: WatchStats }> = ({ stats }) => (
  <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl mb-6">
    <div className="grid grid-cols-2 gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Total Earned</p>
        <p className="text-2xl font-bold text-purple-500">{stats.totalEarned.toFixed(2)}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Videos Watched</p>
        <p className="text-2xl font-bold text-yellow-500">{stats.videosWatched}/{stats.totalVideos}</p>
      </div>
    </div>
  </div>
);

const ResetTimer: FC<{ timeUntilReset: number }> = ({ timeUntilReset }) => (
  <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl mb-6 text-center">
    <div className="flex items-center justify-center gap-2">
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p className="text-sm">
        <span className="text-gray-400">Videos reset in: </span>
        <span className="text-blue-400 font-medium">{formatTimeRemaining(timeUntilReset)}</span>
      </p>
    </div>
  </div>
);

const BottomNav: FC = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-sm border-t border-gray-800 py-2 px-4">
    <div className="flex items-center justify-around max-w-md mx-auto">
      <Link href="/mobile" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/mobile/tasks" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
        </svg>
        <span className="text-xs">Tasks</span>
      </Link>
      <Link href="/mobile/watch" className="flex flex-col items-center gap-1 p-2 text-purple-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">Watch</span>
      </Link>
      <Link href="/mobile/withdraw" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">Withdraw</span>
      </Link>
    </div>
  </div>
);

export default function WatchPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [data, setData] = useState<{
    stats: WatchStats;
    videos: Video[];
  }>({
    stats: {
      totalEarned: 0,
      videosWatched: 0,
      totalVideos: 0,
      timeUntilReset: 5000,
    },
    videos: []
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/watch');
        if (response.data.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-purple-500">Watch & Earn</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
        <StatsOverview stats={data.stats} />
        <ResetTimer timeUntilReset={data.stats.timeUntilReset} />
        
        <div className="w-full max-w-md space-y-4" id="videos-container">
          {data.videos.map((video: Video) => (
            <VideoItem key={video.id} video={video} router={router as any} />
          ))}
        </div>

        <div className="w-full max-w-md mt-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">How Watch & Earn Works</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Watch YouTube videos to earn points</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Videos reset daily at midnight</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span>Points are credited instantly after watching</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}



 