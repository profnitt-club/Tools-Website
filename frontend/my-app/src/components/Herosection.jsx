import React from "react";
import "../styles/HeroSection.css";
import { useNavigate } from "react-router-dom";
import bullImage from "../assets/BullImage.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/strategies`);
  };
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="title">
          Prof<span className="highlight">NITT</span> Tools
        </div>
        <div className="sub-title">By Finance & Investment Club of NIT Trichy</div>

        <div className="button-container">
          <button className="use-tools-btn" onClick={handleClick}>Explore Strategies</button>
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
