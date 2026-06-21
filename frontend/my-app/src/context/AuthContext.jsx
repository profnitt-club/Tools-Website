import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('profnitt_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token is still valid
      api.get('/auth/me')
        .then((res) => {
          setAdmin(res.data);
        })
        .catch(() => {
          // Token invalid — clean up
          localStorage.removeItem('profnitt_token');
          localStorage.removeItem('profnitt_admin');
          setToken(null);
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    const { token: newToken, admin: adminData } = res.data;
    localStorage.setItem('profnitt_token', newToken);
    localStorage.setItem('profnitt_admin', JSON.stringify(adminData));
    setToken(newToken);
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('profnitt_token');
    localStorage.removeItem('profnitt_admin');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout, isAuthenticated: !!token && !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
