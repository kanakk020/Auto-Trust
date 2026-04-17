import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, User, FileText, Pickaxe, Send } from 'lucide-react';

export default function CreateContract() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partyB: '',
    title: '',
    description: '',
    amount: '',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate creation
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create New Contract</h1>
        <p className="text-slate-500 mt-1">Setup the terms and conditions for your next agreement.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <form onSubmit={handleSubmit} className="card space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Party A (You)</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value="" 
                  placeholder="Your name (auto-filled on login)"
                  disabled 
                  className="input-field pl-11 bg-slate-100 text-slate-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Party B (Collaborator email)</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  placeholder="e.g. sarah@example.com" 
                  required
                  value={formData.partyB}
                  onChange={(e) => setFormData({...formData, partyB: e.target.value})}
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Contract Title</label>
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="e.g. Website Redesign Project" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input-field pl-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Deal Description</label>
            <textarea 
              placeholder="Describe the deliverables, timeline, and terms..." 
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Amount (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="number" 
                  min="1"
                  placeholder="5000" 
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="input-field pl-11 font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="date" 
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="input-field pl-11 text-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-start gap-3 mt-4">
            <Pickaxe className="text-primary-500 mt-0.5 shrink-0" size={20} />
            <p className="text-sm text-primary-800 leading-relaxed">
              Once generated, a Smart Contract will be created and an invitation will be sent to the collaborator. Funds will only be held when both parties agree.
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Send size={18} />
              Generate Smart Contract
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
