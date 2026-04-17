import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Mail, Calendar, CheckCircle, FileText, PlusCircle, Phone, CreditCard, Shield, ArrowLeft, User, MapPin, Edit3, Save, X, Wallet, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });
  const trustScore = 0;
  const contracts = [];
  const isHighTrust = trustScore >= 80;

  const handleEdit = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...user });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = () => {
    if (!user.name) return 'U';
    return user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const maskAadhaar = (val) => {
    if (!val) return 'Not provided';
    return 'XXXX XXXX ' + val.slice(-4);
  };

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser({ profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-dark-400 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Hero Banner */}
      <div className="rounded-2xl border border-dark-700/50 bg-dark-800/40 overflow-hidden p-0 mb-8 relative">
        <div className="h-48 bg-gradient-to-r from-primary-600 to-accent-500 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 relative">
            {/* Avatar with image upload */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl border-4 border-dark-800 shadow-lg overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  getInitials()
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 rounded-3xl bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1">
                  <Camera size={24} className="text-white drop-shadow-lg" />
                  <span className="text-[10px] font-semibold text-white drop-shadow-lg">Change Photo</span>
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {/* Small camera badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-500 border-2 border-dark-800 flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                <Camera size={14} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left mb-2">
              <h1 className="text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                {user.name || 'Your Profile'}
              </h1>
              <p className="text-dark-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <Mail size={16} /> {user.email || 'Complete your profile to get started'}
              </p>
              {user.role && (
                <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-500/15 text-primary-400 border border-primary-500/20">
                  {user.role === 'freelancer' ? '⚡ Freelancer' : '🔍 Client'}
                </span>
              )}
            </div>
            <div className="flex gap-3 mb-2 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all active:scale-95 flex items-center gap-2 justify-center"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-dark-600 text-dark-300 font-semibold text-sm hover:bg-dark-800/50 transition-all active:scale-95 flex items-center gap-2 justify-center"
                  >
                    <X size={16} /> Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleEdit}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all active:scale-95 flex items-center gap-2 justify-center"
                >
                  <Edit3 size={16} /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">

          {/* Trust Score */}
          <div className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6 text-center py-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-dark-700/50 flex items-center justify-center mb-4 relative">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="44" fill="none" stroke="#1e293b" strokeWidth="8" />
                <circle 
                  cx="48" cy="48" r="44" fill="none" 
                  stroke={isHighTrust ? '#22c55e' : '#f59e0b'} 
                  strokeWidth="8" strokeDasharray="276" strokeDashoffset={276 - (276 * trustScore) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className={`text-3xl font-bold ${isHighTrust ? 'text-emerald-400' : 'text-amber-400'}`}>
                {trustScore}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Trust Score</h3>
            <p className="text-sm text-dark-400 mt-1">Based on successful completions and timely responses.</p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium">
              <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Star size={16} /> New Member
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6 space-y-4">
            <h3 className="font-bold text-white border-b border-dark-700/30 pb-3 mb-4">Stats</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-dark-400 flex items-center gap-2"><CheckCircle size={16} /> Completed Deals</span>
              <span className="font-bold text-white">0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-dark-400 flex items-center gap-2"><FileText size={16} /> Active Contracts</span>
              <span className="font-bold text-white">0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-dark-400 flex items-center gap-2"><Calendar size={16} /> Member Since</span>
              <span className="font-bold text-white">
                {user.memberSince ? new Date(user.memberSince).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">

          {/* ─── KYC / IDENTITY DETAILS ─── */}
          <div className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield size={20} className="text-primary-400" />
              <h3 className="text-xl font-bold text-white">Identity & KYC Details</h3>
            </div>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User size={13} /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-primary-500/30 text-white text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-dark-900/50 border border-dark-700/30 text-dark-300 text-sm font-medium">
                    {user.name || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Mail size={13} /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-primary-500/30 text-white text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-dark-900/50 border border-dark-700/30 text-dark-300 text-sm font-medium">
                    {user.email || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone size={13} /> Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-primary-500/30 text-white text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    placeholder="Enter 10-digit mobile number"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-4 py-3 rounded-xl bg-dark-900/50 border border-dark-700/30 text-dark-300 text-sm font-medium">
                      {user.phone ? `+91 ${user.phone}` : 'Not provided'}
                    </div>
                    {user.phone && (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        Verified
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* UPI ID */}
              <div>
                <label className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wallet size={13} /> UPI ID
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.upiId}
                    onChange={(e) => handleChange('upiId', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-primary-500/30 text-white text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    placeholder="e.g. name@upi"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-dark-900/50 border border-dark-700/30 text-dark-300 text-sm font-medium">
                    {user.upiId || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Aadhaar Card */}
              <div>
                <label className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Shield size={13} /> Aadhaar Card Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.aadhaar}
                    onChange={(e) => handleChange('aadhaar', e.target.value)}
                    maxLength={12}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/50 border border-primary-500/30 text-white text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    placeholder="12-digit Aadhaar number"
                  />
                ) : (
                  <div className="px-4 py-3 rounded-xl bg-dark-900/50 border border-dark-700/30 text-dark-300 text-sm font-medium">
                    {maskAadhaar(user.aadhaar)}
                  </div>
                )}
                <p className="text-[11px] text-dark-600 mt-1.5 ml-1">12-digit Aadhaar number</p>
              </div>
            </div>

            {/* KYC Status Banner */}
            {(!user.phone || !user.aadhaar || !user.name) ? (
              <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <Shield size={18} className="text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-300">KYC Incomplete</p>
                    <p className="text-xs text-amber-400/70 mt-0.5">Complete your KYC verification to unlock higher transaction limits and build trust.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">KYC Complete</p>
                    <p className="text-xs text-emerald-400/70 mt-0.5">Your identity has been verified. You have access to all platform features.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contract History */}
          <div className="rounded-2xl bg-dark-800/40 border border-dark-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Contract History</h3>
            
            <div className="space-y-4">
              {contracts.length > 0 ? contracts.map((contract) => (
                <div key={contract.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-dark-700/30 rounded-xl hover:border-dark-600/50 transition-colors">
                  <div className="mb-3 sm:mb-0">
                    <h4 className="font-semibold text-white">{contract.title}</h4>
                    <p className="text-sm text-dark-500 mt-1">
                      with {contract.partyB} • {new Date(contract.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-bold text-white">${contract.amount}</span>
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold
                      ${contract.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                        contract.status === 'In Progress' ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 
                        'bg-dark-700/50 text-dark-400'}
                    `}>
                      {contract.status}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center">
                  <div className="w-16 h-16 bg-dark-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText size={28} className="text-dark-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-dark-300 mb-2">No contract history</h4>
                  <p className="text-sm text-dark-500 mb-6">Your completed contracts will appear here.</p>
                  <Link to="/create-contract" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-95">
                    <PlusCircle size={18} /> Create Contract
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
