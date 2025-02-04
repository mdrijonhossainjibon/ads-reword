'use client';

import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { LoadingCard } from '@/components/ui/loading-card';

interface Payment {
  id: string;
  userId: string;
  username: string;
  amount: number;
  method: 'bank' | 'crypto' | 'paypal';
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  details: {
    accountInfo?: string;
    transactionId?: string;
    notes?: string;
  };
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'rejected'>('all');
  const [methodFilter, setMethodFilter] = useState<'all' | 'bank' | 'crypto' | 'paypal'>('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/payments');
      if (!response.ok) throw new Error('Failed to fetch payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load payments. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (paymentId: string, newStatus: 'pending' | 'completed' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update payment status');
      
      toast({
        title: 'Success',
        description: 'Payment status updated successfully',
      });

      fetchPayments();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update payment status',
        variant: 'destructive',
      });
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.details.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter === 'all' || payment.status === filter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = filteredPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <main className="container mx-auto px-4 py-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 text-transparent bg-clip-text">
          Payment Management
        </h1>
        <p className="text-white/70">Process and monitor payment requests</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: 'Total Payments',
            value: payments.length,
            icon: (
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
            color: 'from-blue-500/20 to-indigo-500/20',
            textColor: 'text-blue-400'
          },
          {
            title: 'Total Amount',
            value: totalAmount,
            prefix: '$',
            icon: (
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            color: 'from-emerald-500/20 to-green-500/20',
            textColor: 'text-emerald-400'
          },
          {
            title: 'Pending Amount',
            value: pendingAmount,
            prefix: '$',
            icon: (
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            color: 'from-amber-500/20 to-yellow-500/20',
            textColor: 'text-amber-400'
          },
          {
            title: 'Pending Requests',
            value: payments.filter(p => p.status === 'pending').length,
            icon: (
              <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
            color: 'from-rose-500/20 to-red-500/20',
            textColor: 'text-rose-400'
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
                {loading ? '-' : stat.prefix ? `${stat.prefix}${stat.value.toLocaleString()}` : stat.value.toLocaleString()}
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
                placeholder="Search by username or transaction ID..."
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
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            className="px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[150px]"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value as any)}
          >
            <option value="all">All Methods</option>
            <option value="bank">Bank Transfer</option>
            <option value="crypto">Cryptocurrency</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Method</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Details</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><LoadingCard className="w-32" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-24" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-20" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-24" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-40" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-32" /></td>
                    <td className="px-6 py-4"><LoadingCard className="w-24" /></td>
                  </tr>
                ))
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr 
                    key={payment.id} 
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                          <span className="text-sm font-medium text-white/90">
                            {payment.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white/90 font-medium">{payment.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/90 font-medium">${payment.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
                        payment.method === 'bank' ? 'bg-blue-500/20 text-blue-300' :
                        payment.method === 'crypto' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
                        payment.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                        payment.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                        'bg-amber-500/20 text-amber-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          payment.status === 'completed' ? 'bg-emerald-400' :
                          payment.status === 'rejected' ? 'bg-red-400' :
                          'bg-amber-400'
                        }`} />
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {payment.details.transactionId && (
                          <span className="text-xs text-white/70">
                            ID: {payment.details.transactionId}
                          </span>
                        )}
                        {payment.details.accountInfo && (
                          <span className="text-xs text-white/70">
                            Account: {payment.details.accountInfo}
                          </span>
                        )}
                        {payment.details.notes && (
                          <span className="text-xs text-white/70">
                            Note: {payment.details.notes}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="px-3 py-1.5 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all opacity-0 group-hover:opacity-100"
                        value={payment.status}
                        onChange={(e) => handleStatusChange(payment.id, e.target.value as any)}
                        disabled={payment.status === 'completed' || payment.status === 'rejected'}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Complete</option>
                        <option value="rejected">Reject</option>
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
                      <span className="font-medium">No payments found</span>
                      <span className="text-sm">Try adjusting your search or filters</span>
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
