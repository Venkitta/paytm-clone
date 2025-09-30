"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    return <div className="w-full">
        <Center>
            <Card title="Send">
                <div className="w-full">
                    <TextInput placeholder={"Try - 1234512345"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            try{
                                setLoading(true);    
                                const result = await p2pTransfer(number, Number(amount) * 100);

                                if (!result.success) {
                                    alert("Transfer failed: " + result.message);
                                } else {
                                    alert("Transfer successful!");
                                }
                            } finally{
                                setLoading(false);
                            }
                        }}>{loading ? "Sending..." : "Send"}</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}