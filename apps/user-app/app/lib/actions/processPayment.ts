"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function processPayment(token: string, amount: number) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    if (!userId) {
        return {
            success: false,
            message: "User not logged in"
        }
    }

    try {
        await prisma.$transaction([
            prisma.balance.upsert({
                where: {
                    userId: Number(userId)
                },
                update: {
                    amount: {
                        increment: Number(amount) * 100
                    }
                },
                create: {
                    userId: Number(userId),
                    amount: Number(amount) * 100,
                    locked: 0
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: token,
                    userId: Number(userId)
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        return {
            success: true,
            message: "Payment processed successfully"
        };

    } catch (error) {
        console.error('Payment processing error:', error);
        return {
            success: false,
            message: "Error processing payment"
        };
    }
}