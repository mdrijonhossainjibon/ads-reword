import { FC } from 'react';

interface WithdrawStatsProps {
  balance: number;
  totalWithdrawn: number;
  pendingWithdrawals: number;
}

export const WithdrawStats: FC<WithdrawStatsProps> = ({ balance, totalWithdrawn, pendingWithdrawals }) => (
  <div className="w-full max-w-md">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Available Balance</p>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-green-500">
                ${balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Total Withdrawn</p>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-500">
                ${totalWithdrawn.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Pending</p>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-500">
                ${pendingWithdrawals.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
