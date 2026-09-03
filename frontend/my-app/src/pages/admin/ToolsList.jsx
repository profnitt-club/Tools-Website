import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ToolsList() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTools = async () => {
    try {
      const res = await api.get('/projects');
      const allProjects = res.data;
      const isStrategy = (p) => {
        if (p.type === 'strategy') return true;
        if (p.type === 'tool') return false;
        const title = (p.title || '').toLowerCase();
        return p.id === 1 || p.id === 3 || title.includes('xauusd') || title.includes('ipo breakout') || title.includes('strategy');
      };
      setTools(allProjects.filter((p) => !isStrategy(p)));
    } catch (err) {
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tool?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setTools(tools.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete tool:', err);
      alert('Failed to delete tool.');
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await api.patch(`/projects/${id}/toggle-publish`);
      fetchTools();
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
      alert('Failed to toggle publish status.');
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins">Tools</h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            {tools.length} {tools.length === 1 ? 'tool' : 'tools'} total
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/tools/new')}
          className="self-start sm:self-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-pn-glow"
        >
          <FaPlus /> New Tool
        </button>
      </div>

      {/* Tools List */}
      {tools.length === 0 ? (
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-8 sm:p-12 text-center">
          <p className="text-gray-400 text-base sm:text-lg mb-4">No tools found.</p>
          <button
            onClick={() => navigate('/admin/tools/new')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-pn-glow"
          >
            Create Your First Tool
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tools.map((tool) => {
            const isPublished = tool.isPublished ?? tool.is_published;
            return (
              <div
                key={tool.id}
                className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6 hover:border-pn-purple/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-full">{tool.title}</h3>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Tool
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isPublished
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                      >
                        {isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{tool.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {(tool.tags || []).slice(0, 5).map((tag, idx) => (
                        <span key={idx} className="bg-pn-tag text-gray-300 text-xs px-2.5 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                      {(tool.tags || []).length > 5 && (
                        <span className="text-gray-500 text-xs py-1">+{tool.tags.length - 5} more</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-start flex-shrink-0 pt-2 sm:pt-0 border-t border-pn-purple/10 sm:border-0 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleTogglePublish(tool.id)}
                      title={isPublished ? 'Unpublish' : 'Publish'}
                      className="p-2.5 rounded-xl border border-pn-purple/20 text-gray-400 hover:text-pn-purple hover:border-pn-purple/50 transition-all duration-200"
                    >
                      {isPublished ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button
                      onClick={() => navigate(`/admin/tools/edit/${tool.id}`)}
                      title="Edit"
                      className="p-2.5 rounded-xl border border-pn-purple/20 text-gray-400 hover:text-pn-lavender hover:border-pn-lavender/50 transition-all duration-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(tool.id)}
                      title="Delete"
                      className="p-2.5 rounded-xl border border-red-500/20 text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
