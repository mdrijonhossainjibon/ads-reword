"use client";

import { FC, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import { TaskIcon } from './TaskIcon';

interface TaskCardProps {
  task: Task;
  onWatchAd: (id : string) => void;
}

export const TaskCard: FC<TaskCardProps> = ({ task   , onWatchAd }) => {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  const handleCheckSubscription = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setChecking(true);
    try {
      const checkResponse = await axios.post('/api/tasks/check-telegram', { 
        taskId: task.id,
        channelUsername: task.platform 
      });
      
      if (checkResponse.data.isSubscribed) {
        await axios.post('/api/tasks/complete', { taskId: task.id });
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
          <TaskIcon type={task.type} />
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
