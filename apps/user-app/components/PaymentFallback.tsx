export const PaymentFallback = () => {
    return <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
                    <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold mb-2">Loading Bank Page...</h3>
                    <p className="text-gray-600">Please do not close this window</p>
                </div>
            </div>
}