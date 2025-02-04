'use client';

import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { LoadingCard } from '@/components/ui/loading-card';

interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  status: 'active' | 'suspended' | 'pending';
  joinedAt: string;
  lastActive: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'suspended' | 'pending'>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update user status');
      
      toast({
        title: 'Success',
        description: 'User status updated successfully',
      });

      // Refresh users list
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user status',
        variant: 'destructive',
      });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="container mx-auto px-4 py-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 text-transparent bg-clip-text">
          User Management
        </h1>
        <p className="text-white/70">Manage and monitor user accounts, status, and activity</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: 'Total Users',
            value: users.length,
            icon: (
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ),
            color: 'from-blue-500/20 to-indigo-500/20',
            textColor: 'text-blue-400'
          },
          {
            title: 'Active Users',
            value: users.filter(u => u.status === 'active').length,
            icon: (
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            color: 'from-emerald-500/20 to-green-500/20',
            textColor: 'text-emerald-400'
          },
          {
            title: 'Suspended Users',
            value: users.filter(u => u.status === 'suspended').length,
            icon: (
              <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ),
            color: 'from-rose-500/20 to-red-500/20',
            textColor: 'text-rose-400'
          },
          {
            title: 'Pending Users',
            value: users.filter(u => u.status === 'pending').length,
            icon: (
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            color: 'from-amber-500/20 to-yellow-500/20',
            textColor: 'text-amber-400'
          }
        ].map((stat, index) => (
          <div
            key={stat.title}
            className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white/10 rounded-lg">
                {stat.icon}
              </div>
              <span className={`text-2xl font-bold ${stat.textColor}`}>
                {loading ? '-' : stat.value}
              </span>
            </div>
            <h3 className="text-sm text-white/70">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 pl-10 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <select
            className="px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[150px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
            <option value="pending">Pending Only</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Username</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Points</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Last Active</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><LoadingCard className="w-24" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-32" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-16" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-20" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-24" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-24" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-20" /></td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                          <span className="text-sm font-medium text-white/90">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white/90 font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/90">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-white/90 font-medium">{user.points?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-emerald-500/20 text-emerald-300' :
                        user.status === 'suspended' ? 'bg-red-500/20 text-red-300' :
                        'bg-amber-500/20 text-amber-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'active' ? 'bg-emerald-400' :
                          user.status === 'suspended' ? 'bg-red-400' :
                          'bg-amber-400'
                        }`} />
                        {user?.status?.charAt(0).toUpperCase() + user?.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/90">{new Date(user?.joinedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-white/90">{new Date(user?.lastActive).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <select
                        className="px-3 py-1.5 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all opacity-0 group-hover:opacity-100"
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value as any)}
                      >
                        <option value="active">Set Active</option>
                        <option value="suspended">Suspend</option>
                        <option value="pending">Set Pending</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-white/70">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <span className="font-medium">No users found</span>
                      <span className="text-sm">Try adjusting your search or filter</span>
                    </div>
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
