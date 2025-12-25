"use client";

import { satoshi } from "./font";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  // Animation variants for staggered entry
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <main className={`${satoshi.className} min-h-screen md:h-screen md:overflow-hidden flex flex-col items-center justify-center py-12 px-4 md:px-8 md:py-4 selection:bg-[#A34EF4] selection:text-white`}>
      {/* Hero Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-center max-w-4xl flex flex-col items-center justify-center mb-12"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-6 mt-5">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#A34EF4] shadow-lg shadow-[#A34EF4]/20">
            <div className="w-6 h-6 rounded-xl bg-white"></div>
          </div>
          <h3 className="font-bold text-2xl tracking-tight">PayTm</h3>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold flex flex-col items-center gap-2 justify-center mb-6 leading-[1.1]">
          Manage Your Finances
          <span className="text-[#A34EF4]">Effortlessly</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Secure payments, smart budgeting, and complete financial control—all in one place.
        </motion.p>

        {/* CTA Button */}
        <Link href="/auth/signin">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center gap-2 rounded-3xl border border-[#A34EF4] bg-[#A34EF4] text-white px-6 py-3 font-medium transition-colors hover:bg-[#8B3BD9] shadow-lg shadow-[#A34EF4]/30"
          >
            
            Get Started 
            <ArrowRight 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.div>
        </Link>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        <FeatureCard 
          icon={<Zap className="text-white" size={24} />} 
          title="Instant Transfers" 
          desc="Send and receive money in seconds with our lightning-fast system" 
        />
        <FeatureCard 
          icon={<Shield className="text-white" size={24} />} 
          title="Bank-Level Security" 
          desc="Your data is protected with advanced encryption technology" 
        />
        <FeatureCard 
          icon={<Lock className="text-white" size={24} />} 
          title="Complete Privacy" 
          desc="We never share your financial information with third parties" 
        />
      </motion.div>

      {/* Footer Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-xs text-gray-500 mt-16 md:mt-10 md:mb-5 flex items-center gap-1 opacity-80"
      >
        <span>🔒</span> Your financial data is secured with bank-level encryption
      </motion.p>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-gray-100">
      <div className="bg-[#A34EF4] w-12 h-12 rounded-2xl flex items-center justify-center shadow-md shadow-[#A34EF4]/20 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}