import { SendCard } from "../../../components/SendCard";

export default function() {
    return <div className="w-full p-4"> 
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#6a51a6] mb-2">P2P Transfer</h1>
        <p className="text-gray-600">Send money instantly to friends and family.</p>
      </div>

        <SendCard />

        {/* Transfer Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>                <div>
                  <p className="text-sm font-medium text-gray-800">Instant Transfer</p>
                  <p className="text-xs text-gray-600">Money arrives in seconds</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>                <div>
                  <p className="text-sm font-medium text-gray-800">Secure & Safe</p>
                  <p className="text-xs text-gray-600">Bank-grade security</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>                <div>
                  <p className="text-sm font-medium text-gray-800">No Hidden Fees</p>
                  <p className="text-xs text-gray-600">Free transfers up to ₹10,000</p>
                </div>
              </div>
            </div>
          </div>
    </div>
}