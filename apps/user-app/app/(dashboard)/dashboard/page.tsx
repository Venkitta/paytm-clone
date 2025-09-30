import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


async function getDashboardData() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const balance = await prisma.balance.findFirst({
        where: {
            userId: userId
        }
    });

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const thisMonthTotal = await prisma.onRampTransaction.aggregate({
      _sum: { amount: true },
        where: {
          userId: Number(session?.user?.id),
          startTime: { gte: startOfMonth }
        }
    });

    const p2pCount = await prisma.p2pTransfer.count({
      where: {
        OR: [
          { fromUserId: userId},
          { toUserId: userId}
        ]
      }
    })

    return {
        amount: balance?.amount || 0,
        thisMonthTotal: thisMonthTotal._sum.amount || 0,
        p2pCount
    }
}


export default async function() {
    const balance = await getDashboardData()
    const data = await getDashboardData();

    return <div className="p-4 w-full h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#6a51a6] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your account overview.</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="mr-8">
              <p className="text-gray-600 text-sm">Total Balance</p>
              <p className="text-2xl font-bold text-gray-800">₹{(data.amount)/100}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-indian-rupee-icon lucide-badge-indian-rupee"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="m13 17-5-1h1a4 4 0 0 0 0-8"/></svg>            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Deposited This Month</p>
              <p className="text-2xl font-bold text-gray-800">₹{data.thisMonthTotal / 100}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m16 19 3 3 3-3"/><path d="M18 12h.01"/><path d="M19 16v6"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total P2P Transfers</p>
              <p className="text-2xl font-bold text-gray-800">{data.p2pCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>            </div>
          </div>
        </div>
      </div>
    </div>
}