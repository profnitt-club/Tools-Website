import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaGripVertical, FaCheckCircle } from 'react-icons/fa';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderSavedToast, setOrderSavedToast] = useState(false);
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

  const [filterType, setFilterType] = useState('all'); // 'all', 'strategy', 'tool'

  const isStrategy = (p) => {
    if (p.type === 'strategy') return true;
    if (p.type === 'tool') return false;
    const title = (p.title || '').toLowerCase();
    return p.id === 1 || p.id === 3 || title.includes('xauusd') || title.includes('ipo breakout') || title.includes('strategy');
  };

  const filteredProjects = projects.filter((p) => {
    if (filterType === 'strategy') return isStrategy(p);
    if (filterType === 'tool') return !isStrategy(p);
    return true;
  });

  const strategiesCount = projects.filter(isStrategy).length;
  const toolsCount = projects.filter((p) => !isStrategy(p)).length;

  // Drag and Drop reordering handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    if (e.dataTransfer.setData) {
      e.dataTransfer.setData('text/plain', index);
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...filteredProjects];
    const itemToMove = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, itemToMove);

    setDraggedIndex(index);

    if (filterType === 'all') {
      setProjects(updated);
    } else {
      // Re-integrate filtered order back into main projects array
      const nonFiltered = projects.filter((p) => filterType === 'strategy' ? !isStrategy(p) : isStrategy(p));
      setProjects([...updated, ...nonFiltered]);
    }
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);
    setSavingOrder(true);
    try {
      const itemsToSave = filteredProjects
        .filter((p) => p.id && !isNaN(Number(p.id)))
        .map((p, idx) => ({ id: p.id, displayOrder: idx }));

      if (itemsToSave.length > 0) {
        await api.put('/projects/reorder', { items: itemsToSave });
      }
      setOrderSavedToast(true);
      setTimeout(() => setOrderSavedToast(false), 2500);
    } catch (err) {
      console.error('Failed to save project sequence:', err);
      const msg = err.response?.data?.error || err.message || 'Server error';
      alert(`Could not save sequence order: ${msg}`);
    } finally {
      setSavingOrder(false);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins">Projects & Content</h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            {strategiesCount} strategies • {toolsCount} tools ({projects.length} total) • Drag items to reorder sequence
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savingOrder && (
            <span className="text-xs font-semibold text-pn-lavender animate-pulse bg-pn-purple/20 px-3 py-1.5 rounded-xl border border-pn-purple/30">
              Saving order...
            </span>
          )}
          {orderSavedToast && (
            <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-3 py-1.5 rounded-xl border border-green-500/30 flex items-center gap-1.5">
              <FaCheckCircle /> Order saved!
            </span>
          )}
          <button
            onClick={() => navigate('/admin/projects/new')}
            className="self-start sm:self-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-pn-glow"
          >
            <FaPlus /> New Project
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterType === 'all'
              ? 'bg-pn-purple text-pn-darkest shadow-pn-glow'
              : 'bg-pn-card border border-pn-purple/20 text-gray-400 hover:text-white'
          }`}
        >
          All ({projects.length})
        </button>
        <button
          onClick={() => setFilterType('strategy')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterType === 'strategy'
              ? 'bg-pn-purple text-pn-darkest shadow-pn-glow'
              : 'bg-pn-card border border-pn-purple/20 text-gray-400 hover:text-white'
          }`}
        >
          ⚡ Strategies ({strategiesCount})
        </button>
        <button
          onClick={() => setFilterType('tool')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterType === 'tool'
              ? 'bg-pn-purple text-pn-darkest shadow-pn-glow'
              : 'bg-pn-card border border-pn-purple/20 text-gray-400 hover:text-white'
          }`}
        >
          🛠️ Tools ({toolsCount})
        </button>
      </div>

      {/* Helper Banner */}
      <div className="bg-pn-card border border-pn-purple/20 rounded-xl p-3 mb-6 text-xs text-gray-300 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span>
          <strong>Drag & Drop Reordering:</strong> Click and drag any item using the grip handle (<FaGripVertical className="inline text-gray-400" />) to change their display sequence on the main website.
        </span>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-8 sm:p-12 text-center">
          <p className="text-gray-400 text-base sm:text-lg mb-4">No {filterType !== 'all' ? filterType + 's' : 'projects'} found.</p>
          <button
            onClick={() => navigate('/admin/projects/new')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project, index) => {
            const isStrat = isStrategy(project);
            return (
              <div
                key={project.id || index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6 transition-all duration-200 ${
                  draggedIndex === index ? 'opacity-40 border-pn-purple scale-[0.99] shadow-2xl' : 'hover:border-pn-purple/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Drag Grip Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-pn-purple p-1.5 rounded-lg hover:bg-pn-purple/10 transition-colors mt-0.5"
                      title="Click and drag to reorder sequence"
                    >
                      <FaGripVertical className="text-lg" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                          #{index + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-full">{project.title}</h3>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isStrat
                              ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {isStrat ? 'Strategy' : 'Tool'}
                        </span>
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

                      {/* Stats - ONLY FOR STRATEGIES */}
                      {isStrat && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm">
                          {project.winRate && <span className="text-gray-400">Win Rate: <span className="text-white font-medium">{project.winRate ?? project.win_rate}</span></span>}
                          {project.returns && <span className="text-gray-400">Returns: <span className="text-white font-medium">{project.returns}</span></span>}
                          {(project.minCapital ?? project.min_capital) && <span className="text-gray-400">Min Capital: <span className="text-white font-medium">{project.minCapital ?? project.min_capital}</span></span>}
                        </div>
                      )}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
