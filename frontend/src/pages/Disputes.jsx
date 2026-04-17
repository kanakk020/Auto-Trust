import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, MessageSquare, Clock, CheckCircle,
  ChevronRight, ShieldAlert, Scale, ArrowLeft
} from 'lucide-react';

const disputes = [];

export default function Disputes() {
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Dispute</span> Resolution
        </h1>
        <p className="text-dark-400 mt-1">Resolve conflicts securely with AutoTrust mediation</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-danger-500/10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-danger-400" />
            </div>
            <div>
              <p className="text-xs text-dark-400 font-medium">Open Disputes</p>
              <h3 className="text-xl font-bold text-white">0</h3>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <Scale size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-dark-400 font-medium">Under Review</p>
              <h3 className="text-xl font-bold text-white">0</h3>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-5 bg-dark-800/50 border border-dark-700/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-dark-400 font-medium">Resolved</p>
              <h3 className="text-xl font-bold text-white">0</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dispute Cards */}
      <div className="space-y-4">
        {disputes.map((dispute, idx) => (
          <motion.div
            key={dispute.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + idx * 0.08 }}
            className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden border-l-4 border-l-danger-400"
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-base font-bold text-white">{dispute.contract}</h3>
                    {dispute.status === 'Open' && <span className="badge-danger">Open</span>}
                    {dispute.status === 'Under Review' && <span className="badge-warning">Under Review</span>}
                    {dispute.priority === 'High' && (
                      <span className="text-[10px] font-bold text-danger-400 bg-danger-500/10 px-2 py-0.5 rounded border border-danger-500/20">HIGH PRIORITY</span>
                    )}
                  </div>
                  <p className="text-sm text-dark-500 mb-3">
                    with <span className="font-medium text-dark-300">{dispute.freelancer}</span>
                    <span className="mx-2 text-dark-700">•</span>
                    Amount: <span className="font-semibold text-white">{dispute.amount}</span>
                    <span className="mx-2 text-dark-700">•</span>
                    Filed: {new Date(dispute.filed).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                  <div className="bg-dark-900/50 rounded-xl p-3.5 border border-dark-700/30">
                    <p className="text-sm text-dark-300 flex items-start gap-2">
                      <ShieldAlert size={16} className="text-danger-400 mt-0.5 shrink-0" />
                      {dispute.reason}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2">
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 px-4 py-2 rounded-xl transition-colors border border-primary-500/20">
                    <MessageSquare size={15} /> Respond
                  </button>
                  <button className="text-sm px-4 py-2 rounded-xl border border-dark-700/50 text-dark-300 hover:bg-dark-800/50 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="rounded-2xl bg-primary-500/10 border border-primary-500/20 p-5">
        <div className="flex gap-3">
          <ShieldAlert className="text-primary-400 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-primary-300 mb-1">How AutoTrust Mediation Works</h4>
            <p className="text-sm text-primary-300/70 leading-relaxed">
              All disputes are reviewed by our AI-powered mediation engine. Funds remain locked in escrow until both parties reach an agreement or AutoTrust provides a fair resolution within 48 hours.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
