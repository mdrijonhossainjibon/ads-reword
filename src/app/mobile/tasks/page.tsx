"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  type: 'ad' | 'subscription' | 'social' | 'promotion';
  title: string;
  description: string;
  points: number;
  status: 'available' | 'completed' | 'locked';
  completedCount?: number;
  maxCount?: number;
  timeLeft?: number;
  platform?: string;
}

interface TaskStats {
  dailyTasksCompleted: number;
  totalTasksAvailable: number;
  totalPointsEarned: number;
}

const TaskCard: FC<{ task: Task; setTasks: (tasks: Task[]) => void }> = ({ task, setTasks }) => {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'ad':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
        );
      case 'subscription':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
          </svg>
        );
      case 'social':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
          </svg>
        );
      case 'promotion':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
          </svg>
        );
    }
  };

  const handleCheckSubscription = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click
    setChecking(true);
    try {
      const checkResponse = await axios.post('/api/tasks/check-telegram', { 
        taskId: task.id,
        channelUsername: task.platform 
      });
      
      if (checkResponse.data.isSubscribed) {
        await axios.post('/api/tasks/complete', { taskId: task.id });
       /*  setTasks((prevTasks : any) => 
          prevTasks.map(t => t.id === task.id ? { ...t, status: 'completed' } : t)
        ); */
      } else {
        alert('Please subscribe to the channel first!');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setChecking(false);
    }
  };

  const handleTaskClick = async () => {
    if (task.status === 'locked') return;
    
    try {
      const response = await axios.post('/api/tasks/start', { taskId: task.id });
      if (response.data.success) {
        if (task.type === 'ad') {
          router.push(`/mobile/tasks/ad/${task.id}`);
        } else if (task.type === 'subscription' && task.platform === 'Telegram') {
          window.open(response.data.url, '_blank');
        } else if (task.type === 'subscription') {
          window.open(response.data.url, '_blank');
        } else if (task.type === 'social') {
          window.open(response.data.socialUrl, '_blank');
        }
      }
    } catch (error) {
      console.error('Error starting task:', error);
    }
  };

  return (
    <div 
      className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer transition-all relative
        ${task.status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700/50'}`}
      onClick={handleTaskClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
          task.status === 'locked' ? 'bg-gray-700/20 text-gray-400' :
          'bg-purple-500/20 text-purple-400'
        }`}>
          {getTaskIcon(task.type)}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white flex items-center justify-between">
            {task.title}
            <span className="text-purple-400 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              +{task.points}
            </span>
          </h4>
          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
          {task.completedCount !== undefined && task.maxCount !== undefined && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Progress</span>
                <span>{task.completedCount}/{task.maxCount}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${(task.completedCount / task.maxCount) * 100}%` }}
                />
              </div>
            </div>
          )}
          {task.timeLeft && (
            <div className="mt-2 flex items-center gap-1 text-xs text-yellow-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Resets in {Math.floor(task.timeLeft / 3600)}h {Math.floor((task.timeLeft % 3600) / 60)}m
            </div>
          )}
          {task.type === 'subscription' && task.platform === 'Telegram' && task.status !== 'completed' && (
            <button
              onClick={handleCheckSubscription}
              disabled={checking}
              className="mt-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-400 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              {checking ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verify Subscription
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TaskStats: FC<{ stats: TaskStats }> = ({ stats }) => (
  <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl mb-6">
    <div className="grid grid-cols-3 gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Tasks Done</p>
        <p className="text-2xl font-bold text-green-500">{stats.dailyTasksCompleted}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Available</p>
        <p className="text-2xl font-bold text-yellow-500">{stats.totalTasksAvailable}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Points Earned</p>
        <p className="text-2xl font-bold text-purple-500">{stats.totalPointsEarned}</p>
      </div>
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
      <Link href="/mobile/tasks" className="flex flex-col items-center gap-1 p-2 text-purple-500">
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
      <Link href="/mobile/history" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">History</span>
      </Link>
    </div>
  </div>
);

export default function TasksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<TaskStats>({
    dailyTasksCompleted: 12,
    totalTasksAvailable: 25,
    totalPointsEarned: 1500
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setIsLoading(false);
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        if (response.data.success) {
          setTasks(response.data.tasks);
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-purple-500">Daily Tasks</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
        <TaskStats stats={stats} />
        
        <div className="w-full max-w-md space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} setTasks={setTasks} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
