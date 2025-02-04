interface BalanceCardProps {
    availablePoints: number;
    minWithdrawal: number;
}

export default function BalanceCard({ availablePoints, minWithdrawal }: BalanceCardProps) {
    return (
        <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl mb-6">
            <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Available Balance</p>
                <p className="text-4xl font-bold text-yellow-500">{availablePoints.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-2">Min. withdrawal: {minWithdrawal} points</p>
            </div>
        </div>
    );
}
