"use client"

import { useTasks } from '../hooks/useTasks';
import { Skeleton } from "antd";

export default function TaskOverview() {
    const { tasks, loading, error } = useTasks()

    if (loading) return  <Skeleton active />
    if (error) return <div>Error: {error}</div>

    return (
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                    <h3 className="text-lg font-medium text-white">Daily Tasks</h3>
                </div>
                <a href="/mobile/tasks" className="text-sm text-purple-400 hover:text-purple-300">View All</a>
            </div>
            <div className="space-y-4">
                {tasks.map(task => (
                    <div key={task.id} className="bg-gray-700/50 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-white">{task.title}</h4>
                            <span className="text-xs text-green-400">+{task.reward.toFixed(2)} points</span>
                        </div>
                        <div className="w-full bg-gray-600/50 rounded-full h-2">
                            <div 
                                className="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${(task.progress / task.total) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-400">Progress</span>
                            <span className="text-xs text-gray-400">{task.progress}/{task.total}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
