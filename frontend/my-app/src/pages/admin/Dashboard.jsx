import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { FaBolt, FaWrench, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Dashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState({ strategies: 0, tools: 0, published: 0, drafts: 0, contacts: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, contactsRes] = await Promise.all([
          api.get('/projects'),
          api.get('/contacts'),
        ]);

        const projects = projectsRes.data;
        const contacts = contactsRes.data;

        const isStrategy = (p) => {
          if (p.type === 'strategy') return true;
          if (p.type === 'tool') return false;
          const title = (p.title || '').toLowerCase();
          return p.id === 1 || p.id === 3 || title.includes('xauusd') || title.includes('ipo breakout');
        };

        const strategiesCount = projects.filter(isStrategy).length;
        const toolsCount = projects.filter((p) => !isStrategy(p)).length;

        setStats({
          strategies: strategiesCount,
          tools: toolsCount,
          published: projects.filter((p) => p.isPublished || p.is_published).length,
          drafts: projects.filter((p) => !(p.isPublished || p.is_published)).length,
          contacts: contacts.length,
          unread: contacts.filter((c) => !c.is_read).length,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Strategies', value: stats.strategies, icon: <FaBolt />, color: 'from-pink-500 to-rose-500' },
    { label: 'Tools', value: stats.tools, icon: <FaWrench />, color: 'from-indigo-500 to-blue-500' },
    { label: 'Published', value: stats.published, icon: <FaEye />, color: 'from-green-500 to-emerald-500' },
    { label: 'Drafts', value: stats.drafts, icon: <FaEyeSlash />, color: 'from-yellow-500 to-orange-500' },
    { label: 'Contact Messages', value: stats.contacts, icon: <FaEnvelope />, color: 'from-pn-pink to-pn-magenta' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pn-purple"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins">
          Welcome back, <span className="text-pn-pink">{admin?.username}</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">Here's what's happening with your ProfNITT Tools platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-pn-card rounded-2xl border border-pn-purple/20 p-5 sm:p-6 hover:border-pn-purple/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                {card.icon}
              </div>
              {card.label === 'Contact Messages' && stats.unread > 0 && (
                <span className="bg-pn-pink text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                  {stats.unread} new
                </span>
              )}
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{card.value}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-4 font-poppins">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href="#/admin/strategies/new"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-lg text-center"
          >
            + New Strategy
          </a>
          <a
            href="#/admin/tools/new"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-lg text-center"
          >
            + New Tool
          </a>
          <a
            href="#/admin/strategies"
            className="px-6 py-3 rounded-xl border border-pink-500/30 text-pink-400 font-medium text-sm hover:bg-pink-500/10 transition-all duration-200 text-center"
          >
            Manage Strategies
          </a>
          <a
            href="#/admin/tools"
            className="px-6 py-3 rounded-xl border border-indigo-500/30 text-indigo-400 font-medium text-sm hover:bg-indigo-500/10 transition-all duration-200 text-center"
          >
            Manage Tools
          </a>
          <a
            href="#/admin/contacts"
            className="px-6 py-3 rounded-xl border border-pn-pink/30 text-pn-pink font-medium text-sm hover:bg-pn-pink/10 transition-all duration-200 text-center"
          >
            View Messages {stats.unread > 0 && `(${stats.unread})`}
          </a>
        </div>
      </div>
    </div>
  );
}
