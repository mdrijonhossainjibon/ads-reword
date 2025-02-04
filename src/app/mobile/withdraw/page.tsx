"use client";

import { FC, useState } from 'react';
import Link from 'next/link';
import { WithdrawStats } from '@/components/withdraw/WithdrawStats';
import { WithdrawForm } from '@/components/withdraw/WithdrawForm';

const BottomNav: FC = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-sm border-t border-gray-800 py-2 px-4">
    <div className="flex items-center justify-around max-w-md mx-auto">
      <Link href="/mobile" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/mobile/tasks" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
        </svg>
        <span className="text-xs">Tasks</span>
      </Link>
      <Link href="/mobile/watch" className="flex flex-col items-center gap-1 p-2 text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">Watch</span>
      </Link>
      <Link href="/mobile/withdraw" className="flex flex-col items-center gap-1 p-2 text-purple-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span className="text-xs">Withdraw</span>
      </Link>
    </div>
  </div>
);

export default function WithdrawPage() {
  const handleWithdraw = async (values: any) => {
    try {
      // Here you would typically make an API call to process the withdrawal
      console.log('Processing withdrawal:', values);
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500';
      notification.textContent = 'Withdrawal request submitted successfully!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    } catch (error) {
      // Show error message
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500';
      notification.textContent = 'Failed to process withdrawal. Please try again.';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-purple-500">Withdraw</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
        <WithdrawStats
          balance={75.50}
          totalWithdrawn={150.00}
          pendingWithdrawals={25.00}
        />

        <WithdrawForm
          onSubmit={handleWithdraw}
          minAmount={10}
          maxAmount={75.50}
        />
      </div>

      <BottomNav />
    </div>
  );
}
