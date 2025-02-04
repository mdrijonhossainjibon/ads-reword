import { FC } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  totalRequired: number;
  type: string;
  progress: number;
  completed: number;
  lastResetAt: string;
}

interface TaskStats {
  totalPoints: number;
  completedTasks: number;
  totalTasks: number;
  timeUntilReset: number;
}

const formatTimeRemaining = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const getTaskIcon = (type: string) => {
  switch (type) {
    case 'watchAds':
      return (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
        </svg>
      );
    case 'dailyTarget':
      return (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      );
    case 'watchTime':
      return (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      );
    default:
      return null;
  }
};

const getTaskColor = (type: string): string => {
  switch (type) {
    case 'watchAds':
      return 'bg-blue-500';
    case 'dailyTarget':
      return 'bg-purple-500';
    case 'watchTime':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

const TaskItem: FC<{ task: Task }> = ({ task }) => {
 
  const progressPercentage = (task.progress / task.totalRequired) * 100;
  
 const updateProgress = async () => {
    try {
      const response = await axios.post('/api/tasks', {
        taskId: task.id,
        progress: task.progress + 1,
        completed: task.completed
      });
      console.log('Progress updated:', response.data);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };
  
  return (
    <div 
      className="task-item" 
      data-task-id={task.id}
      onClick={() => !task.completed  && updateProgress()}
    >
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-gray-700/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${getTaskColor(task.type)}/20 flex items-center justify-center`}>
              {getTaskIcon(task.type)}
            </div>
            <div>
              <h4 className="font-medium text-white">{task.title}</h4>
              <p className="text-xs text-gray-400">{task.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium text-${getTaskColor(task.type).replace('bg-', '')}`}>+{task.points} points</p>
            <p className="text-xs text-gray-400 mt-1">
              Progress: {task.progress}/{task.totalRequired}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2 mt-2">
          <div 
            className={`${getTaskColor(task.type)} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-2 text-right text-sm text-gray-400">
          <span className="progress-text">{progressPercentage.toFixed(0)}%</span> completed
        </div>
      </div>
    </div>
  );
};

const StatsOverview: FC<{ stats: TaskStats }> = ({ stats }) => (
  <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl mb-6">
    <div className="grid grid-cols-2 gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Total Points</p>
        <p className="text-2xl font-bold text-purple-500">{stats.totalPoints.toFixed(2)}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Tasks Completed</p>
        <p className="text-2xl font-bold text-yellow-500">{stats.completedTasks}/{stats.totalTasks}</p>
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
        <span className="text-gray-400">Tasks reset in: </span>
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
      <Link href="/mobile/tasks" className="flex flex-col items-center gap-1 p-2 text-purple-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
        </svg>
        <span className="text-xs">Tasks</span>
      </Link>
      <Link href="/mobile/withdraw" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">Withdraw</span>
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

export default function MobilePage() {
  
    const  isLoading = true;

    const data = {
      stats: {
          totalPoints: 1,
         completedTasks: 2,
         totalTasks: 3,
        timeUntilReset: 5,
      },
      tasks: [ ]
    }

 /*  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  } */

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-purple-500">Daily Tasks</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
        <StatsOverview stats={data.stats} />
        <ResetTimer timeUntilReset={data.stats.timeUntilReset} />
        
        <div className="w-full max-w-md space-y-4" id="tasks-container">
          {data.tasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div> 

        <div className="w-full max-w-md mt-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">How Tasks Work</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Complete daily tasks to earn bonus points</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Tasks reset at midnight every day</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span>Progress is saved automatically</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}