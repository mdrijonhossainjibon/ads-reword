'use client';

import { useState, useEffect } from 'react';
import { CustomToast } from '@/components/ui/custom-toast';
import { Search, Filter, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Withdrawal {
  _id: string;
  userId: {
    name: string;
    email: string;
    username: string;
  };
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentMethod: string;
  accountDetails: {
    accountNumber?: string;
    accountName?: string;
    bankName?: string;
    walletAddress?: string;
  };
  reason?: string;
  processedBy?: {
    name: string;
    email: string;
  };
  processedAt?: string;
  createdAt: string;
}

interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [processing, setProcessing] = useState<string | null>(null);

  // Fetch withdrawals with current filters
  const fetchWithdrawals = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        status,
        search,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      const response = await fetch(`/api/admin/withdrawals?\${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch withdrawals');
      }

      const data = await response.json();
      setWithdrawals(data.withdrawals);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      CustomToast({
        title: "Error Loading Withdrawals",
        description: error instanceof Error ? error.message : 'Failed to load withdrawals',
        variant: "destructive",
      } as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [status, search]);

  const handleStatusChange = async (withdrawalId: string, newStatus: 'approved' | 'rejected', reason?: string) => {
    try {
      setProcessing(withdrawalId);
      const response = await fetch('/api/admin/withdrawals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ withdrawalId, status: newStatus, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to update withdrawal status');
      }

      CustomToast({
        title: "Status Updated",
        description: `Withdrawal has been \${newStatus} successfully`,
        variant: "success",
      } as any);

      fetchWithdrawals(pagination?.currentPage);
    } catch (error) {
      console.error('Error updating status:', error);
      CustomToast({
        title: "Error Updating Status",
        description: error instanceof Error ? error.message : 'Failed to update status',
        variant: "destructive",
      } as any);
    } finally {
      setProcessing(null);
    }
  };

  const statusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'approved':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
          Withdrawal Requests
        </h1>
        <p className="text-white/60 text-lg">Manage and process withdrawal requests</p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by account details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20 transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-white/40" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20 transition-all duration-200"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Withdrawals List */}
      <div className="space-y-4">
        {loading ? (
          // Loading skeleton
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-slate-700/50 rounded" />
                  <div className="h-3 w-32 bg-slate-700/50 rounded" />
                </div>
                <div className="h-8 w-24 bg-slate-700/50 rounded-lg" />
              </div>
            </div>
          ))
        ) : withdrawals.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            No withdrawal requests found
          </div>
        ) : (
          withdrawals.map((withdrawal) => (
            <div
              key={withdrawal._id}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-6 border border-white/10 transition-all duration-300 hover:border-white/20"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-white/90">
                      {withdrawal.userId.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full border ${statusBadgeClass(withdrawal.status)}`}>
                      {withdrawal.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-white/60">
                    <p>Amount: ${withdrawal.amount.toFixed(2)}</p>
                    <p>Method: {withdrawal.paymentMethod}</p>
                    {withdrawal.accountDetails.accountNumber && (
                      <p>Account: {withdrawal.accountDetails.accountNumber}</p>
                    )}
                    {withdrawal.accountDetails.walletAddress && (
                      <p>Wallet: {withdrawal.accountDetails.walletAddress}</p>
                    )}
                    <p>Requested: {format(new Date(withdrawal.createdAt), 'PPp')}</p>
                  </div>
                </div>

                {withdrawal.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(withdrawal._id, 'approved')}
                      disabled={!!processing}
                      className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing === withdrawal._id ? (
                        <Clock className="animate-spin h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const reason = window.prompt('Please provide a reason for rejection:');
                        if (reason) handleStatusChange(withdrawal._id, 'rejected', reason);
                      }}
                      disabled={!!processing}
                      className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-500 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-white/60">
                    <p>Processed by: {withdrawal.processedBy?.name}</p>
                    <p>
                      {withdrawal.processedAt &&
                        format(new Date(withdrawal.processedAt), 'PPp')}
                    </p>
                    {withdrawal.reason && (
                      <p className="text-red-400">Reason: {withdrawal.reason}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-white/60">
            Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
            {pagination.totalItems} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchWithdrawals(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="p-2 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-white/90">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchWithdrawals(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="p-2 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
