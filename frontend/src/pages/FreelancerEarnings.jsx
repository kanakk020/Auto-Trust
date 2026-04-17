import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, TrendingUp, ArrowUpRight, Lock, Unlock, Wallet, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';

const transactions = [];

const monthlyData = [];

export default function FreelancerEarnings() {
  const navigate = useNavigate();
  const maxAmount = Math.max(1, ...monthlyData.map(d => d.amount));

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">Earnings</span></h1>
        <p className="text-dark-400 mt-1">Track your income and payment history</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 bg-gradient-to-br from-emerald-600 to-emerald-700 border border-emerald-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -mt-6 -mr-6" />
          <div className="relative z-10">
            <Wallet size={20} className="text-emerald-200 mb-2" />
            <p className="text-xs text-emerald-200 font-medium">Lifetime Earnings</p>
            <h3 className="text-2xl font-extrabold text-white mt-1">₹0</h3>
            <p className="text-xs text-emerald-200 mt-2 flex items-center gap-1"><ArrowUpRight size={12} /> --</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <Lock size={20} className="text-amber-400 mb-2" />
          <p className="text-xs text-dark-400 font-medium">In Escrow</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">₹0</h3>
          <p className="text-xs text-amber-400 mt-2">0 contracts locked</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <TrendingUp size={20} className="text-primary-400 mb-2" />
          <p className="text-xs text-dark-400 font-medium">Avg. per Project</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">₹0</h3>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><ArrowUpRight size={12} /> --</p>
        </motion.div>
      </div>

      {/* Monthly Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6">
        <h2 className="text-lg font-bold text-white mb-6">Monthly Earnings</h2>
        <div className="flex items-end gap-4 h-40">
          {monthlyData.map((d, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">₹{(d.amount / 1000).toFixed(0)}K</span>
              <motion.div
                initial={{ height: 0 }} animate={{ height: `${(d.amount / maxAmount) * 100}%` }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                className="w-full max-w-[48px] bg-gradient-to-t from-emerald-600 to-primary-500 rounded-xl"
              />
              <span className="text-xs text-dark-500 font-medium">{d.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-dark-700/30">
          <h2 className="text-lg font-bold text-white">Payment History</h2>
        </div>
        <div className="hidden md:grid grid-cols-4 px-6 py-3 bg-dark-900/30 text-xs font-semibold text-dark-500 uppercase tracking-wider">
          <span>Contract</span><span>Amount</span><span>Date</span><span>Status</span>
        </div>
        <div className="divide-y divide-dark-700/20">
          {transactions.map((tx, idx) => (
            <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + idx * 0.04 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-0 px-6 py-4 hover:bg-dark-800/30 transition-colors items-center">
              <span className="font-medium text-dark-200 text-sm">{tx.contract}</span>
              <span className="font-bold text-white text-sm">{tx.amount}</span>
              <span className="text-sm text-dark-500">{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span>
                {tx.status === 'Completed' && <span className="badge-success">Released</span>}
                {tx.status === 'Held' && <span className="badge-warning">In Escrow</span>}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
