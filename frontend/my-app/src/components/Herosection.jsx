import React from "react";
import "../styles/HeroSection.css";
import { useNavigate } from "react-router-dom";
import bullImage from "../assets/BullImage.png";
import { FaChartLine, FaShieldAlt } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStrategiesClick = () => {
    navigate(`/strategies`);
  };

  const handleToolsClick = () => {
    navigate(`/tools`);
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" /> QUANTITATIVE RESEARCH PLATFORM
          </div>
          <h1 className="title">
            Prof<span className="highlight">NITT</span> Tools
          </h1>
          <p className="sub-title">
            Empowering quantitative traders, researchers, and financial enthusiasts at NIT Trichy with production-ready backtested strategies and analytics tools.
          </p>

          <div className="button-container">
            <button className="use-tools-btn" onClick={handleStrategiesClick}>
              Explore Strategies <span>→</span>
            </button>
            <button className="explore-tools-secondary-btn" onClick={handleToolsClick}>
              View Tools <span>🛠️</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Backtested Models</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat-item">
              <span className="stat-value">Open Source</span>
              <span className="stat-label">Community Driven</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat-item">
              <span className="stat-value">NIT Trichy</span>
              <span className="stat-label">Finance & Investment</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-glow-effect" />
          <div className="hero-image">
            <img src={bullImage} alt="Bull Market Quantitative Tools" />
          </div>

          {/* Floating Feature Badges around the Bull */}
          <div className="floating-badge badge-top-right">
            <div className="floating-icon"><FaChartLine /></div>
            <div>
              <p className="floating-title">Algorithmic Backtests</p>
              <p className="floating-sub">Risk & Return Metrics</p>
            </div>
          </div>

          <div className="floating-badge badge-bottom-left">
            <div className="floating-icon"><FaShieldAlt /></div>
            <div>
              <p className="floating-title">Verified Strategies</p>
              <p className="floating-sub">Market Neutral & Trend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
