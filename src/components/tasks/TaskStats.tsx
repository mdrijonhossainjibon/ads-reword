import { FC } from 'react';
import { TaskStats as TaskStatsType } from '@/types/task';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats: FC<TaskStatsProps> = ({ stats }) => (
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
