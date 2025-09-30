import { NextRequest, NextResponse } from 'next/server';
import { processPayment } from '../../lib/actions/processPayment';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token, amount } = body;

        if (!token || !amount) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const result = await processPayment(token, Number(amount));
        
        if (result.success) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json(result, { status: 500 });
        }

    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json(
            { success: false, message: "Error processing payment" },
            { status: 500 }
        );
    }
}