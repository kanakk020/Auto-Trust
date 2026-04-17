import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, Lock, Unlock, ArrowUpRight, ArrowDownRight,
  IndianRupee, TrendingUp, Clock, CheckCircle, ArrowLeft
} from 'lucide-react';

const transactions = [];

export default function Payments() {
  const navigate = useNavigate();
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
        <h1 className="text-3xl font-bold text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Payments</span> & Escrow
        </h1>
        <p className="text-dark-400 mt-1">Track all your locked and released payments</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <Lock size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-dark-400 font-medium">Locked in Escrow</p>
              <h3 className="text-xl font-bold text-white">₹0</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
            <Clock size={12} /> 0 contracts held
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Unlock size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-dark-400 font-medium">Total Released</p>
              <h3 className="text-xl font-bold text-white">₹0</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
            <ArrowUpRight size={12} /> 0 payments
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-primary-500/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-xs text-dark-400 font-medium">Total Volume</p>
              <h3 className="text-xl font-bold text-white">₹0</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary-400 font-semibold">
            <IndianRupee size={12} /> Lifetime transactions
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-dark-700/30">
          <h2 className="text-lg font-bold text-white">Transaction History</h2>
        </div>

        <div className="hidden md:grid grid-cols-5 px-6 py-3 bg-dark-900/30 text-xs font-semibold text-dark-500 uppercase tracking-wider">
          <span>Contract</span>
          <span>Type</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-dark-700/20">
          {transactions.map((tx, idx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + idx * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0 px-6 py-4 hover:bg-dark-800/30 transition-colors items-center"
            >
              <span className="font-medium text-dark-200 text-sm">{tx.contract}</span>
              <span className="flex items-center gap-1.5 text-sm">
                {tx.type === 'Locked' && <Lock size={14} className="text-amber-400" />}
                {tx.type === 'Released' && <Unlock size={14} className="text-emerald-400" />}
                {tx.type === 'Disputed' && <Lock size={14} className="text-danger-400" />}
                <span className="text-dark-400">{tx.type}</span>
              </span>
              <span className="font-bold text-white text-sm">{tx.amount}</span>
              <span className="text-sm text-dark-500">{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span>
                {tx.status === 'Held' && <span className="badge-warning">Held</span>}
                {tx.status === 'Completed' && <span className="badge-success">Completed</span>}
                {tx.status === 'Frozen' && <span className="badge-danger">Frozen</span>}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
