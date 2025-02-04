'use client';

import { useState } from 'react';

export default function Withdraw() {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: '',
    walletAddress: '',
  });

  const withdrawalHistory = [
    {
      id: 1,
      amount: '$25.00',
      method: 'PayPal',
      status: 'Completed',
      date: '2024-01-31',
    },
    {
      id: 2,
      amount: '$50.00',
      method: 'Bitcoin',
      status: 'Processing',
      date: '2024-01-30',
    },
    {
      id: 3,
      amount: '$30.00',
      method: 'Bank Transfer',
      status: 'Completed',
      date: '2024-01-29',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal request
    console.log(formData);
  };

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Withdraw Funds
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose your preferred payment method and withdraw your earnings
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Withdrawal Form */}
          <div className="bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800/5 rounded-xl">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between rounded-lg bg-primary-50 dark:bg-primary-900/10 p-4 text-primary-700 dark:text-primary-200">
                <span className="text-sm font-medium">Available Balance:</span>
                <span className="text-lg font-semibold">$50.00</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Amount to Withdraw
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Payment Method
                  </label>
                  <select
                    id="payment-method"
                    name="payment-method"
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="paypal">PayPal</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Wallet/Account Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="wallet"
                      id="wallet"
                      className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your wallet or account details"
                      value={formData.walletAddress}
                      onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Request Withdrawal
                </button>
              </form>
            </div>
          </div>

          {/* Withdrawal History */}
          <div className="bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-800/5 rounded-xl">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Withdrawal History</h2>
              <div className="mt-6 flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  {withdrawalHistory.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.amount}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.method}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                            ${
                              item.status === 'Completed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                            }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
