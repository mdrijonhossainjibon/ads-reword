'use client';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import BalanceCard from './components/BalanceCard';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import PaymentDetails from './components/PaymentDetails';
import WithdrawForm from './components/WithdrawForm';
import { PaymentMethod } from './types';
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from 'react-redux';
import { getMeRequest, selectMe } from '@/modules/private/user';
import { withdrawRequest } from '@/modules/private/withdraw';

export default function WithdrawPage() {

    const { data: session } = useSession();
 
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(getMeRequest())
    }, [dispatch])

    const me = useSelector(selectMe);
 
    
    const [withdrawAmount, setWithdrawAmount] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>({
        id: 'binance',
        name: 'Binance',
        icon: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png'
    });
    const [paymentDetails, setPaymentDetails] = useState<string>('');

    const paymentMethods: PaymentMethod[] = [
        {
            id: 'binance',
            name: 'Binance',
            icon: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png'
        },
        {
            id: 'bkash',
            name: 'bKash',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: 'nagad',
            name: 'Nagad',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: 'xrocket',
            name: 'Xrocket Bot',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            id: 'coinbase',
            name: 'Coinbase',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        }
    ];

    const validateForm = () => {


        if (!paymentDetails) {
            toast.error('Please enter your payment details');
            return false;
        }



        return true;
    };

    const handlePaymentSelect = (payment: PaymentMethod) => {
        setSelectedPayment(payment);
        setIsDropdownOpen(false);
        setPaymentDetails('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);
            dispatch(withdrawRequest({
                    amount: withdrawAmount,
                    paymentMethod: selectedPayment.id,
                    paymentDetails: paymentDetails
            }))
             
 
            // Update local state

            setWithdrawAmount('');
            setPaymentDetails('');

            toast.success('Withdrawal request submitted successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to process withdrawal');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="m-0 p-0 bg-gradient-to-br from-gray-900 to-black text-white font-sans min-h-screen">
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 5000,
                    style: {
                        background: '#1F2937',
                        color: '#fff',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10B981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <Navbar userName="User Name" />

            <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-start min-h-screen pt-20 pb-24">
                <BalanceCard availablePoints={me?.balance || 0} minWithdrawal={50} />

                <WithdrawForm
                    withdrawAmount={withdrawAmount}
                    onWithdrawAmountChange={setWithdrawAmount}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                >
                    <PaymentMethodSelector
                        selectedPayment={selectedPayment}
                        isDropdownOpen={isDropdownOpen}
                        onToggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
                        onSelectPayment={handlePaymentSelect}
                        paymentMethods={paymentMethods}
                    />
                </WithdrawForm>

                <PaymentDetails
                    paymentMethod={selectedPayment.id}
                    paymentDetails={paymentDetails}
                    onPaymentDetailsChange={setPaymentDetails}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}