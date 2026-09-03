// Updated CardDetails.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "../styles/CardDetails.css";
import Footer from './Footer';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://tools-website-m58b.vercel.app';

const CardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we have an ID in params, fetch from API
    if (id) {
      const fetchProject = async () => {
        try {
          const res = await fetch(`${API_BASE}/api/projects/${id}`);
          if (!res.ok) throw new Error('Project not found');
          const data = await res.json();
          setProject(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    } else if (location.state) {
      // Fallback: use state passed from Card navigation
      setProject(location.state);
      setLoading(false);
    } else {
      setError('No project data available.');
      setLoading(false);
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className='tool-container loading-state'>
        <div className="details-loader">
          <div className="spinner"></div>
          <p>Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className='tool-container error-state'>
        <div className="error-box">
          <h2>{error || 'Project not found.'}</h2>
          <button className="visit-now-btn" onClick={() => navigate('/strategies')}>
            ← Back to Strategies
          </button>
        </div>
      </div>
    );
  }

  const { title, createdTime, description, tags, trades, drawdown, minCapital, contributors, params, video, gitlink, type } = project;

  const normalizedTitle = (title || '').toLowerCase();
  const isStrategy = type === 'strategy' || normalizedTitle.includes('xauusd') || normalizedTitle.includes('ipo breakout strategy');

  const githubUrl = gitlink || null;
  const liveUrl = project.liveLink || project.live_link || null;

  // Normalize params — handle both {key: value} and {key, value} formats
  const normalizedParams = (params || []).map((param) => {
    if (param && param.key !== undefined) {
      return { key: param.key, value: param.value };
    }
    if (param && typeof param === 'object') {
      const [key, value] = Object.entries(param)[0] || ['', ''];
      return { key, value };
    }
    return { key: String(param), value: '' };
  });

  return (
    <div className='tool-container'>
      <div className="details-main-wrapper">
        {/* Top Bar / Breadcrumb */}
        <div className="details-top-bar">
          <button
            className="details-back-btn"
            onClick={() => navigate(isStrategy ? '/strategies' : '/tools')}
          >
            <span>←</span> Back to {isStrategy ? 'Strategies' : 'Tools'}
          </button>
          <div className={`details-type-pill ${isStrategy ? 'pill-strategy' : 'pill-tool'}`}>
            {isStrategy ? 'Quantitative Strategy' : 'Trading & Analytics Tool'}
          </div>
        </div>

        {/* Hero Card - ONLY ONE VISIT NOW BUTTON AT TOP */}
        <div className="details-hero-card">
          <div className="details-hero-content">
            <h1 className="details-title">{title}</h1>

            <div className="details-meta-row">
              {createdTime && (
                <div className="details-date">
                  <span className="meta-icon">📅</span> Created: <strong>{createdTime}</strong>
                </div>
              )}
              {contributors && contributors.length > 0 && (
                <div className="details-contributors">
                  <span className="contrib-label">Authors:</span>
                  <div className="contrib-chips">
                    {contributors.map((name, idx) => (
                      <span key={idx} className="contrib-pill">
                        <span className="contrib-dot" />
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {(liveUrl || githubUrl) && (
            <div className="details-hero-action">
              <button
                className="visit-now-btn"
                onClick={() => window.open(liveUrl || githubUrl, "_blank")}
              >
                Visit Now <span>↗</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Section: Description + Tags Sidebar */}
        <div className="details-content-grid">
          {/* About Column */}
          <div className="details-about-card">
            <div className="section-badge">
              {isStrategy ? 'STRATEGY OVERVIEW' : 'TOOL OVERVIEW'}
            </div>
            <h2 className="section-heading">
              About <span className="highlight-accent">{isStrategy ? 'Strategy' : 'Tool'}</span>
            </h2>
            {description ? (
              <p className="details-description">
                {description}
              </p>
            ) : (
              <p className="details-description" style={{opacity: 0.5, fontStyle: 'italic'}}>
                No description provided.
              </p>
            )}
          </div>

          {/* Sidebar: Tags & Info (NO second Visit Now button) */}
          <div className="details-sidebar">
            {tags && tags.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-badge">TAXONOMY</div>
                <h3 className="sidebar-title">Tags & Classification</h3>
                <div className="details-tags-list">
                  {tags.map((tag, index) => (
                    <span key={index} className="details-tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="sidebar-card">
              <div className="sidebar-badge">INFORMATION</div>
              <h3 className="sidebar-title">Project Overview</h3>
              <p className="sidebar-desc">
                Review the core methodology, algorithmic parameters, and execution demonstration.
                Use the dedicated links below to access the repository and live deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Parameters (if available) - NO redundant button */}
        {normalizedParams.length > 0 && (
          <div className="details-params-card">
            <div className="section-badge">METRICS & BACKTESTING</div>
            <h2 className="section-heading">
              Performance <span className="highlight-accent">Parameters</span>
            </h2>
            <div className="params-grid">
              {normalizedParams.map((param, index) => (
                <div key={index} className="param-tile">
                  <span className="param-key">{param.key}</span>
                  <span className="param-val">{param.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Demonstration Section */}
        {video && (
          <div className="details-demo-card">
            <div className="section-badge">DEMONSTRATION</div>
            <h2 className="section-heading">
              Watch the <span className="highlight-accent">Demonstration</span>
            </h2>
            <div className="iframe-wrapper">
              <iframe
                src={video.replace(/watch\?v=([^&]+).*/, "embed/$1")}
                allowFullScreen
                title="Demo Video"
              ></iframe>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BUTTONS: GitHub Link + Live Deployment */}
        {(githubUrl || liveUrl) && (
          <div className="details-bottom-actions">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bottom-action-btn github-btn"
              >
                <FaGithub className="btn-icon" />
                <span>GitHub Repository</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bottom-action-btn live-btn"
              >
                <FaExternalLinkAlt className="btn-icon" />
                <span>Live Deployment</span>
              </a>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CardDetails;


