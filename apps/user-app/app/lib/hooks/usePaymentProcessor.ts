import { useRouter } from "next/navigation";
import { useState } from "react";

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export const usePaymentProcessor = (token: string, amount: string | null) => {
  const router = useRouter();
  const returnUrl = '/add';
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  const processPayment = async () => {
    setPaymentStatus('processing');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, amount })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Payment failed');
      }
      
      if (result.success) {
        setPaymentStatus('success');
        setTimeout(() => router.push(returnUrl), 2000);
      } else {
        throw new Error(result.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      
      setTimeout(() => {
        setPaymentStatus('idle');
      }, 3000);
    }
  };

  return {
    paymentStatus,
    processPayment,
    isProcessing: paymentStatus !== 'idle',
  };
};