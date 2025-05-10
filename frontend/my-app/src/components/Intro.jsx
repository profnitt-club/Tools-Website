import React from 'react'
import "../styles/intro.css"
import { useNavigate } from "react-router-dom";
import introImage from "../assets/img_iphones.svg";

const Intro = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
      navigate(`/strategies`);
    };
    return (
        <div id="about" className="intro-container">
          <div className="content-wrapper">
            {/* Left Section */}
            <div className="text-section">
              <div className="main-title">INTRODUCTION</div>
              <h2 className="subtitle">TO ProfNITT Tools</h2>
              <div className="button-container">
                <button className="use-tools-btn" onClick={handleClick}>Explore Strategies</button>
                <span className="arrow">→</span>
              </div>
            </div>

            <p className="description">
                Explore the world of quantitative finance with ease! Test cutting-edge
                trading strategies on live markets and get detailed insights,
                including capital requirements for each approach. Empower your
                investment decisions with our user-friendly platform. Start your
                journey toward smarter trading today!
              </p>

            {/* Phones */}
            <div className="image-container">
              <img
                src={introImage}
                alt="ProfNITT Tools preview"
                className="phone-image"
              />
            </div>

            {/* Right Section */}
            <div className="about-card">
              <div className="about-card-content">
                <h2 className="about-card-title">ABOUT US</h2>
                <h3 className="about-card-subtitle">ProfNITT Club of NIT Trichy</h3>
                <p className="about-card-description">
                  "ProfNITT Club, NIT Trichy, is a hub for innovation in quantitative
                  finance and technology. Our mission is to bridge the gap between
                  theory and real-world application by developing impactful projects
                  that empower users to explore live market strategies. Through
                  hands-on learning and cutting-edge tools, we aim to make a lasting
                  impact in the financial technology space while nurturing the next
                  generation of finance and tech leaders."
                </p>
                <br></br>
                <button className="about-cta-button" onClick={() => window.open("https://profnitt.in", "_blank")}>
                  LET’S GET IN TOUCH
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Intro