import { PaymentMethod } from '../types';

interface PaymentMethodSelectorProps {
    selectedPayment: PaymentMethod;
    isDropdownOpen: boolean;
    onToggleDropdown: () => void;
    onSelectPayment: (payment: PaymentMethod) => void;
    paymentMethods: PaymentMethod[];
}

export default function PaymentMethodSelector({
    selectedPayment,
    isDropdownOpen,
    onToggleDropdown,
    onSelectPayment,
    paymentMethods
}: PaymentMethodSelectorProps) {
    return (
        <div>
            <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={onToggleDropdown}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white flex items-center justify-between focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5">
                            {typeof selectedPayment.icon === 'string' ? (
                                <img src={selectedPayment.icon} alt={selectedPayment.name} className="w-5 h-5" />
                            ) : (
                                selectedPayment.icon
                            )}
                        </div>
                        <span>{selectedPayment.name}</span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-lg">
                        <div className="p-2 space-y-1">
                            {paymentMethods.map((payment) => (
                                <div
                                    key={payment.id}
                                    onClick={() => onSelectPayment(payment)}
                                    className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                                >
                                    <div className="w-5 h-5">
                                        {typeof payment.icon === 'string' ? (
                                            <img src={payment.icon} alt={payment.name} className="w-5 h-5" />
                                        ) : (
                                            payment.icon
                                        )}
                                    </div>
                                    <span>{payment.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
