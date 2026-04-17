import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileSignature, CheckCircle, Clock, ChevronRight, TrendingUp,
  PlusCircle, IndianRupee, ShieldCheck, Lock, Unlock, Eye,
  ArrowUpRight, ArrowDownRight, AlertTriangle, Wallet, Zap,
  Award, Star, CircleCheck, Timer, FileText, Send
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
});

export default function Dashboard() {
  const stats = [
    { label: 'Active Contracts', value: '0', change: '--', trend: 'up', icon: FileSignature, gradient: 'from-primary-500 to-primary-600' },
    { label: 'Pending Approvals', value: '0', change: '--', trend: 'neutral', icon: Clock, gradient: 'from-warning-500 to-warning-600' },
    { label: 'Escrow Balance', value: '₹0', change: '--', trend: 'up', icon: IndianRupee, gradient: 'from-emerald-500 to-emerald-600' },
    { label: 'Completed Deals', value: '0', change: '--', trend: 'up', icon: CheckCircle, gradient: 'from-accent-500 to-accent-600' }
  ];

  const contracts = [];

  const escrowSteps = [
    { label: 'Contract', icon: FileText, done: false },
    { label: 'Payment Locked', icon: Lock, done: false },
    { label: 'Work in Progress', icon: Timer, done: false },
    { label: 'Verified', icon: ShieldCheck, done: false },
    { label: 'Released', icon: Unlock, done: false },
  ];

  const activities = [];

  const getStatusBadge = (status) => {
    const map = {
      'Active': 'badge-primary',
      'Pending': 'badge-warning',
      'Completed': 'badge-success',
      'Disputed': 'badge-danger',
    };
    return map[status] || 'badge-neutral';
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">

      {/* ─── HEADER ─── */}
      <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Dashboard</span>
          </h1>
          <p className="text-dark-400 mt-1 flex items-center gap-2">
            <ShieldCheck size={16} className="text-primary-500" />
            Manage your contracts securely
          </p>
        </div>
        <Link to="/create-contract" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all active:scale-95">
          <PlusCircle size={18} />
          Create New Contract
        </Link>
      </motion.div>

      {/* ─── STATS CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={idx} {...fadeUp(idx * 0.08)} className="relative overflow-hidden rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50 hover:border-dark-600/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-0.5">{stat.value}</h3>
                <p className="text-xs text-dark-400 font-medium">{stat.label}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' && <ArrowUpRight size={13} className="text-emerald-400" />}
                  {stat.trend === 'neutral' && <Clock size={13} className="text-amber-400" />}
                  <span className={`text-[11px] font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── MAIN GRID ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ─── CONTRACT LIST (2/3) ─── */}
        <motion.div {...fadeUp(0.2)} className="xl:col-span-2 rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-dark-700/30">
            <h2 className="text-lg font-bold text-white">Active Contracts</h2>
            <Link to="/contracts" className="text-sm font-semibold text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-dark-700/30">
            {contracts.map((contract, idx) => (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.06 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-6 py-4 hover:bg-dark-800/30 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <h4 className="font-semibold text-dark-100 text-sm truncate">{contract.title}</h4>
                    <span className={getStatusBadge(contract.status)}>{contract.status}</span>
                  </div>
                  <p className="text-xs text-dark-500">with <span className="font-medium text-dark-400">{contract.freelancer}</span></p>
                </div>

                <div className="hidden md:block w-28">
                  <div className="w-full bg-dark-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-700 ${contract.status === 'Completed' ? 'bg-emerald-500' : contract.status === 'Disputed' ? 'bg-danger-400' : 'bg-primary-500'}`}
                      style={{ width: `${contract.progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-dark-500 mt-1 text-right">{contract.progress}%</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-5 sm:w-auto">
                  <div className="text-right">
                    <p className="font-bold text-white text-sm">{contract.amount}</p>
                    <p className="text-[10px] text-dark-500">Due {new Date(contract.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <Link
                    to={`/contract/${contract.id}`}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 px-3 py-1.5 rounded-lg transition-colors border border-primary-500/20"
                  >
                    <Eye size={14} /> View
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="space-y-6">

          {/* ─── TRUST SCORE ─── */}
          <motion.div {...fadeUp(0.3)} className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/50 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/5 rounded-full blur-3xl -mt-10 -mr-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mb-10 -ml-10" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Trust Score</p>
                  <div className="flex items-end gap-2 mt-1">
                    <h2 className="text-5xl font-extrabold text-white leading-none">--</h2>
                    <span className="text-sm font-medium text-emerald-400 mb-1.5 flex items-center gap-0.5">
                      <ArrowUpRight size={14} /> --
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-500/15 p-2.5 rounded-xl border border-yellow-500/20">
                  <Award className="text-yellow-400" size={22} />
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full bg-dark-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-primary-400 via-accent-400 to-emerald-400 h-2.5 rounded-full transition-all duration-1000" style={{ width: '0%' }} />
                </div>
                <div className="flex justify-between mt-1.5 text-[10px] text-dark-600">
                  <span>0</span><span>50</span><span>100</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 bg-primary-500/15 text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-500/20">
                  <Star size={12} /> New
                </span>
                <span className="text-[11px] text-dark-500">Build your trust score</span>
              </div>
            </div>
          </motion.div>

          {/* ─── QUICK ACTIONS ─── */}
          <motion.div {...fadeUp(0.35)} className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              <Link to="/create-contract" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500/10 hover:bg-primary-500/15 border border-primary-500/20 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:scale-105 transition-transform">
                  <PlusCircle size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-200">Create Contract</p>
                  <p className="text-[11px] text-dark-500">Start a new agreement</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-dark-600 group-hover:text-primary-400 transition-colors" />
              </Link>

              <Link to="/disputes" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-danger-500/10 hover:bg-danger-500/15 border border-danger-500/20 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-danger-500/20 flex items-center justify-center text-danger-400 group-hover:scale-105 transition-transform">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-200">View Disputes</p>
                  <p className="text-[11px] text-dark-500">0 open disputes</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-dark-600 group-hover:text-danger-400 transition-colors" />
              </Link>

              <Link to="/payments" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 transition-all group">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Wallet size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-200">Release Payment</p>
                  <p className="text-[11px] text-dark-500">Manage escrow funds</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-dark-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── BOTTOM GRID ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ─── ESCROW OVERVIEW ─── */}
        <motion.div {...fadeUp(0.4)} className="xl:col-span-2 rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Escrow Overview</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Lock size={14} className="text-amber-400" />
                <span className="text-dark-400 font-medium">Locked: <span className="font-bold text-white">₹0</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Unlock size={14} className="text-emerald-400" />
                <span className="text-dark-400 font-medium">Released: <span className="font-bold text-white">₹0</span></span>
              </div>
            </div>
          </div>

          {/* Progress Pipeline */}
          <div className="relative">
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-dark-700 z-0" />
            <div className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-emerald-400 to-primary-400 z-0" style={{ width: '0%' }} />

            <div className="relative flex justify-between z-10">
              {escrowSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 border-2 transition-all
                        ${step.done
                          ? 'bg-gradient-to-br from-primary-500 to-accent-500 border-primary-400/30 text-white shadow-lg shadow-primary-500/20'
                          : 'bg-dark-800 border-dark-600/50 text-dark-500'
                        }`}
                    >
                      <Icon size={20} />
                    </div>
                    <p className={`text-xs font-semibold text-center ${step.done ? 'text-white' : 'text-dark-500'}`}>
                      {step.label}
                    </p>
                    {step.done && (
                      <CircleCheck size={14} className="text-emerald-500 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Escrow bars */}
          <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-dark-700/30">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-dark-400">Locked Funds</span>
                <span className="font-bold text-amber-400">₹0</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="text-[11px] text-dark-600 mt-1">0% of total volume</p>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-dark-400">Released Funds</span>
                <span className="font-bold text-emerald-400">₹0</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-400 to-primary-500 h-3 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="text-[11px] text-dark-600 mt-1">0% of total volume</p>
            </div>
          </div>
        </motion.div>

        {/* ─── RECENT ACTIVITY ─── */}
        <motion.div {...fadeUp(0.45)} className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-dark-700/30">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
          </div>
          <div className="px-6 py-3 divide-y divide-dark-700/20 max-h-[380px] overflow-y-auto">
            {activities.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex gap-3 py-3.5">
                  <div className={`w-9 h-9 rounded-xl ${activity.color} flex items-center justify-center shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-dark-200 leading-snug">{activity.text}</p>
                    <p className="text-[11px] text-dark-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
