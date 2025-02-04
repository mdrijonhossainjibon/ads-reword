'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { LoadingCard } from '@/components/ui/loading-card';

interface StatsData {
  totalUsers: number;
  totalPoints: number;
  pendingWithdrawals: number;
  activeUsers: number;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  details: string;
  time: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats
        const statsResponse = await fetch('/api/admin/stats');
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch activities
        const activityResponse = await fetch('/api/admin/activity');
        if (!activityResponse.ok) throw new Error('Failed to fetch activities');
        const activityData = await activityResponse.json();
        setRecentActivity(activityData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load admin data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value }: { title: string; value: number | null }) => (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <h3 className="text-sm text-white/70 mb-2">{title}</h3>
      {loading ? (
        <LoadingCard />
      ) : (
        <AnimatedCounter 
          value={value || 0} 
          className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text"
          duration={2000}
        />
      )}
    </div>
  );

  return (
    <main className="flex-grow container mx-auto px-4 py-6 animate-fadeIn">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={stats?.totalUsers || null} />
        <StatCard title="Total Points Distributed" value={stats?.totalPoints || null} />
        <StatCard title="Pending Withdrawals" value={stats?.pendingWithdrawals  || null} />
        <StatCard title="Today's Active Users" value={stats?.activeUsers || null} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: 'Withdrawals',
            description: 'Manage withdrawal requests',
            href: '/admin/withdrawals',
            bgColor: 'from-purple-500/20 to-blue-500/20',
            icon: (
              <svg className="w-6 h-6 text-purple-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            title: 'Payments',
            description: 'Configure payment methods',
            href: '/admin/payments',
            bgColor: 'from-emerald-500/20 to-teal-500/20',
            icon: (
              <svg className="w-6 h-6 text-emerald-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            ),
          },
          {
            title: 'Users',
            description: 'Manage user accounts',
            href: '/admin/users',
            bgColor: 'from-pink-500/20 to-rose-500/20',
            icon: (
              <svg className="w-6 h-6 text-pink-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
          },
          {
            title: 'Settings',
            description: 'Configure system settings',
            href: '/admin/settings',
            bgColor: 'from-amber-500/20 to-orange-500/20',
            icon: (
              <svg className="w-6 h-6 text-amber-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
          },
        ].map((action, index) => (
          <Link
            key={action.title}
            href={action.href}
            className={`bg-gradient-to-br ${action.bgColor} backdrop-blur-sm rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 border border-white/10 shadow-lg group`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                {action.title}
              </h3>
              {action.icon}
            </div>
            <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
              {action.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text mb-6">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-white/70">
                <th className="pb-4 font-medium">User</th>
                <th className="pb-4 font-medium">Action</th>
                <th className="pb-4 font-medium">Details</th>
                <th className="pb-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(3).fill(0).map((_, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="py-4"><LoadingCard className="w-24" /></td>
                    <td className="py-4"><LoadingCard className="w-32" /></td>
                    <td className="py-4"><LoadingCard className="w-20" /></td>
                    <td className="py-4"><LoadingCard className="w-16" /></td>
                  </tr>
                ))
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <tr 
                    key={activity.id} 
                    className="border-t border-white/10 hover:bg-white/5 transition-colors animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="py-4 text-white/90">{activity.user}</td>
                    <td className="py-4 text-white/90">{activity.action}</td>
                    <td className="py-4 text-white/90">{activity.details}</td>
                    <td className="py-4 text-white/90">{activity.time}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-t border-white/10">
                  <td colSpan={4} className="py-4 text-center text-white/70">
                    No recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
