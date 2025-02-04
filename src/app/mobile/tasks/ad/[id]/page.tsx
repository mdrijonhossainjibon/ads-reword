"use client";

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AdTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const [isWatching, setIsWatching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWatching && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isCompleted) {
      handleAdComplete();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isWatching, timeLeft]);

  const handleStartWatching = () => {
    setIsWatching(true);
  };

  const handleAdComplete = async () => {
    try {
      const response = await axios.post('/api/tasks/complete', { taskId: params.id });
      if (response.data.success) {
        setIsCompleted(true);
        setTimeout(() => {
          router.push('/mobile/tasks');
        }, 2000);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>Back</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-20 pb-24 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-6">
          {!isWatching ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">Watch Premium Ad</h2>
              <p className="text-gray-400">Watch this 30-second advertisement to earn your reward points</p>
              <button
                onClick={handleStartWatching}
                className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Start Watching
              </button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              {!isCompleted ? (
                <>
                  <div className="relative w-48 h-48 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        className="text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="90"
                        cx="96"
                        cy="96"
                      />
                      <circle
                        className="text-purple-500"
                        strokeWidth="8"
                        strokeDasharray={565.48}
                        strokeDashoffset={565.48 * (timeLeft / 30)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="90"
                        cx="96"
                        cy="96"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="text-4xl font-bold">{timeLeft}</span>
                      <span className="text-sm block text-gray-400">seconds</span>
                    </div>
                  </div>
                  <p className="text-gray-400">Please watch the entire advertisement</p>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Task Completed!</h3>
                  <p className="text-gray-400">Thank you for watching. Your points have been credited.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
