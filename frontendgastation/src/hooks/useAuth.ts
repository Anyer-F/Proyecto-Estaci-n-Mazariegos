import { useState, useEffect, useContext, createContext } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/authService';

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEncargado: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (username, password) => {
    const loggedInUser = await authLogin(username, password);
    setUser(loggedInUser);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.rol === 'ADMIN'; // Assuming a 'rol' field in user object
  const isEncargado = user?.rol === 'ENCARGADO'; // Assuming a 'rol' field in user object

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, isEncargado }}>
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
