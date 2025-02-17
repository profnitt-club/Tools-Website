// Updated CardDetails.js
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CardDetails.css";
import logo from "../assets/logo.png";
import Footer from './Footer';

const CardDetails = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const { title, createdTime, description, tags, trades, drawdown, minCapital, contributors, params , video, gitlink} = location.state || {};
  /*if (!title) {
    return (<p>No card details available.</p>);
  }*/

  return (
    <div className='tool-container'>
        <div className='prof-header'>
            <a href="/"><img src={logo} className="profnitt-logo" alt="ProfNIT Logo" /></a>
        </div>
        <div className='tool-title'>
            {title}
        </div>
        <div className='contributors'>
          {
            contributors.map(name => (
              <div className='contributor'><div className='dot'/>{name}</div>
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
                {tags.map((tag, index) => (
                  <span key={index} className="tool-tag">{tag}</span>
                ))}
            </div>
          </div>
        </div>

        <div className='performance-params'>
          <div className='perf-title'>Performance Parameters</div>
          <div className='params'>
            {params.map((param, index) => {
              const [key, value] = Object.entries(param)[0]; // Extract the key-value pair from each object
              return (
                <span key={index} className="tool-tag">{key}: {value}</span>
              );
            })}
          </div>
          <button className="get-linkofProject" onClick={() => window.location.href = gitlink}>Get Link</button>
        </div>

        <div className='demo'>
          <div className='demo-title'>Watch the Demonstration!!</div>
              {video ? (
                <iframe
                  src={video.replace(/watch\?v=([^&]+).*/, "embed/$1")} // Auto-fixes YouTube URL
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
