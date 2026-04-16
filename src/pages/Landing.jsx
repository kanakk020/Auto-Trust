import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, ArrowRight, ChevronRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/logo.png';

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yPosReverse = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <motion.div 
          style={{ y: yPos }}
          className="absolute w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div 
          style={{ y: yPosReverse }}
          className="absolute w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 mix-blend-screen"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-md border-b border-white/5 bg-[#020617]/60 sticky top-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="transition-all duration-300">
            <img src={heroImg} alt="Auto Trust" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
            AUTO TRUST
          </span>
        </Link>

        {/* Top Right Actions */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 backdrop-blur-md transition-all hidden sm:block"
          >
            Login
          </Link>
          <Link 
            to="/login?mode=signup" 
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/50 backdrop-blur-md transition-all relative overflow-hidden group shadow-[0_0_20px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.7)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Sign Up <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-32 min-h-[calc(100vh-80px)] flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 w-full">
          
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left space-y-8 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium shadow-sm shadow-blue-500/10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              Next-Gen Smart Escrow
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Trust Every <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                Transaction.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              The most secure, automated platform designed to create, manage, and seamlessly execute escrow-style agreements. Eliminate fraud unconditionally.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base lg:text-lg shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)] transition-all flex items-center justify-center gap-2 group border border-indigo-500/50"
              >
                Login Now
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-8 text-sm font-medium text-slate-400"
            >
              <div className="flex items-center gap-2.5"><Lock size={16} className="text-indigo-400"/> 256-bit SSL Secured</div>
              <div className="flex items-center gap-2.5"><ShieldCheck size={16} className="text-emerald-400"/> Zero Fraud Guarantee</div>
            </motion.div>
          </div>

          {/* Right Visual — Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, type: 'spring', bounce: 0.3 }}
            className="flex-1 w-full relative max-w-lg mx-auto lg:max-w-none"
          >
            {/* Logo + AUTO TRUST text */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 flex flex-col items-center justify-center"
            >
              <img
                src={heroImg}
                alt="Auto Trust Logo"
                className="w-[340px] h-auto drop-shadow-[0_0_60px_rgba(99,102,241,0.3)]"
              />
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                AUTO TRUST
              </h2>
            </motion.div>

            {/* Glow behind logo */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[300px] h-[300px] bg-indigo-500/15 rounded-full blur-[100px]" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
