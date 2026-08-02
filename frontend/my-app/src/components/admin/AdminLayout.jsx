import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaProjectDiagram, FaEnvelope, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-pn-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-pn-dark border-r border-pn-purple/20 flex flex-col fixed h-full z-20">
        {/* Logo */}
        <div className="p-5 border-b border-pn-purple/20 flex items-center gap-3">
          <img src={logo} alt="ProfNITT" className="h-10 w-auto" />
          <div>
            <h1 className="text-white font-bold text-lg font-poppins">Admin CMS</h1>
            <p className="text-gray-400 text-xs">ProfNITT Tools</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
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
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pn-purple to-pn-lavender flex items-center justify-center text-pn-darkest font-bold text-sm">
              {admin?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{admin?.username || 'Admin'}</p>
              <p className="text-gray-400 text-xs">{admin?.email || ''}</p>
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
      <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
