import React from 'react';
import { motion } from 'framer-motion';
import { currentUser, mockContracts } from '../lib/mockData';
import { Award, ShieldAlert, Star, MapPin, Mail, Calendar, TrendingUp, CheckCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const isHighTrust = currentUser.trustScore >= 80;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="card border-0 bg-white overflow-hidden p-0 mb-8 relative">
        <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-400"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 relative">
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg bg-white"
            />
            <div className="flex-1 text-center sm:text-left mb-2">
              <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                {currentUser.name}
                {isHighTrust && <Award className="text-primary-500" size={24} />}
              </h1>
              <p className="text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <Mail size={16} /> {currentUser.email} • <MapPin size={16} className="ml-2" /> Global
              </p>
            </div>
            <div className="flex gap-3 mb-2 w-full sm:w-auto">
              <button className="btn-secondary flex-1 sm:flex-none">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="card text-center py-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-50 flex items-center justify-center mb-4 relative">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle 
                  cx="48" cy="48" r="44" fill="none" 
                  stroke={isHighTrust ? '#22c55e' : '#f59e0b'} 
                  strokeWidth="8" strokeDasharray="276" strokeDashoffset={276 - (276 * currentUser.trustScore) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className={`text-3xl font-bold ${isHighTrust ? 'text-success-600' : 'text-amber-600'}`}>
                {currentUser.trustScore}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Trust Score</h3>
            <p className="text-sm text-slate-500 mt-1">Based on successful completions and timely responses.</p>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium">
              {isHighTrust ? (
                <span className="flex items-center gap-1 text-success-600 bg-success-50 px-3 py-1 rounded-full">
                  <ShieldAlert size={16} className="rotate-180" /> Highly Trusted Member
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  <Star size={16} /> Growing Trust
                </span>
              )}
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">Stats</h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 flex items-center gap-2"><CheckCircle size={16} /> Completed Deals</span>
              <span className="font-bold text-slate-900">{currentUser.completedDeals}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 flex items-center gap-2"><FileText size={16} /> Active Contracts</span>
              <span className="font-bold text-slate-900">{currentUser.activeContracts}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 flex items-center gap-2"><Calendar size={16} /> Member Since</span>
              <span className="font-bold text-slate-900">Jan 2026</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Contract History</h3>
            
            <div className="space-y-4">
              {mockContracts.map((contract) => (
                <div key={contract.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="mb-3 sm:mb-0">
                    <h4 className="font-semibold text-slate-900">{contract.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">
                      {contract.partyA === currentUser.name ? 'with ' + contract.partyB : 'with ' + contract.partyA} • {new Date(contract.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-bold text-slate-900">${contract.amount}</span>
                    <span className={`px-2.5 py-1 rounded text-xs font-semibold
                      ${contract.status === 'Completed' ? 'bg-success-50 text-success-700' : 
                        contract.status === 'In Progress' ? 'bg-primary-50 text-primary-700' : 
                        'bg-slate-100 text-slate-600'}
                    `}>
                      {contract.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700">Load More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
