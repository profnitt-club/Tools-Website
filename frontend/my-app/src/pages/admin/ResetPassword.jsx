import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import logo from '../../assets/logo.png';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setVerifying(false);
      setTokenValid(false);
      setStatus({ type: 'error', message: 'No reset token provided.' });
      return;
    }

    api.get(`/auth/verify-reset-token/${token}`)
      .then((res) => {
        if (res.data.valid) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setStatus({ type: 'error', message: res.data.error || 'Token is invalid or expired.' });
        }
      })
      .catch((err) => {
        setTokenValid(false);
        setStatus({ type: 'error', message: err.response?.data?.error || 'Invalid or expired token.' });
      })
      .finally(() => setVerifying(false));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await api.post('/auth/reset-password', {
        token,
        newPassword,
      });

      setStatus({ type: 'success', message: res.data.message || 'Password updated successfully!' });
      setTimeout(() => {
        navigate('/admin/login');
      }, 2500);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.error || 'Failed to update password.',
      });
    } finally {
      setSubmitting(false);
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
            <h1 className="text-2xl font-bold text-white font-poppins">Set New Password</h1>
            <p className="text-gray-400 text-sm mt-1">Enter your new password below.</p>
          </div>

          {verifying ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pn-purple mb-4"></div>
              <p className="text-gray-400 text-sm">Verifying reset token...</p>
            </div>
          ) : !tokenValid ? (
            <div className="text-center space-y-6">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {status.message || 'Invalid or expired password reset link.'}
              </div>
              <a
                href="#/admin/forgot-password"
                className="inline-block px-6 py-2.5 rounded-xl bg-pn-purple/20 text-pn-purple font-medium text-sm hover:bg-pn-purple/30 transition-all"
              >
                Request a new link
              </a>
            </div>
          ) : (
            <>
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-pn-darkest border border-pn-purple/20 text-white placeholder-gray-500 focus:outline-none focus:border-pn-purple focus:shadow-pn-glow transition-all duration-200"
                    placeholder="At least 6 characters"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-pn-darkest border border-pn-purple/20 text-white placeholder-gray-500 focus:outline-none focus:border-pn-purple focus:shadow-pn-glow transition-all duration-200"
                    placeholder="Re-enter new password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-pn-glow"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-pn-darkest border-t-transparent"></span>
                      Updating Password...
                    </span>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </>
          )}

          {/* Navigation link */}
          <div className="mt-6 text-center">
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
  );
}
