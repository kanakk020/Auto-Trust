import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { currentUser, mockContracts } from '../lib/mockData';
import { FileSignature, CheckCircle, Clock, ChevronRight, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Active Contracts', value: currentUser.activeContracts, icon: <FileSignature size={24} />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Completed Deals', value: currentUser.completedDeals, icon: <CheckCircle size={24} />, color: 'bg-green-50 text-green-600' },
    { label: 'Pending Agreements', value: currentUser.pendingAgreements, icon: <Clock size={24} />, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your contracts today.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="card flex items-center p-6 gap-5"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <Link to="/profile" className="text-sm font-medium text-primary-600 hover:text-primary-700">View all</Link>
          </div>
          
          <div className="space-y-4">
            {mockContracts.map((contract, idx) => (
              <motion.div 
                key={contract.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                className="card p-0 overflow-hidden hover:border-primary-200 transition-colors group cursor-pointer"
              >
                <Link to={`/contract/${contract.id}`} className="flex flex-col sm:flex-row sm:items-center p-5 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-slate-900">{contract.title}</h4>
                      <StatusBadge status={contract.status} />
                    </div>
                    <p className="text-sm text-slate-500">With {contract.partyA === currentUser.name ? contract.partyB : contract.partyA}</p>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-100 sm:border-0">
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-slate-900">${contract.amount}</p>
                      <p className="text-xs text-slate-400">Due {new Date(contract.deadline).toLocaleDateString()}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="card bg-gradient-to-br from-primary-900 to-primary-800 text-white overflow-hidden relative border-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-primary-100 text-sm font-medium">Your Trust Score</p>
                  <h2 className="text-4xl font-bold mt-1">{currentUser.trustScore}</h2>
                </div>
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary-100">Status</span>
                    <span className="font-bold text-success-300">High Trust</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-2">
                    <div className="bg-success-400 h-2 rounded-full" style={{ width: `${currentUser.trustScore}%` }}></div>
                  </div>
                </div>
                
                <p className="text-sm text-primary-100 leading-relaxed">
                  You are in the top 10% of users. Maintain successful completions to keep your "Highly Trusted" badge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatusBadge = ({ status }) => {
  const styles = {
    'Completed': 'badge-success',
    'Pending': 'badge-warning',
    'In Progress': 'badge-primary',
  };
  
  return (
    <span className={styles[status] || 'badge-primary'}>
      {status}
    </span>
  );
};
