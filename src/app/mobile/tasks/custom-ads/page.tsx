"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface CustomAd {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
  targetUrl: string;
  timeRequired: number; // in seconds
  status: 'available' | 'completed' | 'locked';
}

const CustomAdCard: FC<{ ad: CustomAd }> = ({ ad }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isWatching, setIsWatching] = useState(false);

  const handleAdClick = async () => {
    if (ad.status === 'locked' || isWatching) return;
    
    try {
      const response = await axios.post('/api/tasks/custom-ads/start', { adId: ad.id });
      if (response.data.success) {
        setIsWatching(true);
        setTimeLeft(ad.timeRequired);
        window.open(ad.targetUrl, '_blank');
        
        // Start countdown
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsWatching(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error starting custom ad task:', error);
      setIsWatching(false);
    }
  };

  return (
    <div 
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all relative
        ${ad.status === 'locked' || isWatching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700/50'}`}
      onClick={handleAdClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden">
          <img 
            src={ad.imageUrl} 
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white flex items-center justify-between">
            {ad.title}
            <span className="text-purple-400 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              +{ad.points}
            </span>
          </h4>
          <p className="text-sm text-gray-400 mt-1">{ad.description}</p>
          
          {isWatching && timeLeft > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Time Remaining</span>
                <span>{timeLeft}s</span>
              </div>
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${(timeLeft / ad.timeRequired) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
      <Link href="/mobile/tasks/custom-ads" className="flex flex-col items-center gap-1 p-2 text-purple-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
        </svg>
        <span className="text-xs">Custom Ads</span>
      </Link>
      <Link href="/mobile/history" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">History</span>
      </Link>
    </div>
  </div>
);

export default function CustomAdsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [customAds, setCustomAds] = useState<CustomAd[]>([
    {
      id: '1',
      title: 'Premium Mobile Game',
      description: 'Watch this exciting mobile game trailer and earn points',
      points: 100,
      imageUrl: '/images/game-ad.jpg',
      targetUrl: 'https://example.com/game-ad',
      timeRequired: 30,
      status: 'available'
    },
    {
      id: '2',
      title: 'E-commerce Special',
      description: 'View our partner\'s special deals and earn rewards',
      points: 75,
      imageUrl: '/images/ecommerce-ad.jpg',
      targetUrl: 'https://example.com/ecommerce',
      timeRequired: 45,
      status: 'available'
    },
    // Add more sample ads as needed
  ]);

  useEffect(() => {
    const fetchCustomAds = async () => {
      try {
        const response = await axios.get('/api/tasks/custom-ads');
        if (response.data.success) {
          setCustomAds(response.data.ads);
        }
      } catch (error) {
        console.error('Error fetching custom ads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Uncomment to fetch real data
    // fetchCustomAds();
    setIsLoading(false);
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-purple-500">Custom Ads</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
        <div className="w-full max-w-md space-y-4">
          {customAds.map((ad) => (
            <CustomAdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
