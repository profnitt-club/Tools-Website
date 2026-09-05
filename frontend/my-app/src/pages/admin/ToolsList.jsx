import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaGripVertical, FaCheckCircle } from 'react-icons/fa';

export default function ToolsList() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderSavedToast, setOrderSavedToast] = useState(false);
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

    const updated = [...tools];
    const itemToMove = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, itemToMove);

    setDraggedIndex(index);
    setTools(updated);
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);
    setSavingOrder(true);
    try {
      const itemsToSave = tools
        .filter((t) => t.id && !isNaN(Number(t.id)))
        .map((t, idx) => ({ id: t.id, displayOrder: idx }));

      if (itemsToSave.length > 0) {
        await api.put('/projects/reorder', { items: itemsToSave });
      }
      setOrderSavedToast(true);
      setTimeout(() => setOrderSavedToast(false), 2500);
    } catch (err) {
      console.error('Failed to save tool order:', err);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins">Tools</h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            {tools.length} {tools.length === 1 ? 'tool' : 'tools'} total • Drag items to reorder sequence on website
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
            onClick={() => navigate('/admin/tools/new')}
            className="self-start sm:self-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 shadow-pn-glow"
          >
            <FaPlus /> New Tool
          </button>
        </div>
      </div>

      {/* Helper Banner */}
      <div className="bg-pn-card border border-pn-purple/20 rounded-xl p-3 mb-6 text-xs text-gray-300 flex items-center gap-2">
        <span className="text-base">💡</span>
        <span>
          <strong>Drag & Drop Reordering:</strong> Click and drag any tool using the grip handle (<FaGripVertical className="inline text-gray-400" />) to change the order they appear on the main website.
        </span>
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
          {tools.map((tool, index) => {
            const isPublished = tool.isPublished ?? tool.is_published;
            return (
              <div
                key={tool.id || index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6 transition-all duration-200 ${
                  draggedIndex === index ? 'opacity-40 border-indigo-500 scale-[0.99] shadow-2xl' : 'hover:border-pn-purple/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Drag Grip Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-indigo-400 p-1.5 rounded-lg hover:bg-pn-purple/10 transition-colors mt-0.5"
                      title="Click and drag to reorder sequence"
                    >
                      <FaGripVertical className="text-lg" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                          #{index + 1}
                        </span>
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(tool.tags || []).slice(0, 5).map((tag, idx) => (
                          <span key={idx} className="bg-pn-tag text-gray-300 text-xs px-2.5 py-1 rounded-lg">
                            {tag}
                          </span>
                        ))}
                        {(tool.tags || []).length > 5 && (
                          <span className="text-gray-500 text-xs py-1">+{tool.tags.length - 5} more</span>
                        )}
                      </div>

                      {/* Contributors for Tool */}
                      {Array.isArray(tool.contributors) && tool.contributors.length > 0 && (
                        <div className="text-xs text-gray-400">
                          Contributors: <span className="text-gray-200 font-medium">{tool.contributors.join(', ')}</span>
                        </div>
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
