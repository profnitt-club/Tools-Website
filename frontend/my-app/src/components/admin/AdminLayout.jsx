import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaProjectDiagram, FaEnvelope, FaTachometerAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.png';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
      isActive
        ? 'bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest shadow-pn-glow'
        : 'text-gray-300 hover:bg-pn-card hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-pn-bg flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-pn-dark border-b border-pn-purple/20 px-4 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-30 h-16">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ProfNITT" className="h-8 w-auto" />
          <span className="text-white font-bold text-base font-poppins">Admin CMS</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-xl border border-pn-purple/20 text-gray-300 hover:text-white hover:border-pn-purple/50 transition-all focus:outline-none"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </header>

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop fixed, Mobile off-canvas drawer) */}
      <aside
        className={`w-64 bg-pn-dark border-r border-pn-purple/20 flex flex-col fixed h-full z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Header */}
        <div className="p-5 border-b border-pn-purple/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ProfNITT" className="h-10 w-auto" />
            <div>
              <h1 className="text-white font-bold text-lg font-poppins">Admin CMS</h1>
              <p className="text-gray-400 text-xs">ProfNITT Tools</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-1"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink to="/admin/dashboard" className={linkClasses}>
            <FaTachometerAlt className="text-lg" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/projects" className={linkClasses}>
            <FaProjectDiagram className="text-lg" />
            Projects
          </NavLink>
          <NavLink to="/admin/contacts" className={linkClasses}>
            <FaEnvelope className="text-lg" />
            Contacts
          </NavLink>
        </nav>

        {/* Admin Info & Logout */}
        <div className="p-4 border-t border-pn-purple/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pn-purple to-pn-lavender flex items-center justify-center text-pn-darkest font-bold text-sm flex-shrink-0">
              {admin?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{admin?.username || 'Admin'}</p>
              <p className="text-gray-400 text-xs truncate">{admin?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 pt-20 md:pt-8 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
