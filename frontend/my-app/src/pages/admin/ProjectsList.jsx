import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await api.patch(`/projects/${id}/toggle-publish`);
      fetchProjects();
    } catch (err) {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins">Projects</h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">{projects.length} total strategies</p>
        </div>
        <button
          onClick={() => navigate('/admin/projects/new')}
          className="self-start sm:self-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-pn-glow"
        >
          <FaPlus /> New Project
        </button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-8 sm:p-12 text-center">
          <p className="text-gray-400 text-base sm:text-lg mb-4">No projects yet.</p>
          <button
            onClick={() => navigate('/admin/projects/new')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6 hover:border-pn-purple/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-full">{project.title}</h3>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        (project.isPublished ?? project.is_published)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {(project.isPublished ?? project.is_published) ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(project.tags || []).slice(0, 5).map((tag, idx) => (
                      <span key={idx} className="bg-pn-tag text-gray-300 text-xs px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                    {(project.tags || []).length > 5 && (
                      <span className="text-gray-500 text-xs py-1">+{project.tags.length - 5} more</span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm">
                    {project.winRate && <span className="text-gray-400">Win Rate: <span className="text-white font-medium">{project.winRate ?? project.win_rate}</span></span>}
                    {project.returns && <span className="text-gray-400">Returns: <span className="text-white font-medium">{project.returns}</span></span>}
                    {(project.minCapital ?? project.min_capital) && <span className="text-gray-400">Min Capital: <span className="text-white font-medium">{project.minCapital ?? project.min_capital}</span></span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-start sm:self-start flex-shrink-0 pt-2 sm:pt-0 border-t border-pn-purple/10 sm:border-0 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleTogglePublish(project.id)}
                    title={(project.isPublished ?? project.is_published) ? 'Unpublish' : 'Publish'}
                    className="p-2.5 rounded-xl border border-pn-purple/20 text-gray-400 hover:text-pn-purple hover:border-pn-purple/50 transition-all duration-200"
                  >
                    {(project.isPublished ?? project.is_published) ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <button
                    onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                    title="Edit"
                    className="p-2.5 rounded-xl border border-pn-purple/20 text-gray-400 hover:text-pn-lavender hover:border-pn-lavender/50 transition-all duration-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    title="Delete"
                    className="p-2.5 rounded-xl border border-red-500/20 text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
