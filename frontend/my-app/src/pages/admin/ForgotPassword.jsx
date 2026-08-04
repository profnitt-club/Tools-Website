import { useState } from 'react';
import api from '../../api';
import logo from '../../assets/logo.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await api.post('/auth/forgot-password', { email });
      setStatus({
        type: 'success',
        message: res.data.message || 'Password reset link sent to your email!',
      });
      setEmail('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to send reset link. Please try again.',
      });
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
        <div className="bg-pn-card/80 backdrop-blur-xl rounded-3xl border border-pn-purple/30 shadow-pn-glow p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img src={logo} alt="ProfNITT" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white font-poppins">Reset Admin Password</h1>
            <p className="text-gray-400 text-sm mt-1">
              Enter your admin email to receive a password reset link.
            </p>
          </div>

          {/* Alert status */}
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm text-center border ${
                status.type === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-pn-darkest border border-pn-purple/20 text-white placeholder-gray-500 focus:outline-none focus:border-pn-purple focus:shadow-pn-glow transition-all duration-200"
                placeholder="profnitt.club@gmail.com"
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
                  Sending Link...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Navigation links */}
          <div className="mt-6 text-center space-y-2">
            <div>
              <a
                href="#/admin/login"
                className="text-gray-400 text-sm hover:text-pn-purple transition-colors duration-200"
              >
                ← Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
