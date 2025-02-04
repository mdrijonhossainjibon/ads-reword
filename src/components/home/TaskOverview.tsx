'use client';

import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskOverviewProps {
  tasks: Task[];
}

export default function TaskOverview({ tasks }: TaskOverviewProps) {
  return (
    <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
          <h3 className="text-lg font-medium text-white">Daily Tasks</h3>
        </div>
        <Link href="/tasks" className="text-sm text-purple-400 hover:text-purple-300">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                task.completed ? 'bg-purple-500' : 'bg-gray-600'
              }`}>
                {task.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
              </div>
              <span className={`text-sm ${task.completed ? 'text-gray-400' : 'text-white'}`}>
                {task.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
