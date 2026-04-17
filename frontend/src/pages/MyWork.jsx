import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Eye, Timer, CheckCircle, Clock, Upload, ChevronRight, FileText, ArrowLeft } from 'lucide-react';

const contracts = [];

export default function MyWork() {
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
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">Work</span></h1>
          <p className="text-dark-400 mt-1">Track progress and manage your assignments</p>
        </div>
      </motion.div>

      <div className="space-y-5">
        {contracts.map((c, idx) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
            className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden hover:border-dark-600/50 transition-all">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    <span className="badge-primary">{c.status}</span>
                  </div>
                  <p className="text-sm text-dark-500">Client: <span className="text-dark-300 font-medium">{c.client}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-700/40 border border-dark-600/30">
                    <Timer size={14} className={c.daysLeft <= 14 ? 'text-amber-400' : 'text-dark-400'} />
                    <span className={`text-sm font-bold ${c.daysLeft <= 14 ? 'text-amber-400' : 'text-dark-300'}`}>{c.daysLeft} days left</span>
                  </div>
                  <Link to={`/contract/${c.id}`} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-primary-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
                    <Eye size={15} /> Open Contract
                  </Link>
                </div>
              </div>

              {/* Overall progress */}
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-dark-400 font-medium">Overall Progress</span>
                  <span className="font-bold text-emerald-400">{c.progress}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-emerald-500 to-primary-500 h-3 rounded-full transition-all duration-700" style={{ width: `${c.progress}%` }} />
                </div>
              </div>

              {/* Milestones */}
              <div>
                <p className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3">Milestones</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {c.milestones.map((m, i) => (
                    <div key={i} className={`rounded-xl p-3 border text-center transition-all ${m.done ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-dark-900/30 border-dark-700/30'}`}>
                      {m.done ? <CheckCircle size={18} className="text-emerald-400 mx-auto mb-1" /> : <Clock size={18} className="text-dark-500 mx-auto mb-1" />}
                      <p className={`text-xs font-semibold ${m.done ? 'text-emerald-300' : 'text-dark-500'}`}>{m.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
