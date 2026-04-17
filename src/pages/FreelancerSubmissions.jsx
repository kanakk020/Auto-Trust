import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, FileCheck, Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, Bot, PlusCircle, FileText, ArrowLeft } from 'lucide-react';

const submissions = [];

const getStatusBadge = (status) => {
  if (status === 'Approved') return <span className="badge-success flex items-center gap-1"><CheckCircle size={12} /> Approved</span>;
  if (status === 'Under Review') return <span className="badge-warning flex items-center gap-1"><Clock size={12} /> Under Review</span>;
  if (status === 'Needs Fix') return <span className="badge-danger flex items-center gap-1"><AlertCircle size={12} /> Needs Fix</span>;
  return <span className="badge-neutral">{status}</span>;
};

export default function FreelancerSubmissions() {
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
          <h1 className="text-3xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-400">Submissions</span>
          </h1>
          <p className="text-dark-400 mt-1">Upload deliverables and track review status</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-primary-500 hover:from-emerald-600 hover:to-primary-600 text-white font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
          <PlusCircle size={18} /> Submit New Work
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-4 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
          <CheckCircle size={22} className="text-emerald-400" />
          <div>
            <p className="text-xl font-extrabold text-white">0</p>
            <p className="text-[11px] text-dark-400 font-medium">Approved</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl p-4 bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
          <Clock size={22} className="text-amber-400" />
          <div>
            <p className="text-xl font-extrabold text-white">0</p>
            <p className="text-[11px] text-dark-400 font-medium">Under Review</p>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-4 bg-danger-500/10 border border-danger-500/20 flex items-center gap-3">
          <AlertCircle size={22} className="text-danger-400" />
          <div>
            <p className="text-xl font-extrabold text-white">0</p>
            <p className="text-[11px] text-dark-400 font-medium">Needs Fix</p>
          </div>
        </motion.div>
      </div>

      {/* Submissions List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-dark-700/30">
          <h2 className="text-lg font-bold text-white">All Submissions</h2>
        </div>
        <div className="divide-y divide-dark-700/20">
          {submissions.map((sub, idx) => (
            <motion.div key={sub.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + idx * 0.05 }}
              className="px-6 py-4 hover:bg-dark-800/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-dark-700/50 border border-dark-600/30 flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-dark-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-dark-200 truncate">{sub.title}</p>
                  <p className="text-xs text-dark-500">{sub.contract} • {sub.size} • {sub.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  {sub.aiScore !== null && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-700/40 border border-dark-600/30">
                      <Bot size={13} className="text-accent-400" />
                      <span className={`text-xs font-bold ${sub.aiScore >= 80 ? 'text-emerald-400' : sub.aiScore >= 60 ? 'text-amber-400' : 'text-danger-400'}`}>
                        {sub.aiScore}%
                      </span>
                    </div>
                  )}
                  {getStatusBadge(sub.status)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
