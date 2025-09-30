import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}


export default async function() {
    const balance = await getBalance();

    return <div className="w-full p-4">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#6a51a6] mb-2">Add Money</h1>
            <p className="text-gray-600">Add funds to your account instantly.</p>
        </div>
    
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
        </div>
    </div>
}