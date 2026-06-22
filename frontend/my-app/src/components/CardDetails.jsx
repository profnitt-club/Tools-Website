// Updated CardDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/CardDetails.css";
import logo from "../assets/logo.png";
import Footer from './Footer';

const API_BASE = import.meta.env.VITE_API_BASE || '';

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
      <div className='tool-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{ color: '#e84d9a', fontSize: '2rem' }}>Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className='tool-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', gap: '20px' }}>
        <div style={{ color: '#e84d9a', fontSize: '1.5rem' }}>{error || 'Project not found.'}</div>
        <button className="get-linkofProject" onClick={() => navigate('/strategies')}>Back to Strategies</button>
      </div>
    );
  }

  const { title, createdTime, description, tags, trades, drawdown, minCapital, contributors, params, video, gitlink } = project;

  // Normalize params — handle both {key: value} and {key, value} formats
  const normalizedParams = (params || []).map((param) => {
    if (param.key !== undefined) {
      return { key: param.key, value: param.value };
    }
    const [key, value] = Object.entries(param)[0] || ['', ''];
    return { key, value };
  });

  return (
    <div className='tool-container'>
        <div className='tool-title'>
            {title}
        </div>
        <div className='contributors'>
          {
            (contributors || []).map((name, idx) => (
              <div key={idx} className='contributor'><div className='dot'/>{name}</div>
            ))
          }
        </div>

        <div className='about-strategy'>
          <div className='tool-description'>
            <h1 className='ab'>
              About<span className="highlight"><br></br>Strategy</span>
            </h1>

            <p className='desc'>
              {description}
            </p>
          </div>

          <div className='tagbox'>
            <h1>TAGS</h1>
            <div className='tool-tags'>
                {(tags || []).map((tag, index) => (
                  <span key={index} className="tool-tag">{tag}</span>
                ))}
            </div>
          </div>
        </div>

        {normalizedParams.length > 0 && (
          <div className='performance-params'>
            <div className='perf-title'>Performance Parameters</div>
            <div className='params'>
              {normalizedParams.map((param, index) => (
                <span key={index} className="tool-tag">{param.key}: {param.value}</span>
              ))}
            </div>
            {gitlink && (
              <button className="get-linkofProject" onClick={() => window.open(gitlink, "_blank")}>Get Link</button>
            )}
          </div>
        )}

        {!normalizedParams.length && gitlink && (
          <div className='performance-params'>
            <button className="get-linkofProject" onClick={() => window.open(gitlink, "_blank")}>Get Link</button>
          </div>
        )}

        <div className='demo'>
          <div className='demo-title'>Watch the Demonstration!!</div>
              {video ? (
                <iframe
                  src={video.replace(/watch\?v=([^&]+).*/, "embed/$1")}
                  allowFullScreen
                  title="Demo Video"
                ></iframe>
              ) : (
                <p className='desc'>No video available</p>
              )}
        </div>
        <Footer/>
    </div>
  );
};

export default CardDetails;
