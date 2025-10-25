import React, { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/authService';

// Tipo del usuario
interface User {
  rol: string;
  [key: string]: any;
}

// Tipo del contexto
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEncargado: boolean;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Provider
export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (username: string, password: string) => {
    const loggedInUser = await authLogin(username, password);
    setUser(loggedInUser);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.rol === 'ADMIN';
  const isEncargado = user?.rol === 'ENCARGADO';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, isEncargado }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
