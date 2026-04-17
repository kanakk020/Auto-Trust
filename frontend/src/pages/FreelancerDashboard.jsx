import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wallet, Lock, Unlock, Clock, CheckCircle, IndianRupee, TrendingUp,
  ArrowUpRight, Briefcase, ChevronRight, Upload, ShieldCheck, Star,
  AlertTriangle, Zap, Eye, Timer, FileCheck, CircleCheck, Send,
  XCircle, AlertCircle, Bot, ArrowLeft
} from 'lucide-react';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: [0.25, 0.46, 0.45, 0.94] }
});

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const earnings = [
    { label: 'Total Earnings', value: '₹0', icon: IndianRupee, gradient: 'from-emerald-500 to-emerald-600', change: '--', trend: 'up' },
    { label: 'Locked in Escrow', value: '₹0', icon: Lock, gradient: 'from-amber-500 to-orange-500', change: '--', trend: 'hold' },
    { label: 'Released Amount', value: '₹0', icon: Unlock, gradient: 'from-primary-500 to-primary-600', change: '--', trend: 'up' },
    { label: 'Pending Payments', value: '₹0', icon: Clock, gradient: 'from-accent-500 to-accent-600', change: '--', trend: 'pending' },
  ];

  const contracts = [];

  const submissions = [];

  const aiVerifications = [
    { label: 'Approved', count: 0, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Needs Fix', count: 0, icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Rejected', count: 0, icon: XCircle, color: 'text-danger-400', bg: 'bg-danger-500/10 border-danger-500/20' },
  ];

  const activities = [];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* ─── HEADER ─── */}
      <motion.div {...fade(0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Freelancer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">Dashboard</span>
          </h1>
          <p className="text-dark-400 mt-1 flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            Track your work and secure payments
          </p>
        </div>
        <Link to="/freelancer/submissions" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-primary-500 hover:from-emerald-600 hover:to-primary-600 text-white font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-95">
          <Upload size={18} />
          Submit Work
        </Link>
      </motion.div>

      {/* ─── EARNINGS CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {earnings.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div key={idx} {...fade(idx * 0.08)} className="relative overflow-hidden rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50 hover:border-dark-600/50 transition-all duration-300 hover:-translate-y-1 group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-0.5">{item.value}</h3>
                <p className="text-xs text-dark-400 font-medium">{item.label}</p>
                <div className="flex items-center gap-1 mt-2">
                  {item.trend === 'up' && <ArrowUpRight size={13} className="text-emerald-400" />}
                  {item.trend === 'hold' && <Lock size={11} className="text-amber-400" />}
                  {item.trend === 'pending' && <Clock size={11} className="text-accent-400" />}
                  <span className={`text-[11px] font-medium ${item.trend === 'up' ? 'text-emerald-400' : item.trend === 'hold' ? 'text-amber-400' : 'text-accent-400'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── MAIN GRID ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ─── ACTIVE CONTRACTS + PROGRESS (2/3) ─── */}
        <motion.div {...fade(0.2)} className="xl:col-span-2 rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-dark-700/30">
            <h2 className="text-lg font-bold text-white">Active Contracts</h2>
            <Link to="/freelancer/work" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-dark-700/30">
            {contracts.map((c, idx) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.07 }}
                className="px-6 py-4 hover:bg-dark-800/30 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h4 className="font-semibold text-dark-100 text-sm truncate">{c.title}</h4>
                      <span className="badge-primary">{c.status}</span>
                    </div>
                    <p className="text-xs text-dark-500">Client: <span className="font-medium text-dark-400">{c.client}</span></p>
                  </div>

                  {/* Deadline Countdown */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-700/40 border border-dark-600/30">
                    <Timer size={13} className={c.daysLeft <= 7 ? 'text-danger-400' : c.daysLeft <= 14 ? 'text-amber-400' : 'text-dark-400'} />
                    <span className={`text-xs font-bold ${c.daysLeft <= 7 ? 'text-danger-400' : c.daysLeft <= 14 ? 'text-amber-400' : 'text-dark-300'}`}>
                      {c.daysLeft}d left
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="w-full sm:w-32">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-dark-500">Progress</span>
                      <span className="font-bold text-emerald-400">{c.progress}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-primary-500 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    to={`/contract/${c.id}`}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors border border-emerald-500/20"
                  >
                    <Eye size={14} /> Open
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="space-y-6">

          {/* ─── AI VERIFICATION STATUS ─── */}
          <motion.div {...fade(0.3)} className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bot size={18} className="text-accent-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Verification</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {aiVerifications.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className={`rounded-xl p-3 border text-center ${v.bg}`}>
                    <Icon size={20} className={`${v.color} mx-auto mb-1.5`} />
                    <p className="text-xl font-extrabold text-white">{v.count}</p>
                    <p className="text-[10px] font-semibold text-dark-400 mt-0.5">{v.label}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-dark-900/50 border border-dark-700/30">
              <p className="text-xs text-dark-400 flex items-start gap-2">
                <Bot size={14} className="text-accent-400 mt-0.5 shrink-0" />
                <span>No submissions yet. Submit your first work to see AI feedback here.</span>
              </p>
            </div>
          </motion.div>

          {/* ─── TRUST SCORE ─── */}
          <motion.div {...fade(0.35)} className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/50 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mt-8 -mr-8" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[11px] font-semibold text-dark-500 uppercase tracking-wider">Reputation Score</p>
                  <div className="flex items-end gap-2 mt-1">
                    <h2 className="text-4xl font-extrabold text-white leading-none">--</h2>
                    <span className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-0.5">
                      <ArrowUpRight size={13} /> --
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-500/15 p-2 rounded-xl border border-yellow-500/20">
                  <Star className="text-yellow-400" size={20} />
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full bg-dark-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-emerald-400 via-primary-400 to-accent-400 h-2.5 rounded-full" style={{ width: '0%' }} />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-dark-600">
                  <span>0</span><span>50</span><span>100</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                  <Zap size={12} /> New
                </span>
                <span className="text-[11px] text-dark-500">Build your reputation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── BOTTOM GRID ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ─── SUBMISSIONS + PAYMENT STATUS ─── */}
        <motion.div {...fade(0.4)} className="xl:col-span-2 space-y-6">

          {/* Recent Submissions */}
          <div className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-dark-700/30">
              <h2 className="text-lg font-bold text-white">Recent Submissions</h2>
              <Link to="/freelancer/submissions" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-dark-700/30">
              {submissions.map((sub, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center gap-4 hover:bg-dark-800/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-dark-700/50 border border-dark-600/30 flex items-center justify-center shrink-0">
                    <FileCheck size={18} className="text-dark-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark-200 truncate">{sub.title}</p>
                    <p className="text-xs text-dark-500">{sub.contract} • {sub.time}</p>
                  </div>
                  <span className={sub.status === 'Approved' ? 'badge-success' : 'badge-warning'}>
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Status */}
          <div className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6">
            <h2 className="text-lg font-bold text-white mb-5">Payment Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-xl bg-dark-900/50 border border-dark-700/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lock size={16} className="text-amber-400" />
                  <span className="text-sm font-semibold text-dark-300">Locked Payments</span>
                </div>
                <p className="text-2xl font-extrabold text-white mb-2">₹0</p>
                <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full" style={{ width: '0%' }} />
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  <span className="text-[11px] text-emerald-400 font-semibold">Payment Secured in Escrow</span>
                </div>
              </div>

              <div className="rounded-xl bg-dark-900/50 border border-dark-700/30 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Unlock size={16} className="text-emerald-400" />
                  <span className="text-sm font-semibold text-dark-300">Released Payments</span>
                </div>
                <p className="text-2xl font-extrabold text-white mb-2">₹0</p>
                <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-primary-500 h-2 rounded-full" style={{ width: '0%' }} />
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <CircleCheck size={13} className="text-emerald-500" />
                  <span className="text-[11px] text-emerald-400 font-semibold">0 payments</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── RECENT ACTIVITY ─── */}
        <motion.div {...fade(0.45)} className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-dark-700/30">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
          </div>
          <div className="px-6 py-3 divide-y divide-dark-700/20 max-h-[420px] overflow-y-auto">
            {activities.map((a, idx) => {
              const Icon = a.icon;
              return (
                <div key={idx} className="flex gap-3 py-3.5">
                  <div className={`w-9 h-9 rounded-xl ${a.color} flex items-center justify-center shrink-0`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-dark-200 leading-snug">{a.text}</p>
                    <p className="text-[11px] text-dark-500 mt-1">{a.time}</p>
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
