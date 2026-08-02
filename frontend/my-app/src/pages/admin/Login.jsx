import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pn-bg flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pn-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pn-pink/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-pn-card/80 backdrop-blur-xl rounded-3xl border border-pn-purple/30 shadow-pn-glow p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <img src={logo} alt="ProfNITT" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white font-poppins">Admin Login</h1>
            <p className="text-gray-400 text-sm mt-1">ProfNITT Tools CMS</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-pn-darkest border border-pn-purple/20 text-white placeholder-gray-500 focus:outline-none focus:border-pn-purple focus:shadow-pn-glow transition-all duration-200"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-pn-darkest border border-pn-purple/20 text-white placeholder-gray-500 focus:outline-none focus:border-pn-purple focus:shadow-pn-glow transition-all duration-200"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-pn-glow"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-pn-darkest border-t-transparent"></span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <a
              href="#/"
              className="text-gray-400 text-sm hover:text-pn-purple transition-colors duration-200"
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
