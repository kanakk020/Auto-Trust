import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Eye, Clock, CheckCircle, AlertTriangle,
  Search, Filter, ChevronRight, PlusCircle, ArrowLeft, Loader2
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const getStatusBadge = (status) => {
  const map = {
    'Created': 'badge-primary',
    'FundsLocked': 'badge-warning',
    'WorkSubmitted': 'badge-warning',
    'Completed': 'badge-success',
    'Disputed': 'badge-danger',
    'Resolved': 'badge-success',
  };
  return map[status] || 'badge-neutral';
};

const getStatusIcon = (status) => {
  const map = {
    'Created': <FileText size={14} />,
    'FundsLocked': <Clock size={14} />,
    'WorkSubmitted': <Clock size={14} />,
    'Completed': <CheckCircle size={14} />,
    'Disputed': <AlertTriangle size={14} />,
    'Resolved': <CheckCircle size={14} />,
  };
  return map[status];
};

export default function Contracts() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = user._id
          ? `http://localhost:5000/api/contracts?userId=${user._id}`
          : 'http://localhost:5000/api/contracts';
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setContracts(data);
        }
      } catch (err) {
        console.log('Failed to fetch contracts:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, [user._id]);

  const filtered = contracts.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-dark-800/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:bg-dark-800 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500"
          />
        </div>
        <button className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-dark-700/50 text-dark-300 hover:bg-dark-800/50 transition-colors">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Contract Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-primary-400" />
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <FileText size={48} className="mx-auto mb-4 text-dark-600" />
              <h3 className="text-lg font-semibold text-dark-300 mb-2">No contracts yet</h3>
              <p className="text-dark-500 text-sm mb-6">Create your first contract to get started.</p>
              <Link to="/create-contract" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold">
                <PlusCircle size={18} /> Create Contract
              </Link>
            </div>
          )}
          {filtered.map((contract, idx) => (
            <motion.div
              key={contract._id}
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
                    Freelancer: <span className="font-medium text-dark-400">{contract.partyB?.name || 'N/A'}</span>
                    <span className="mx-2 text-dark-700">•</span>
                    Deadline: {contract.deadline ? new Date(contract.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4">
                  <p className="text-lg font-bold text-white">${contract.amount}</p>
                  <Link to={`/contract/${contract._id}`} className="flex items-center gap-1.5 text-sm font-semibold text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 px-4 py-2 rounded-xl transition-colors border border-primary-500/20">
                    <Eye size={15} /> View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
