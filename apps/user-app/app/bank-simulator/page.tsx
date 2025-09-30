'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';

function BankSimulatorContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    
    const amount = searchParams.get('amount');
    const token = searchParams.get('token') || 'TXN' + Date.now();
    const returnUrl = '/add';
    const provider = searchParams.get('provider') || 'HDFC Bank';

    const processPayment = async () => {
        setLoading(true);
        setPaymentStatus('processing');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const response = await fetch('/api/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    amount: amount
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                setPaymentStatus('success');

                setTimeout(() => {
                    router.push(returnUrl);
                }, 2000);
            } else {
                throw new Error(result.message || 'Payment failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setPaymentStatus('error');
            // Reset after delay
            setTimeout(() => {
                setPaymentStatus('idle');
                setLoading(false);
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Bank Header */}
                <div className="bg-blue-800 text-white p-6 text-center">
                    <h1 className="text-2xl font-bold mb-1">{provider}</h1>
                    <p className="text-sm opacity-90">Secure Payment Gateway</p>
                </div>

                {/* Payment Info */}
                <div className="p-8 text-center">
                    <div className="text-4xl font-bold text-blue-800 mb-6">
                        <span className="mr-5">₹</span>{amount}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Merchant:</span>
                            <span className="font-semibold">PayTM Wallet</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Transaction ID:</span>
                            <span className="font-semibold">{token}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-semibold">Net Banking</span>
                        </div>
                    </div>

                    {paymentStatus === 'idle' && (
                        <button
                            onClick={processPayment}
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Complete Payment'}
                        </button>
                    )}

                    <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
                        🔒 Your payment is secured with 256-bit SSL encryption<br />
                        This is a simulated payment environment
                    </div>
                </div>
            </div>

            {/* Loading/Status Overlay */}
            {paymentStatus !== 'idle' && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
                        {paymentStatus === 'processing' && (
                            <>
                                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
                                <p className="text-gray-600">Please do not close this window</p>
                            </>
                        )}
                        
                        {paymentStatus === 'success' && (
                            <>
                                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                                <p className="text-gray-600">Redirecting to your wallet...</p>
                            </>
                        )}
                        
                        {paymentStatus === 'error' && (
                            <>
                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-red-600 mb-2">Payment Failed</h3>
                                <p className="text-gray-600">Please try again</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


export default function BankSimulator() {
    return (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
                                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <h3 className="text-xl font-bold mb-2">Loading Bank Page...</h3>
                                <p className="text-gray-600">Please do not close this window</p>
                    </div>
                        </div>}>
                <BankSimulatorContent />
        </Suspense>
    );
}