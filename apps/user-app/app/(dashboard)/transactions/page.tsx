import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AllTransactions } from "../../../components/AllTransactions";

async function getTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const onRamps = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId
        }
    });

    const p2ps = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    },
    include: {
      fromUser: true,
      toUser: true
    }
  });


    const formattedOnRamps = onRamps.map(t => ({
        type: "onramp" as const,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));

    const formattedP2Ps = p2ps.map(t => ({
        type: "p2p" as const,
        time: t.timestamp,
        amount: t.amount,
        status: t.fromUserId === userId ? "Sent" : "Received",
        provider: t.fromUserId === userId ? `To ${t.toUser.number}` : `From ${t.fromUser.number}`
    }));

    return [...formattedOnRamps, ...formattedP2Ps].sort(
        (a,b) => b.time.getTime() - a.time.getTime()
    )
}

export default async function() {
    const transactions = await getTransactions();

    return <div className="w-full h-screen p-4">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#6a51a6] mb-2">Transactions</h1>
            <p className="text-gray-600">View and manage all your transaction history.</p>
        </div>
        <AllTransactions transactions={transactions} />
        </div>
}