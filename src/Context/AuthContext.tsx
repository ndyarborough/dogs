'use client';

import { checkAuth, logout, login } from '@/services/api';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  login: (name: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      setLoggedIn(isAuthenticated);
    };
    verifyAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
  };

  const handleLogin = async (name: string, email: string) => {
    const response = await login(name, email);
    if (response.success) {
      setLoggedIn(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, handleLogout, login: handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
