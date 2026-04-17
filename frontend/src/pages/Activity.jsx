import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  History, ArrowLeft, FileSignature, IndianRupee, CheckCircle,
  AlertTriangle, Shield, Send, Eye, Clock, Filter,
  Calendar, ChevronDown, Activity as ActivityIcon, Zap,
  FileText, Lock, Unlock, Star, UserCheck, MessageSquare
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
});

const activityData = [];

const filterOptions = ['All', 'Contracts', 'Payments', 'Messages', 'Verification'];

export default function Activity() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredActivities = activityData.filter(a => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Contracts') return a.type === 'contract';
    if (activeFilter === 'Payments') return a.type === 'payment';
    if (activeFilter === 'Messages') return a.type === 'message';
    if (activeFilter === 'Verification') return a.type === 'verification' || a.type === 'trust';
    return true;
  });

  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    if (!acc[activity.date]) acc[activity.date] = [];
    acc[activity.date].push(activity);
    return acc;
  }, {});

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Activity</span> Log
          </h1>
          <p className="text-dark-400 mt-1.5 flex items-center gap-2">
            <History size={16} className="text-primary-500" />
            Track all your actions and updates in one place
          </p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Actions', value: '0', icon: Zap, gradient: 'from-primary-500 to-accent-500', glow: 'shadow-primary-500/20' },
          { label: 'This Week', value: '0', icon: Calendar, gradient: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/20' },
          { label: 'Contracts', value: '0', icon: FileText, gradient: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20' },
          { label: 'Payments', value: '0', icon: IndianRupee, gradient: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/20' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="rounded-2xl p-4 bg-dark-800/50 border border-dark-700/50 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-2.5 shadow-lg ${stat.glow}`}>
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white">{stat.value}</h3>
                <p className="text-[11px] text-dark-400 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div {...fadeUp(0.15)} className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeFilter === filter
                ? 'bg-gradient-to-r from-primary-500/15 to-accent-500/15 text-primary-300 border border-primary-500/20 shadow-sm'
                : 'text-dark-400 bg-dark-800/30 border border-dark-700/30 hover:bg-dark-800/50 hover:text-dark-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Activity Timeline */}
      <motion.div {...fadeUp(0.2)} className="space-y-6">
        {Object.entries(groupedActivities).length === 0 ? (
          <div className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-dark-800 border border-dark-700/50 flex items-center justify-center mb-4">
              <History size={28} className="text-dark-500" />
            </div>
            <p className="text-sm font-semibold text-dark-300 mb-1">No activity yet</p>
            <p className="text-xs text-dark-500">Your recent actions and updates will appear here as you use the platform.</p>
          </div>
        ) : Object.entries(groupedActivities).map(([date, activities]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-dark-500 uppercase tracking-wider">{date}</span>
              <div className="flex-1 h-px bg-dark-700/30" />
            </div>

            {/* Activity Cards */}
            <div className="space-y-3 ml-2">
              {activities.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + idx * 0.06 }}
                    className="flex gap-4 group"
                  >
                    {/* Timeline Line + Icon */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activity.iconGradient} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={18} />
                      </div>
                      {idx < activities.length - 1 && (
                        <div className="w-px flex-1 bg-dark-700/30 my-1" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <div className="rounded-xl bg-dark-800/40 border border-dark-700/50 p-4 hover:bg-dark-800/60 hover:border-dark-600/50 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1">{activity.title}</h4>
                            <p className="text-xs text-dark-400 leading-relaxed">{activity.description}</p>
                          </div>
                          <span className="text-[10px] text-dark-600 whitespace-nowrap shrink-0">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Load More */}
      <motion.div {...fadeUp(0.3)} className="flex justify-center pt-2 pb-4">
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-dark-400 bg-dark-800/40 border border-dark-700/50 hover:bg-dark-800/60 hover:text-dark-200 transition-all">
          <Clock size={16} />
          Load More Activity
          <ChevronDown size={16} />
        </button>
      </motion.div>
    </div>
  );
}
