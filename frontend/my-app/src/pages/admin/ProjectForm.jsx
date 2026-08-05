import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { API_BASE } from '../../api';
import { FaTimes, FaPlus } from 'react-icons/fa';

export default function ProjectForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    createdTime: '',
    tags: [],
    trades: '',
    drawdown: '',
    minCapital: '',
    winRate: '',
    returns: '',
    monthlyFee: '',
    contributors: [],
    params: [],
    video: '',
    gitlink: '',
    isPublished: true,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [contributorInput, setContributorInput] = useState('');
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api.get(`/projects/${id}`)
        .then((res) => {
          const p = res.data;
          setForm({
            title: p.title || '',
            description: p.description || '',
            createdTime: p.createdTime || p.created_time || '',
            tags: p.tags || [],
            trades: p.trades || '',
            drawdown: p.drawdown || '',
            minCapital: p.minCapital || p.min_capital || '',
            winRate: p.winRate || p.win_rate || '',
            returns: p.returns || '',
            monthlyFee: p.monthlyFee || p.monthly_fee || '',
            contributors: p.contributors || [],
            params: (p.params || []).map((param) => {
              if (typeof param === 'object' && !param.key) {
                const [key, value] = Object.entries(param)[0] || ['', ''];
                return { key, value: String(value) };
              }
              return param;
            }),
            video: p.video || '',
            gitlink: p.gitlink || '',
            isPublished: p.isPublished ?? p.is_published ?? true,
          });
          if (p.thumbnail) setPreviewUrl(p.thumbnail.startsWith('/') ? `${API_BASE}${p.thumbnail}` : p.thumbnail);
        })
        .catch((err) => {
          console.error('Error loading project:', err);
          alert('Failed to load project.');
          navigate('/admin/projects');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (idx) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((_, i) => i !== idx) }));
  };

  const addContributor = () => {
    if (contributorInput.trim() && !form.contributors.includes(contributorInput.trim())) {
      setForm((prev) => ({ ...prev, contributors: [...prev.contributors, contributorInput.trim()] }));
      setContributorInput('');
    }
  };

  const removeContributor = (idx) => {
    setForm((prev) => ({ ...prev, contributors: prev.contributors.filter((_, i) => i !== idx) }));
  };

  const addParam = () => {
    if (paramKey.trim()) {
      setForm((prev) => ({ ...prev, params: [...prev.params, { key: paramKey.trim(), value: paramValue.trim() }] }));
      setParamKey('');
      setParamValue('');
    }
  };

  const removeParam = (idx) => {
    setForm((prev) => ({ ...prev, params: prev.params.filter((_, i) => i !== idx) }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { alert('Title is required.'); return; }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('createdTime', form.createdTime);
      formData.append('tags', JSON.stringify(form.tags));
      formData.append('trades', form.trades);
      formData.append('drawdown', form.drawdown);
      formData.append('minCapital', form.minCapital);
      formData.append('winRate', form.winRate);
      formData.append('returns', form.returns);
      formData.append('monthlyFee', form.monthlyFee);
      formData.append('contributors', JSON.stringify(form.contributors));
      // Convert params from {key, value} to {key: value} for backend
      const paramsForDB = form.params
        .filter((p) => p && (p.key || typeof p === 'object'))
        .map((p) => (p.key ? { [p.key]: p.value || '' } : p));
      formData.append('params', JSON.stringify(paramsForDB));
      formData.append('video', form.video);
      formData.append('gitlink', form.gitlink);
      formData.append('isPublished', String(form.isPublished));
      if (thumbnail) formData.append('thumbnail', thumbnail);

      const config = { headers: { 'Content-Type': undefined } };

      if (isEditing) {
        await api.put(`/projects/${id}`, formData, config);
      } else {
        await api.post('/projects', formData, config);
      }

      navigate('/admin/projects');
    } catch (err) {
      console.error('Error saving project:', err);
      alert(err.response?.data?.error || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-pn-darkest border border-pn-purple/20 text-white placeholder-gray-500 focus:outline-none focus:border-pn-purple focus:shadow-pn-glow transition-all duration-200';
  const labelClass = 'block text-gray-300 text-sm font-medium mb-2';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pn-purple"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins">
            {isEditing ? 'Edit Project' : 'New Project'}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            {isEditing ? 'Update the strategy details below.' : 'Fill in the strategy details below.'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/projects')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl border border-pn-purple/30 text-gray-400 hover:text-white hover:border-pn-purple/60 transition-all duration-200 text-sm"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-white mb-4">Basic Info</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} className={inputClass} placeholder="e.g. 5 Minutes XAUUSD Strategy" required />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className={`${inputClass} h-32 resize-none`} placeholder="Describe the strategy..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Created Date</label>
                <input name="createdTime" value={form.createdTime} onChange={handleChange} className={inputClass} placeholder="e.g. 10 Feb 2025" />
              </div>
              <div>
                <label className={labelClass}>Monthly Fee</label>
                <input name="monthlyFee" value={form.monthlyFee} onChange={handleChange} className={inputClass} placeholder="e.g. Free +5%" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-white mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Win Rate</label>
              <input name="winRate" value={form.winRate} onChange={handleChange} className={inputClass} placeholder="e.g. 51%" />
            </div>
            <div>
              <label className={labelClass}>Returns</label>
              <input name="returns" value={form.returns} onChange={handleChange} className={inputClass} placeholder="e.g. 708.77" />
            </div>
            <div>
              <label className={labelClass}>Drawdown</label>
              <input name="drawdown" value={form.drawdown} onChange={handleChange} className={inputClass} placeholder="e.g. -25%" />
            </div>
            <div>
              <label className={labelClass}>Min Capital</label>
              <input name="minCapital" value={form.minCapital} onChange={handleChange} className={inputClass} placeholder="e.g. ₹30K" />
            </div>
            <div>
              <label className={labelClass}>Trades</label>
              <input name="trades" value={form.trades} onChange={handleChange} className={inputClass} placeholder="e.g. 846" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-white mb-4">Tags</h2>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              className={`${inputClass} flex-1`}
              placeholder="Type a tag and press Enter..."
            />
            <button type="button" onClick={addTag} className="px-4 py-3 rounded-xl bg-pn-purple/20 text-pn-purple hover:bg-pn-purple/30 transition-all duration-200 flex items-center justify-center">
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-1.5 bg-pn-tag text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                {tag}
                <button type="button" onClick={() => removeTag(idx)} className="text-gray-500 hover:text-red-400 transition-colors">
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Contributors */}
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-white mb-4">Contributors</h2>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              value={contributorInput}
              onChange={(e) => setContributorInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addContributor(); } }}
              className={`${inputClass} flex-1`}
              placeholder="Contributor name..."
            />
            <button type="button" onClick={addContributor} className="px-4 py-3 rounded-xl bg-pn-purple/20 text-pn-purple hover:bg-pn-purple/30 transition-all duration-200 flex items-center justify-center">
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.contributors.map((name, idx) => (
              <span key={idx} className="flex items-center gap-1.5 bg-pn-tag text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                {name}
                <button type="button" onClick={() => removeContributor(idx)} className="text-gray-500 hover:text-red-400 transition-colors">
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Performance Parameters */}
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-white mb-4">Performance Parameters</h2>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input value={paramKey} onChange={(e) => setParamKey(e.target.value)} className={`${inputClass} flex-1`} placeholder="Key (e.g. Sharpe Ratio)" />
            <input value={paramValue} onChange={(e) => setParamValue(e.target.value)} className={`${inputClass} flex-1`} placeholder="Value (e.g. 0.000469)"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addParam(); } }}
            />
            <button type="button" onClick={addParam} className="px-4 py-3 rounded-xl bg-pn-purple/20 text-pn-purple hover:bg-pn-purple/30 transition-all duration-200 flex items-center justify-center">
              <FaPlus />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.params.map((p, idx) => (
              <span key={idx} className="flex items-center gap-1.5 bg-pn-tag text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                {p.key}: {p.value}
                <button type="button" onClick={() => removeParam(idx)} className="text-gray-500 hover:text-red-400 transition-colors">
                  <FaTimes className="text-xs" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Links & Media */}
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6">
          <h2 className="text-lg font-bold text-white mb-4">Links & Media</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>GitHub Link</label>
              <input name="gitlink" value={form.gitlink} onChange={handleChange} className={inputClass} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={labelClass}>Demo Video URL</label>
              <input name="video" value={form.video} onChange={handleChange} className={inputClass} placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div>
              <label className={labelClass}>Thumbnail Image</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <input type="file" accept="image/*" onChange={handleThumbnailChange} className="text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-pn-purple/20 file:text-pn-purple file:font-medium file:cursor-pointer hover:file:bg-pn-purple/30 max-w-full" />
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="h-16 w-16 rounded-xl object-cover border border-pn-purple/30" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Publish Toggle & Submit */}
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-pn-tag rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-pn-purple after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
              <span className="text-white font-medium">{form.isPublished ? 'Published' : 'Draft'}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigate('/admin/projects')}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl border border-pn-purple/30 text-gray-400 hover:text-white hover:border-pn-purple/60 transition-all duration-200 font-medium text-sm text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 sm:flex-initial px-8 py-3 rounded-xl bg-gradient-to-r from-pn-purple to-pn-lavender text-pn-darkest font-bold text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 shadow-pn-glow text-center"
              >
                {saving ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
