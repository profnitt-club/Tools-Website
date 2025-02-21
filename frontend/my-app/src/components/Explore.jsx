import React from 'react'
import "../styles/explore.css"
import { useNavigate } from 'react-router-dom'
import down from "../assets/down.svg"
import right from "../assets/rightarrow.svg"


const Explore = () => {
  const navigate = useNavigate();
    
    const handleClick = () => {
      navigate(`/strategies`);
    };
  return (
    <div id="tools" className="how-to-trade">
      {/* Header Section */}
      <div className="trade-header">
        <div className="trade-title">Empowering innovation in quantitative finance</div>
        <h2 className="trade-subtitle">BY ProfNITT</h2>
        <div className="scroll-indicator">
          <span className="arrow-down"><img src={down}></img></span>
        </div>
      </div>

      {/* How to Trade Section */}
      <div className="trade-instructions">
        <div className='instructions-text-container'>
          <div className="instructions-header">
            <div className="instructions-title">HOW TO TRADE</div>
            <h2 className="instructions-subtitle">WITH ProfNITT Tools?</h2>
            <div className="button-container">
                <button className="use-tools-btn" onClick={handleClick}>Explore Strategies</button>
                <span className="arrow">→</span>
            </div>
          </div>
          
          <div className="instructions-description">
            Using ProfNITT tools is simple and intuitive. Start by exploring or uploading your quant
            strategies, then customize parameters for testing. Run your strategies in live markets
            and analyze detailed performance reports. Refine and optimize based on insights to
            enhance your trading outcomes.
          </div>
        </div>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-circle">01</div>
            <p className="step-label">Explore Strategies</p>
          </div>
          <div className="step">
            <div className="step-circle">02</div>
            <p className="step-label">Set Parameters</p>
          </div>
          <div className="step">
            <div className="step-circle">03</div>
            <p className="step-label">Test on Live Markets</p>
          </div>
          <div className="step">
            <div className="step-circle">04</div>
            <p className="step-label">Analyze Results</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore