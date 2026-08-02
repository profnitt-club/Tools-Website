import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import { FaProjectDiagram, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Dashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState({ projects: 0, published: 0, drafts: 0, contacts: 0, unread: 0 });
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

        setStats({
          projects: projects.length,
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
    { label: 'Total Projects', value: stats.projects, icon: <FaProjectDiagram />, color: 'from-pn-purple to-blue-500' },
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-poppins">
          Welcome back, <span className="text-pn-pink">{admin?.username}</span>
        </h1>
        <p className="text-gray-400 mt-1">Here's what's happening with your ProfNITT Tools platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-pn-card rounded-2xl border border-pn-purple/20 p-6 hover:border-pn-purple/40 transition-all duration-300 hover:-translate-y-1"
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
            <p className="text-3xl font-bold text-white">{card.value}</p>
            <p className="text-gray-400 text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-6">
        <h2 className="text-lg font-bold text-white mb-4 font-poppins">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="#/admin/projects/new"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-pn-glow"
          >
            + New Project
          </a>
          <a
            href="#/admin/projects"
            className="px-6 py-3 rounded-xl border border-pn-purple/30 text-pn-purple font-medium text-sm hover:bg-pn-purple/10 transition-all duration-200"
          >
            Manage Projects
          </a>
          <a
            href="#/admin/contacts"
            className="px-6 py-3 rounded-xl border border-pn-pink/30 text-pn-pink font-medium text-sm hover:bg-pn-pink/10 transition-all duration-200"
          >
            View Messages {stats.unread > 0 && `(${stats.unread})`}
          </a>
        </div>
      </div>
    </div>
  );
}
