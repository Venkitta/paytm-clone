'use client'
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { usePaymentProcessor } from '../lib/hooks/usePaymentProcessor';
import { PaymentFallback } from '../../components/PaymentFallback';
import { PaymentStatusOverlay } from '../../components/PaymentStatusOverlay';
import { PaymentInfo } from '../../components/PaymentInfo';

function BankSimulatorContent() {
    const searchParams = useSearchParams();    
    const amount = searchParams.get('amount');
    const token = searchParams.get('token') || 'TXN' + Date.now();
    const provider = searchParams.get('provider') || 'HDFC Bank';

    const { paymentStatus, processPayment, isProcessing } = usePaymentProcessor(token, amount);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Bank Header */}
                <div className="bg-blue-800 text-white p-6 text-center">
                    <h1 className="text-2xl font-bold mb-1">{provider}</h1>
                    <p className="text-sm opacity-90">Secure Payment Gateway</p>
                </div>

                <PaymentInfo 
                    amount={amount}
                    token={token}
                    paymentStatus={paymentStatus}
                    isProcessing={isProcessing}
                    onPayment={processPayment}
                 />
                
            </div>
            {paymentStatus !== 'idle' && (
                <PaymentStatusOverlay status={paymentStatus} />
                )}
        </div>
    );
}


export default function BankSimulator() {
    return (
        <Suspense fallback={<PaymentFallback />}>
                <BankSimulatorContent />
        </Suspense>
    );
}