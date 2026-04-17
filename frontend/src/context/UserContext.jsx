import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const DEFAULT_USER = {
  name: '',
  email: '',
  phone: '',
  aadhaar: '',
  upiId: '',
  profileImage: '',
  role: '', // 'client' or 'freelancer'
  memberSince: '',
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('autotrust_user');
      return saved ? JSON.parse(saved) : { ...DEFAULT_USER };
    } catch {
      return { ...DEFAULT_USER };
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('autotrust_user', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const clearUser = () => {
    setUser({ ...DEFAULT_USER });
    localStorage.removeItem('autotrust_user');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
