import { FC, FormEvent, useState } from 'react';

interface WithdrawFormProps {
  onSubmit: (values: any) => void;
  minAmount: number;
  maxAmount: number;
}

export const WithdrawForm: FC<WithdrawFormProps> = ({ onSubmit, minAmount, maxAmount }) => {
  const [formData, setFormData] = useState({
    method: '',
    amount: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.method) {
      newErrors.method = 'Please select payment method';
    }
    if (!formData.amount) {
      newErrors.amount = 'Please enter amount';
    } else {
      const amount = parseFloat(formData.amount);
      if (amount < minAmount) {
        newErrors.amount = `Minimum amount is $${minAmount}`;
      }
      if (amount > maxAmount) {
        newErrors.amount = `Maximum amount is $${maxAmount}`;
      }
    }
    if (!formData.address) {
      newErrors.address = 'Please enter payment address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-6">Withdraw Funds</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-gray-300 text-base">
            Payment Method
          </label>
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            className={`w-full bg-gray-900 border ${
              errors.method ? 'border-red-500' : 'border-gray-700'
            } text-white rounded-xl px-4 h-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
          >
            <option value="" disabled>Select payment method</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
            <option value="crypto">Cryptocurrency</option>
          </select>
          {errors.method && (
            <p className="text-red-500 text-sm mt-1">{errors.method}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-base">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              step="0.01"
              min={minAmount}
              max={maxAmount}
              className={`w-full bg-gray-900 border ${
                errors.amount ? 'border-red-500' : 'border-gray-700'
              } text-white rounded-xl px-4 pl-8 h-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-base">
            Payment Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your payment address"
            className={`w-full bg-gray-900 border ${
              errors.address ? 'border-red-500' : 'border-gray-700'
            } text-white rounded-xl px-4 h-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl h-14 text-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-8 shadow-lg hover:shadow-purple-500/20"
        >
          Submit Withdrawal
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <p className="text-sm text-gray-300">
          <span className="text-yellow-400">Note:</span> Minimum withdrawal: ${minAmount}, Maximum: ${maxAmount}
        </p>
      </div>
    </div>
  );
};
