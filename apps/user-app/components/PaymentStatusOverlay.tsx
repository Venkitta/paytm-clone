export const PaymentStatusOverlay = ({ 
  status 
}: { 
  status: 'processing' | 'success' | 'error' 
}) => {
    return <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
                        {status === 'processing' && (
                            <>
                                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
                                <p className="text-gray-600">Please do not close this window</p>
                            </>
                        )}
                        
                        {status === 'success' && (
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
                        
                        {status === 'error' && (
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
}


