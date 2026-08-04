import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_BASE || 'https://tools-website-m58b.vercel.app';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('profnitt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('profnitt_token');
      localStorage.removeItem('profnitt_admin');
      // Only redirect if on admin page
      if (window.location.hash.includes('/admin') && !window.location.hash.includes('/admin/login')) {
        window.location.hash = '#/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
