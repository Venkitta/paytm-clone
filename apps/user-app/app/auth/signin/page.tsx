"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignInPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!phone && !password) {
      alert("Please enter your phone number and password.");
      setIsLoading(false);
      return;
    } 

    if (!phone) {
      alert("Please enter your phone number.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      setIsLoading(false);
      return;
    }

    try {
        const result = await signIn('credentials', {
            phone: phone,
            password: password,
            redirect: false
        });
        if (result?.ok) {
            router.push('/dashboard');
        } else {
            alert('Login failed: ' + "Invalid phone number or password.");
        }
    } catch (error) {
        console.error('Sign in error:', error);
        alert('An unexpected error occurred. Please try again.');
    } finally {
        setIsLoading(false);
    }    
      };

  return (
    <div className="min-h-screen bg-[#F4F2F1]">      
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
              Welcome Back to PayTM
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to manage your finances
            </p>
          </div>

          {/* Sign In Form */}
          <div className="bg-[#FFFFFF] rounded-2xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"/>
                    </svg>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="  Enter - 1234567890"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="  Enter - anas"
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a href="#" className="text-sm text-gray-600 hover:text-purple-500 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type='submit'
                disabled={isLoading}
                className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
              >
                {isLoading ? <>Signing in...<svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg></> : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              🔒 Your financial data is secured with bank-level encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;