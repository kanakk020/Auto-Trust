import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Bell, LogOut, Menu, X } from 'lucide-react';
import { currentUser } from '../../lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Create Contract', path: '/create-contract', icon: <FileText size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
            <div className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white">
                <ShieldIcon />
              </div>
              AutoTrust
            </div>
            <button className="lg:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (location.pathname.startsWith('/contract/') && item.name === 'Create Contract');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-slate-100">
            <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors font-medium">
              <LogOut size={20} />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const Navbar = ({ setIsOpen }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0">
      <button className="lg:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>
      
      <div className="flex-1 lg:flex-none"></div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-500 focus:outline-none">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-700">{currentUser.name}</p>
            <p className="text-xs text-slate-500">Trust Score: {currentUser.trustScore}</p>
          </div>
          <img src={currentUser.avatar} alt="Avatar" className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm" />
        </div>
      </div>
    </header>
  );
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar setIsOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
