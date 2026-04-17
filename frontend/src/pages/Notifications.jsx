import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bell, ArrowLeft, CheckCheck, Circle, FileSignature,
  IndianRupee, Shield, AlertTriangle, MessageSquare, Star,
  Clock, Settings, Trash2, Filter, BellOff, Check,
  Lock, Unlock, UserCheck, Zap, ChevronDown
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
});

const initialNotifications = [];

const filterOptions = ['All', 'Unread', 'Contracts', 'Payments', 'Messages', 'System'];

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('All');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.read;
    if (activeFilter === 'Contracts') return n.type === 'contract';
    if (activeFilter === 'Payments') return n.type === 'payment';
    if (activeFilter === 'Messages') return n.type === 'message';
    if (activeFilter === 'System') return n.type === 'system' || n.type === 'verification' || n.type === 'trust';
    return true;
  });

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
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-primary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-dark-400 mt-1.5 flex items-center gap-2">
            <Bell size={16} className="text-primary-500" />
            Stay updated with your latest activities and alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-primary-400 bg-primary-500/10 border border-primary-500/20 hover:bg-primary-500/20 transition-colors"
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>
          )}
          <button className="p-2 rounded-xl text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 border border-dark-700/30 transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 overflow-x-auto pb-1">
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
            {filter === 'Unread' && unreadCount > 0 && (
              <span className="ml-1.5 bg-primary-500 text-white text-[10px] font-bold w-4 h-4 rounded-full inline-flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Notification List */}
      <motion.div {...fadeUp(0.15)} className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-dark-800 border border-dark-700/50 flex items-center justify-center mb-4">
                <BellOff size={28} className="text-dark-500" />
              </div>
              <p className="text-sm font-semibold text-dark-300 mb-1">No notifications</p>
              <p className="text-xs text-dark-500">
                {activeFilter === 'All'
                  ? "You're all caught up! New notifications will appear here."
                  : `No ${activeFilter.toLowerCase()} notifications found.`}
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, idx) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group ${
                    notification.read
                      ? 'bg-dark-800/30 border-dark-700/30'
                      : 'bg-dark-800/60 border-primary-500/15 shadow-sm shadow-primary-500/5'
                  }`}
                >
                  <div className="flex items-start gap-4 p-5">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${notification.gradient} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-white">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-dark-400 leading-relaxed">{notification.description}</p>
                        </div>
                        <span className="text-[10px] text-dark-600 whitespace-nowrap shrink-0">{notification.time}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-primary-400 bg-primary-500/10 hover:bg-primary-500/20 px-2.5 py-1 rounded-lg transition-colors border border-primary-500/20"
                          >
                            <Check size={12} />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-dark-500 hover:text-danger-400 bg-dark-800/50 hover:bg-danger-500/10 px-2.5 py-1 rounded-lg transition-colors border border-dark-700/30 hover:border-danger-500/20"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
        <motion.div {...fadeUp(0.25)} className="flex justify-center pt-2 pb-4">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-dark-400 bg-dark-800/40 border border-dark-700/50 hover:bg-dark-800/60 hover:text-dark-200 transition-all">
            <Clock size={16} />
            Load Older Notifications
            <ChevronDown size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
