import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Eye, Clock, CheckCircle, AlertTriangle,
  Search, Filter, ChevronRight, PlusCircle, ArrowLeft
} from 'lucide-react';

const contracts = [];

const getStatusBadge = (status) => {
  const map = {
    'Active': 'badge-primary',
    'Pending': 'badge-warning',
    'Completed': 'badge-success',
    'Disputed': 'badge-danger',
  };
  return map[status] || 'badge-neutral';
};

const getStatusIcon = (status) => {
  const map = {
    'Active': <FileText size={14} />,
    'Pending': <Clock size={14} />,
    'Completed': <CheckCircle size={14} />,
    'Disputed': <AlertTriangle size={14} />,
  };
  return map[status];
};

export default function Contracts() {
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
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Contracts</span>
          </h1>
          <p className="text-dark-400 mt-1">Manage and track all your agreements</p>
        </div>
        <Link to="/create-contract" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-95">
          <PlusCircle size={18} /> New Contract
        </Link>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-dark-500" size={17} />
          <input
            type="text"
            placeholder="Search contracts..."
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:bg-dark-800 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500"
          />
        </div>
        <button className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-dark-700/50 text-dark-300 hover:bg-dark-800/50 transition-colors">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Contract Cards */}
      <div className="grid gap-4">
        {contracts.map((contract, idx) => (
          <motion.div
            key={contract.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
            className="rounded-2xl bg-dark-800/40 border border-dark-700/50 hover:border-dark-600/50 transition-all overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h3 className="text-base font-semibold text-white truncate">{contract.title}</h3>
                  <span className={getStatusBadge(contract.status)}>{contract.status}</span>
                </div>
                <p className="text-sm text-dark-500">
                  Freelancer: <span className="font-medium text-dark-400">{contract.freelancer}</span>
                  <span className="mx-2 text-dark-700">•</span>
                  Deadline: {new Date(contract.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="hidden lg:block w-36">
                <div className="flex justify-between text-[11px] text-dark-500 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold text-emerald-400">{contract.progress}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${contract.status === 'Completed' ? 'bg-emerald-500' : contract.status === 'Disputed' ? 'bg-danger-400' : 'bg-primary-500'}`}
                    style={{ width: `${contract.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4">
                <p className="text-lg font-bold text-white">{contract.amount}</p>
                <Link to={`/contract/${contract.id}`} className="flex items-center gap-1.5 text-sm font-semibold text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 px-4 py-2 rounded-xl transition-colors border border-primary-500/20">
                  <Eye size={15} /> View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
