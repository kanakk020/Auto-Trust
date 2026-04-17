import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle, ArrowLeft, Search, MessageSquare, FileText,
  Shield, Book, ChevronDown, ChevronRight, ExternalLink,
  Mail, Phone, Clock, Star, Zap, Send, CheckCircle,
  AlertTriangle, IndianRupee, Lock, Users, Headphones,
  Globe, Video, BookOpen
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
});

const categories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of AutoTrust',
    icon: Zap,
    gradient: 'from-primary-500 to-accent-500',
    glow: 'shadow-primary-500/20',
    articles: 4,
  },
  {
    id: 'contracts',
    title: 'Contracts & Escrow',
    description: 'Managing contracts and payments',
    icon: FileText,
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/20',
    articles: 6,
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    description: 'Payment methods and invoices',
    icon: IndianRupee,
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/20',
    articles: 5,
  },
  {
    id: 'security',
    title: 'Security & Trust',
    description: 'Account security and verification',
    icon: Shield,
    gradient: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/20',
    articles: 3,
  },
  {
    id: 'disputes',
    title: 'Disputes & Resolution',
    description: 'Handle disagreements fairly',
    icon: AlertTriangle,
    gradient: 'from-danger-500 to-red-600',
    glow: 'shadow-danger-500/20',
    articles: 4,
  },
  {
    id: 'account',
    title: 'Account & Profile',
    description: 'Manage your account settings',
    icon: Users,
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/20',
    articles: 3,
  },
];

const faqs = [];

export default function HelpSupport() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({ subject: '', message: '' });

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

      {/* Hero Section */}
      <motion.div {...fadeUp(0)} className="rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mt-32 -ml-32" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl -mb-32 -mr-32" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/20">
            <Headphones size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">help</span> you?
          </h1>
          <p className="text-dark-400 mb-6 max-w-md mx-auto">Search our help center or browse categories below to find answers to your questions.</p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-500" size={18} />
            <input
              type="text"
              placeholder="Search for help articles, FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-dark-800/80 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Help Categories */}
      <motion.div {...fadeUp(0.1)}>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-primary-400" />
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + idx * 0.06 }}
                className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-5 hover:bg-dark-800/60 hover:border-dark-600/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative overflow-hidden"
              >
                <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${category.gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-3 shadow-lg ${category.glow} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{category.title}</h3>
                  <p className="text-xs text-dark-400 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-dark-500">{category.articles} articles</span>
                    <ChevronRight size={14} className="text-primary-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div {...fadeUp(0.2)} className="rounded-2xl bg-dark-800/40 border border-dark-700/50 overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-dark-700/30">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle size={20} className="text-accent-400" />
            Frequently Asked Questions
          </h2>
        </div>
        <div className="divide-y divide-dark-700/30">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-dark-800/30 transition-colors text-left"
              >
                <span className="text-sm font-semibold text-dark-200 pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown size={18} className="text-dark-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-sm text-dark-400 leading-relaxed bg-dark-900/30 rounded-xl p-4 border border-dark-700/20">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div {...fadeUp(0.25)} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Contact Form */}
        <div className="lg:col-span-2 rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6">
          <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <Send size={18} className="text-primary-400" />
            Contact Support
          </h2>
          <p className="text-xs text-dark-400 mb-5">Can't find what you're looking for? Send us a message.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-dark-400 mb-2 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                placeholder="Brief description of your issue..."
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-400 mb-2 uppercase tracking-wider">Message</label>
              <textarea
                rows={4}
                placeholder="Describe your issue in detail..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500 resize-none"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all active:scale-95 text-sm">
              <Send size={16} />
              Send Message
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email Us', value: 'support@autotrust.io', desc: 'Response within 24 hours', gradient: 'from-primary-500 to-accent-500' },
            { icon: Phone, label: 'Call Us', value: '+91 1800-XXX-XXXX', desc: 'Mon-Fri, 9 AM - 6 PM IST', gradient: 'from-emerald-500 to-teal-500' },
            { icon: MessageSquare, label: 'Live Chat', value: 'Start a conversation', desc: 'Average wait: 2 min', gradient: 'from-amber-500 to-orange-500' },
          ].map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div key={idx} className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-4 hover:bg-dark-800/60 hover:border-dark-600/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-dark-500 font-medium">{contact.label}</p>
                    <p className="text-sm font-bold text-white">{contact.value}</p>
                    <p className="text-[10px] text-dark-600">{contact.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
