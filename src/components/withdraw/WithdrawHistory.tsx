import { FC } from 'react';
import { Table } from 'antd';

interface WithdrawalRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
}

interface WithdrawHistoryProps {
  withdrawals: WithdrawalRecord[];
}

export const WithdrawHistory: FC<WithdrawHistoryProps> = ({ withdrawals }) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pending: 'text-yellow-500',
          completed: 'text-green-500',
          failed: 'text-red-500',
        };
        return <span className={colors[status as keyof typeof colors]}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
      },
    },
  ];

  return (
    <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Withdrawal History</h2>
      <Table
        dataSource={withdrawals}
        columns={columns}
        pagination={{ pageSize: 5 }}
        className="custom-table"
        rowKey="id"
      />
    </div>
  );
};
