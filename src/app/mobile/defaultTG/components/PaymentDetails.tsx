interface PaymentDetailsProps {
    paymentMethod: string;
    paymentDetails: string;
    onPaymentDetailsChange: (value: string) => void;
    isSubmitting?: boolean;
}

export default function PaymentDetails({
    paymentMethod,
    paymentDetails,
    onPaymentDetailsChange,
    isSubmitting = false
}: PaymentDetailsProps) {
    const renderPaymentFields = () => {
        switch (paymentMethod) {
            case 'binance':
                return (
                    <div>
                        <h4 className="text-sm font-medium text-yellow-500 mb-2">Binance Withdrawal</h4>
                        <p className="text-xs text-gray-400">Enter your Binance UID to receive funds directly to your Binance account. Find your UID in Binance account settings.</p>
                        <input
                            type="text"
                            value={paymentDetails}
                            onChange={(e) => onPaymentDetailsChange(e.target.value)}
                            placeholder="Enter your Binance UID"
                            className="mt-4 w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            disabled={isSubmitting}
                        />
                    </div>
                );

            case 'bkash':
            case 'nagad':
                return (
                    <div>
                        <h4 className="text-sm font-medium text-yellow-500 mb-2">Mobile Payment</h4>
                        <p className="text-xs text-gray-400">Enter your phone number starting with 1 (e.g., 1XXXXXXXXX). Make sure the number is registered with your selected payment method.</p>
                        <div className="relative mt-4">
                            <span className="absolute left-4 text-gray-500">+880</span>
                            <input
                                type="tel"
                                value={paymentDetails}
                                onChange={(e) => onPaymentDetailsChange(e.target.value)}
                                placeholder="1XXXXXXXXX"
                                maxLength={10}
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-16 pr-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                );

            case 'xrocket':
                return (
                    <div>
                        <h4 className="text-sm font-medium text-yellow-500 mb-2">Xrocket Bot Withdrawal</h4>
                        <p className="text-xs text-gray-400">Enter your Telegram username. You'll receive payment through the Xrocket Telegram bot. Make sure to start the bot first.</p>
                        <div className="relative mt-4">
                            <span className="absolute left-4 text-gray-500">@</span>
                            <input
                                type="text"
                                value={paymentDetails}
                                onChange={(e) => onPaymentDetailsChange(e.target.value)}
                                placeholder="your_telegram_username"
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                );

            case 'coinbase':
                return (
                    <div>
                        <h4 className="text-sm font-medium text-yellow-500 mb-2">Coinbase Withdrawal</h4>
                        <p className="text-xs text-gray-400">Enter the email address associated with your Coinbase account. You'll receive the funds directly in your Coinbase wallet.</p>
                        <input
                            type="email"
                            value={paymentDetails}
                            onChange={(e) => onPaymentDetailsChange(e.target.value)}
                            placeholder="your.email@example.com"
                            className="mt-4 w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            disabled={isSubmitting}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-800/30 rounded-xl p-4 mb-6">
            {renderPaymentFields()}
        </div>
    );
}
