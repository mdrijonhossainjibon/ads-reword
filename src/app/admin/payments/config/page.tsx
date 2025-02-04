'use client';

import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { LoadingCard } from '@/components/ui/loading-card';

interface PaymentMethod {
  id: string;
  type: 'bank' | 'crypto' | 'paypal';
  name: string;
  description?: string;
  isEnabled: boolean;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  fee: number;
  feeType: 'fixed' | 'percentage';
  requiredFields: {
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder: string;
  }[];
  instructions?: string;
  accountDetails: Record<string, string>;
}

type NewPaymentMethod = Omit<PaymentMethod, 'id'>;

export default function PaymentConfigPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyMethod: NewPaymentMethod = {
    type: 'bank',
    name: '',
    description: '',
    isEnabled: true,
    minAmount: 0,
    maxAmount: 0,
    processingTime: '',
    fee: 0,
    feeType: 'fixed',
    requiredFields: [],
    instructions: '',
    accountDetails: {},
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/payment-methods');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch payment methods');
      }
      const data = await response.json();
      setMethods(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load payment methods',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMethod = async (methodId: string, isEnabled: boolean) => {
    try {
      const response = await fetch(`/api/admin/payment-methods/${methodId}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnabled }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update payment method');
      }
      
      toast({
        title: 'Success',
        description: 'Payment method updated successfully',
      });

      fetchPaymentMethods();
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update payment method',
        variant: 'destructive',
      });
    }
  };

  const handleSaveMethod = async (method: PaymentMethod) => {
    try {
      const response = await fetch(`/api/admin/payment-methods/${method.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(method),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save payment method');
      }
      
      toast({
        title: 'Success',
        description: 'Payment method saved successfully',
      });

      setEditingMethod(null);
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error saving payment method:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save payment method',
        variant: 'destructive',
      });
    }
  };

  const handleCreateMethod = async (method: NewPaymentMethod) => {
    try {
      const response = await fetch('/api/admin/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(method),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create payment method');
      }
      
      toast({
        title: 'Success',
        description: 'Payment method created successfully',
      });

      setIsCreating(false);
      setEditingMethod(null);
      fetchPaymentMethods();
    } catch (error) {
      console.error('Error creating payment method:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create payment method',
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 text-transparent bg-clip-text">
            Payment Method Configuration
          </h1>
          {methods.length > 0 && (
            <button
              onClick={() => {
                setEditingMethod(null);
                setIsCreating(true);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 font-medium transition-all duration-200 border border-emerald-500/20 shadow-lg"
            >
              Add New Method
            </button>
          )}
        </div>
        <p className="text-white/70">Configure and manage available payment methods</p>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
              <LoadingCard className="h-32" />
            </div>
          ))
        ) : methods.length > 0 ? (
          methods.map((method) => (
            <div
              key={method.id}
              className={`bg-gradient-to-br ${
                method.type === 'bank' ? 'from-blue-500/20 to-indigo-500/20' :
                method.type === 'crypto' ? 'from-purple-500/20 to-pink-500/20' :
                'from-emerald-500/20 to-teal-500/20'
              } backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden`}
            >
              {/* Method Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      method.type === 'bank' ? 'bg-blue-500/20' :
                      method.type === 'crypto' ? 'bg-purple-500/20' :
                      'bg-emerald-500/20'
                    }`}>
                      {method.type === 'bank' ? (
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      ) : method.type === 'crypto' ? (
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white/90">{method.name}</h3>
                      <p className="text-sm text-white/70">{method.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={method.isEnabled}
                      onChange={(e) => handleToggleMethod(method.id, e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-slate-700/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500/50"></div>
                  </label>
                </div>
              </div>

              {/* Method Details */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/70">Min Amount</p>
                    <p className="text-white/90 font-medium">${method.minAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Max Amount</p>
                    <p className="text-white/90 font-medium">${method.maxAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Processing Time</p>
                    <p className="text-white/90 font-medium">{method.processingTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/70">Fee</p>
                    <p className="text-white/90 font-medium">
                      {method.fee}{method.feeType === 'percentage' ? '%' : '$'}
                    </p>
                  </div>
                </div>

                {/* Required Fields */}
                <div>
                  <p className="text-sm text-white/70 mb-2">Required Fields</p>
                  <div className="space-y-2">
                    {method.requiredFields.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/30" />
                        <span className="text-sm text-white/90">{field.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setEditingMethod(method)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-sm font-medium transition-colors"
                  >
                    Edit Configuration
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white/90 mb-2">No Payment Methods Configured</h3>
            <p className="text-white/70 mb-6">Get started by adding your first payment method</p>
            <button
              onClick={() => {
                setEditingMethod(null);
                setIsCreating(true);
              }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 font-medium transition-all duration-200 border border-emerald-500/20 shadow-lg"
            >
              Add Payment Method
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {(editingMethod || isCreating) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-white/10 shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white/90 mb-4">
                {isCreating ? 'Add Payment Method' : 'Edit Payment Method'}
              </h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (isCreating) {
                  const newMethod: NewPaymentMethod = {
                    type: editingMethod?.type || emptyMethod.type,
                    name: editingMethod?.name || emptyMethod.name,
                    description: editingMethod?.description || emptyMethod.description,
                    isEnabled: editingMethod?.isEnabled ?? emptyMethod.isEnabled,
                    minAmount: editingMethod?.minAmount || emptyMethod.minAmount,
                    maxAmount: editingMethod?.maxAmount || emptyMethod.maxAmount,
                    processingTime: editingMethod?.processingTime || emptyMethod.processingTime,
                    fee: editingMethod?.fee || emptyMethod.fee,
                    feeType: editingMethod?.feeType || emptyMethod.feeType,
                    requiredFields: editingMethod?.requiredFields || emptyMethod.requiredFields,
                    instructions: editingMethod?.instructions || emptyMethod.instructions,
                    accountDetails: editingMethod?.accountDetails || emptyMethod.accountDetails,
                  };
                  handleCreateMethod(newMethod);
                } else if (editingMethod) {
                  handleSaveMethod(editingMethod);
                }
              }} className="space-y-6">
                {/* Method Type (only for new methods) */}
                {isCreating && (
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Payment Method Type</label>
                    <select
                      value={editingMethod?.type || emptyMethod.type}
                      onChange={(e) => setEditingMethod((prev : any )=> ({
                        ...(prev || emptyMethod),
                        type: e.target.value as 'bank' | 'crypto' | 'paypal'
                      }))}
                      className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option value="bank">Bank Transfer</option>
                      <option value="crypto">Cryptocurrency</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Name</label>
                    <input
                      type="text"
                      value={editingMethod?.name || emptyMethod.name}
                      onChange={(e) => setEditingMethod((prev : any) => ({
                        ...(prev || emptyMethod),
                        name: e.target.value
                      }))}
                      className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Description</label>
                    <textarea
                      value={editingMethod?.description || emptyMethod.description}
                      onChange={(e) => setEditingMethod(( prev : any) => ({
                        ...(prev || emptyMethod),
                        description: e.target.value
                      }))}
                      className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Amounts and Fees */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Min Amount ($)</label>
                    <input
                      type="number"
                      value={editingMethod?.minAmount || emptyMethod.minAmount}
                      onChange={(e) => setEditingMethod((prev : any) => ({
                        ...(prev || emptyMethod),
                        minAmount: Number(e.target.value)
                      }))}
                      className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Max Amount ($)</label>
                    <input
                      type="number"
                      value={editingMethod?.maxAmount || emptyMethod.maxAmount}
                      onChange={(e) => setEditingMethod((prev : any )=> ({
                        ...(prev || emptyMethod),
                        maxAmount: Number(e.target.value)
                      }))}
                      className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Fee</label>
                    <input
                      type="number"
                      value={editingMethod?.fee || emptyMethod.fee}
                      onChange={(e) => setEditingMethod((prev  : any) => ({
                        ...(prev || emptyMethod),
                        fee: Number(e.target.value)
                      }))}
                      className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-1">Fee Type</label>
                    <select
                      value={editingMethod?.feeType || emptyMethod.feeType}
                      onChange={(e) => setEditingMethod((prev : any)=> ({
                        ...(prev || emptyMethod),
                        feeType: e.target.value as 'fixed' | 'percentage'
                      }))}
                      className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option value="fixed">Fixed</option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>
                </div>

                {/* Processing Time */}
                <div>
                  <label className="block text-sm text-white/70 mb-1">Processing Time</label>
                  <input
                    type="text"
                    value={editingMethod?.processingTime || emptyMethod.processingTime}
                    onChange={(e) => setEditingMethod((prev : any)=> ({
                      ...(prev || emptyMethod),
                      processingTime: e.target.value
                    }))}
                    className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="e.g., 1-2 business days"
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm text-white/70 mb-1">Instructions</label>
                  <textarea
                    value={editingMethod?.instructions || emptyMethod.instructions}
                    onChange={(e) => setEditingMethod((prev  : any)=> ({
                      ...(prev || emptyMethod),
                      instructions: e.target.value
                    }))}
                    className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingMethod(null);
                      setIsCreating(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium transition-colors"
                  >
                    {isCreating ? 'Create Method' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
