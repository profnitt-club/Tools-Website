// Updated CardDetails.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
      <div className="flex flex-col gap-y-[30px] md:gap-y-[50px] bg-pn-bg w-full min-h-screen relative overflow-x-hidden pt-2.5 md:pt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{ color: '#e84d9a', fontSize: '2rem' }}>Loading...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col gap-y-[30px] md:gap-y-[50px] bg-pn-bg w-full min-h-screen relative overflow-x-hidden pt-2.5 md:pt-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', gap: '20px' }}>
        <div style={{ color: '#e84d9a', fontSize: '1.5rem' }}>{error || 'Project not found.'}</div>
        <button className="mt-[2%] bg-gradient-to-r from-pn-purple to-pn-lavender w-full max-w-[160px] md:max-w-[180px] lg:max-w-[200px] self-center text-black border-none rounded-[30px] px-3.5 py-2.5 md:px-4 md:py-3 text-[0.85rem] md:text-[0.9rem] lg:text-[1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90" onClick={() => navigate('/strategies')}>Back to Strategies</button>
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
    <div className="flex flex-col gap-y-[30px] md:gap-y-[50px] bg-pn-bg w-full min-h-screen relative overflow-x-hidden pt-2.5 md:pt-5">
        <div className="bg-[#211e2b] self-center font-sans text-[1.4rem] md:text-[1.8rem] lg:text-[2.5rem] xl:text-[3rem] font-bold text-white border-2 border-[#DF53BB] shadow-[0_0_7px_#DF53BB] rounded-[30px] p-2.5 md:p-3 lg:p-5 text-center w-[90%] lg:w-[80%] max-w-[600px]">
            {title}
        </div>
        <div className="text-white text-[0.9rem] sm:text-[1rem] flex flex-wrap justify-center gap-5 text-center">
          {
            (contributors || []).map((name, idx) => (
              <div key={idx} className="font-poppins text-[0.9rem] sm:text-[1rem] flex items-center gap-2"><div className="w-[10px] h-[10px] bg-[#e34ba9] rounded-full"/>{name}</div>
            ))
          }
        </div>

        <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center lg:items-start gap-10 m-5 text-center lg:text-left">
          <div className="flex flex-col text-left max-w-[90%] lg:max-w-[600px] mx-auto lg:mx-0">
            <h1 className="text-white text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem]">
              About<span className="highlight"><br></br>Strategy</span>
            </h1>

            <p className="text-white text-[0.95rem] md:text-[1rem] font-poppins mt-2">
              {description}
            </p>
          </div>

          <div className="bg-[#211e2b] flex flex-col font-poppins font-bold border-[3px] border-pn-purple shadow-[0_0_10px_#a18cd1] rounded-[30px] p-2.5 md:p-[15px] w-[90%] lg:w-[90%] max-w-[400px] text-center text-white mx-auto lg:mx-0">
            <h1>TAGS</h1>
            <div className="flex flex-wrap justify-center gap-2.5 mt-2">
                {(tags || []).map((tag, index) => (
                  <span key={index} className="font-bold font-poppins text-[#faebd7] bg-pn-tag px-2.5 py-1 md:px-[15px] md:py-[5px] rounded-[5px] text-[0.85rem] md:text-[1rem] max-w-full break-words text-center">{tag}</span>
                ))}
            </div>
          </div>
        </div>

        {normalizedParams.length > 0 && (
          <div className="bg-[#211e2b] flex flex-col items-center border-[3px] border-pn-purple shadow-[0_0_10px_#a18cd1] rounded-[30px] p-5 md:p-[50px] w-[95%] md:w-[90%] max-w-[800px] mx-auto overflow-hidden box-border">
            <div className="text-white text-[1.2rem] md:text-[1.8rem] lg:text-[2rem] font-poppins font-bold text-center">Performance Parameters</div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 lg:gap-[15px] p-5 max-w-full box-border overflow-hidden">
              {normalizedParams.map((param, index) => (
                <span key={index} className="font-bold font-poppins text-[#faebd7] bg-pn-tag px-2.5 py-1 md:px-[15px] md:py-[5px] rounded-[5px] text-[0.85rem] md:text-[1rem] max-w-full break-words text-center">{param.key}: {param.value}</span>
              ))}
            </div>
            {gitlink && (
              <button className="mt-[2%] bg-gradient-to-r from-pn-purple to-pn-lavender w-full max-w-[160px] md:max-w-[180px] lg:max-w-[200px] self-center text-black border-none rounded-[30px] px-3.5 py-2.5 md:px-4 md:py-3 text-[0.85rem] md:text-[0.9rem] lg:text-[1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90" onClick={() => window.open(gitlink, "_blank")}>Get Link</button>
            )}
          </div>
        )}

        {!normalizedParams.length && gitlink && (
          <div className="bg-[#211e2b] flex flex-col items-center border-[3px] border-pn-purple shadow-[0_0_10px_#a18cd1] rounded-[30px] p-5 md:p-[50px] w-[95%] md:w-[90%] max-w-[800px] mx-auto overflow-hidden box-border">
            <button className="mt-[2%] bg-gradient-to-r from-pn-purple to-pn-lavender w-full max-w-[160px] md:max-w-[180px] lg:max-w-[200px] self-center text-black border-none rounded-[30px] px-3.5 py-2.5 md:px-4 md:py-3 text-[0.85rem] md:text-[0.9rem] lg:text-[1rem] font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90" onClick={() => window.open(gitlink, "_blank")}>Get Link</button>
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="text-[1.2rem] md:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] font-bold text-[#DF53BB] text-center my-5">Watch the Demonstration!!</div>
              {video ? (
                <iframe
                  src={video.replace(/watch\?v=([^&]+).*/, "embed/$1")}
                  allowFullScreen
                  title="Demo Video"
                  className="w-[90%] max-w-[800px] h-[220px] md:h-[280px] lg:h-[400px] border-[3px] border-[#a637b4] shadow-[0_0_10px_#d811cb] rounded-[30px]"
                ></iframe>
              ) : (
                <p className="text-white text-[0.95rem] md:text-[1rem] font-poppins mt-2">No video available</p>
              )}
        </div>
        <Footer/>
    </div>
  );
};

export default CardDetails;
