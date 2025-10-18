interface PaymentInfoProps {
    amount: string | null;
    token: string;
    paymentStatus: 'idle' | 'processing' | 'success' | 'error';
    isProcessing: boolean;
    onPayment: () => void;
}

export const PaymentInfo = ({ 
    amount, 
    token, 
    paymentStatus, 
    isProcessing,
    onPayment 
}: PaymentInfoProps) => {
    return <div className="p-8 text-center">
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
                            onClick={onPayment}
                            disabled={isProcessing}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? 'Processing...' : 'Complete Payment'}
                        </button>
                    )}

                    <div className="text-xs text-gray-500 mt-4 pt-4 border-t">
                        🔒 Your payment is secured with 256-bit SSL encryption<br />
                        This is a simulated payment environment
                    </div>
                </div>
}