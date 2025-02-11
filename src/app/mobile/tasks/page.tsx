"use client";

import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { selectTasks, selectTasksLoading, selectTasksError } from '@/modules/private/tasks/selectors';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskStats } from '@/components/tasks/TaskStats';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Task, TaskStats as TaskStatsType } from '@/types/task';
import { fetchTasksRequest } from '@/modules/private/tasks/actions';

import { Skeleton } from "antd";


export default function TasksPage() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const isLoading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);

  const handleWatchAd =  (id : string) => {
    dispatch(fetchTasksRequest());
  }

  const stats: TaskStatsType = useMemo(() => ({
     dailyTasksCompleted: tasks?.filter(task => task.status === 'completed').length || 0,
    totalTasksAvailable: tasks?.length || 0,
    totalPointsEarned: tasks?.reduce((total, task) => 
      task.status === 'completed' ? total + task.points : total, 0) || 0  
  }), [tasks]);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  if (isLoading)  return <Skeleton />

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: Unable to load tasks. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen m-auto">
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
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task}  onWatchAd={() => handleWatchAd(task.id)} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}