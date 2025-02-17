import React from "react";
import "../styles/HeroSection.css";
import bullImage from "../assets/BullImage.png";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>
          Prof<span className="highlight">NITT</span> Tools
        </h1>
        <h2>By</h2>
        <h2>Finance & Investment Club of NIT Trichy</h2>

        <div className="button-container">
          <button className="use-tools-btn" onClick={() => window.location.href = "/strategies"}>USE TOOLS</button>
          <span className="arrow">→</span>
        </div>
      </div>

      <div className="hero-image">
        <img src={bullImage} alt="Bull Market" />
      </div>
    </div>
  );
};

export default HeroSection;
