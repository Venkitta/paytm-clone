import { Card } from "@repo/ui/card"

export const AllTransactions = ({
    transactions
}: {
    transactions: {
        type: "onramp" | "p2p",
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t, i) => <div key = {i} className="flex justify-between border-b py-2">
                <div>
                    <div className="text-sm font-medium">
                        {t.type === "onramp"
                            ? `Deposit via ${t.provider}`
                            : t.status === "Sent"
                            ? `Sent to ${t.provider.replace("To ", "")}`
                            : `Received from ${t.provider.replace("From ", "")}`}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <span className={t.status === "Sent" ? "text-red-600" : "text-green-600"}>
                        {t.status === "Sent" ? `- Rs ${t.amount/100}` : `+ Rs ${t.amount/100}`}
                    </span>
                </div>

            </div>)}
        </div>
    </Card>
}