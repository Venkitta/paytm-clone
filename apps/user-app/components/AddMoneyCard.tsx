"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "/bank-simulator"
}, {
    name: "Axis Bank",
    redirectUrl: "/bank-simulator"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [loading, setLoading] = useState(false);

    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                if (!amount || amount <= 0) {
                    alert("Please enter a valid amount");
                    return;
                }

                setLoading(true);
            try {
                const result = await createOnRampTransaction(amount * 100, provider);

                if (result.success && result.token){
                    const bankURL = new URL(redirectUrl || "/bank-simulator", window.location.origin);
                    bankURL.searchParams.set('amount', amount.toString());
                    bankURL.searchParams.set('token', result.token);
                    bankURL.searchParams.set('userId', result.userId.toString());
                    bankURL.searchParams.set('returnURL', '/add');
                    bankURL.searchParams.set('provider', provider);

                    window.location.href = bankURL.toString();
                    }

                else{
                    alert(result.message || "Failed to create transaction");
                    }   
                } catch (error) {
                    console.error("Error: ", error);
                    alert("Payment Failed. Please try again");
                } finally{
                    setLoading(false);
                }
                
            }}
            >
            {loading ? "Processing..." : "Add Money"}
            </Button>
        </div>
    </div>
</Card>
}