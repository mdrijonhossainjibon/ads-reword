"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface HistoryItem {
  id: string;
  type: 'video' | 'task' | 'withdrawal';
  title: string;
  points: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const HistoryItemCard: FC<{ item: HistoryItem }> = ({ item }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
      case 'task':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
        );
      case 'withdrawal':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        );
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`${getStatusColor(item.status)} flex-shrink-0`}>
          {getTypeIcon(item.type)}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{item.title}</h4>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-400">{item.timestamp}</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-purple-400">+{item.points} points</span>
            </div>
          </div>
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
      <Link href="/mobile/watch" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">Watch</span>
      </Link>
      <Link href="/mobile/history" className="flex flex-col items-center gap-1 p-2 text-purple-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">History</span>
      </Link>
    </div>
  </div>
);

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      type: 'video',
      title: 'Watched: How to Make Perfect Coffee',
      points: 50,
      timestamp: '2 minutes ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'task',
      title: 'Completed: Daily Login Bonus',
      points: 100,
      timestamp: '1 hour ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'withdrawal',
      title: 'Withdrawal Request: $25',
      points: -2500,
      timestamp: '3 hours ago',
      status: 'pending'
    },
    {
      id: '4',
      type: 'video',
      title: 'Watched: Top 10 Travel Destinations',
      points: 75,
      timestamp: '5 hours ago',
      status: 'completed'
    },
    {
      id: '5',
      type: 'task',
      title: 'Completed: Share on Social Media',
      points: 150,
      timestamp: '1 day ago',
      status: 'completed'
    }
  ]);

  useEffect(() => {
    setIsLoading(false);
    /* const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/history');
        if (response.data.success) {
          setHistory(response.data.history);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory(); */
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-purple-500">Activity History</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
        <div className="w-full max-w-md space-y-4">
          {history.length > 0 ? (
            history.map((item) => (
              <HistoryItemCard key={item.id} item={item} />
            ))
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 className="text-lg font-medium text-gray-300 mb-2">No Activity Yet</h3>
              <p className="text-sm text-gray-400">Start watching videos or completing tasks to see your activity history here.</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
