import { PaymentMethod } from '../types';

interface WithdrawFormProps {
    withdrawAmount: string;
    onWithdrawAmountChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    children: React.ReactNode;
}

export default function WithdrawForm({
    withdrawAmount,
    onWithdrawAmountChange,
    onSubmit,
    isSubmitting,
    children
}: WithdrawFormProps) {
    return (
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl space-y-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Points to Withdraw</label>
                    <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => onWithdrawAmountChange(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                        disabled={isSubmitting}
                    />
                </div>
                {children}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-all transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span>Submit Withdrawal</span>
                    </>
                )}
            </button>
        </form>
    );
}
