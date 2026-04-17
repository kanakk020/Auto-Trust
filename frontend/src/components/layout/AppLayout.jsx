import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, FilePlus, Wallet, AlertTriangle,
  User, Bell, LogOut, Menu, X, Search, Shield, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'My Contracts', path: '/contracts', icon: FileText },
  { name: 'Create Contract', path: '/create-contract', icon: FilePlus },
  { name: 'Payments', path: '/payments', icon: Wallet },
  { name: 'Disputes', path: '/disputes', icon: AlertTriangle },
  { name: 'Profile', path: '/profile', icon: User },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-950/60 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 z-30 w-[260px] bg-dark-950 border-r border-dark-800/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-[68px] px-5 border-b border-dark-800/50">
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20 transition-transform group-hover:scale-105">
              <Shield size={18} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">Auto</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Trust</span>
            </span>
          </Link>
          <button className="lg:hidden text-dark-400 hover:text-dark-200 transition-colors" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Role Badge */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-primary-400" />
            <span className="text-xs font-bold text-primary-300 uppercase tracking-wider">Client Mode</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-3 px-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-dark-500 px-3 mb-3">Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path
                || (item.path === '/contracts' && location.pathname.startsWith('/contract/'))
                || (item.path === '/dashboard' && location.pathname === '/dashboard');
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm
                    ${isActive
                      ? 'bg-gradient-to-r from-primary-500/15 to-accent-500/15 text-primary-300 border border-primary-500/20 shadow-sm'
                      : 'text-dark-400 hover:bg-dark-800/50 hover:text-dark-200'
                    }`}
                >
                  <Icon size={19} />
                  {item.name}
                  {item.name === 'Disputes' && (
                    <span className="ml-auto bg-danger-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="p-3 border-t border-dark-800/50">
          <div className="mx-2 mb-3 px-3 py-3 rounded-xl bg-dark-900 border border-dark-800/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-dark-500 uppercase tracking-wide">Trust Score</span>
              <span className="text-sm font-bold text-primary-400">--</span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-1.5 rounded-full transition-all duration-700" style={{ width: '0%' }} />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <Star size={11} className="text-yellow-400" />
              <span className="text-[10px] font-semibold text-yellow-400">New Client</span>
            </div>
          </div>

          <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-dark-500 hover:text-danger-400 hover:bg-dark-800/50 transition-all font-medium text-sm">
            <LogOut size={19} />
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

const Navbar = ({ setIsOpen }) => {
  return (
    <header className="bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/40 h-[68px] flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-dark-400 hover:text-dark-200 transition-colors" onClick={() => setIsOpen(true)}>
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-dark-500" size={17} />
            <input
              type="text"
              placeholder="Search contracts, payments..."
              className="w-full pl-10 pr-4 py-2.5 bg-dark-800/50 border border-dark-700/50 rounded-xl text-sm text-dark-200 focus:bg-dark-800 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-dark-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="sm:hidden p-2.5 text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 rounded-xl transition-colors">
          <Search size={20} />
        </button>

        <button className="relative p-2.5 text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 rounded-xl transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-primary-500 ring-2 ring-dark-950 animate-pulse-glow" />
        </button>

        <div className="flex items-center gap-3 ml-1 pl-3 border-l border-dark-800/40">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-dark-100 leading-tight">Client</p>
            <p className="text-[11px] text-dark-500 flex items-center justify-end gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              Verified
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:shadow-lg hover:shadow-primary-500/20 transition-shadow">
            CL
          </div>
        </div>
      </div>
    </header>
  );
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark-950 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar setIsOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-dark-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
