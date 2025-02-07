"use client";

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AdViewProps {
  params: {
    id: string;
  };
}

const AdView: FC<AdViewProps> = ({ params }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number>(30); // Default 30 seconds
  const [adData, setAdData] = useState<{
    id: string;
    imageUrl: string;
    title: string;
    points: number;
    timeRequired: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        // In development, use mock data
        setAdData({
          id: params.id,
          imageUrl: '/images/sample-ad.jpg',
          title: 'Premium Advertisement',
          points: 100,
          timeRequired: 30
        });
        setIsLoading(false);
        
        // Uncomment for production
        /* const response = await axios.get(`/api/tasks/custom-ads/${params.id}`);
        if (response.data.success) {
          setAdData(response.data.ad);
          setTimeLeft(response.data.ad.timeRequired);
        } */
      } catch (error) {
        console.error('Error fetching ad data:', error);
        router.push('/mobile/tasks/custom-ads');
      }
    };

    fetchAdData();
  }, [params.id]);

  useEffect(() => {
    if (!adData || isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAdComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [adData, isCompleted]);

  const handleAdComplete = async () => {
    if (isCompleted) return;
    
    setIsCompleted(true);
    try {
      await axios.post('/api/tasks/custom-ads/complete', { 
        adId: params.id,
      });
      
      // Show completion message for 2 seconds before redirecting
      setTimeout(() => {
        router.push('/mobile/tasks/custom-ads');
      }, 2000);
    } catch (error) {
      console.error('Error completing ad:', error);
      router.push('/mobile/tasks/custom-ads');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-700">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <span className="text-white font-medium">Watching Ad</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-purple-400 font-medium">+{adData?.points}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-16 pb-20">
        {/* Ad Image */}
        <div className="relative w-full h-[calc(100vh-8rem)] bg-black flex items-center justify-center">
          {adData?.imageUrl && (
            <img
              src={adData.imageUrl}
              alt={adData.title}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Footer with Timer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-md mx-auto px-4 py-4">
          {isCompleted ? (
            <div className="text-center text-green-400 font-medium">
              Ad completed! Redirecting...
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>Time Remaining</span>
                <span>{timeLeft} seconds</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${(timeLeft / (adData?.timeRequired || 30)) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdView;
