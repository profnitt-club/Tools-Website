import React from 'react'
import "../styles/explore.css"
import down from "../assets/down.svg"
import right from "../assets/rightarrow.svg"


const Explore = () => {
  return (
    <div id="tools" className="how-to-trade">
      {/* Header Section */}
      <div className="trade-header">
        <h1 className="trade-title">Empowering innovation in quantitative finance</h1>
        <h2 className="trade-subtitle">BY ProfNITT.</h2>
        <div className="scroll-indicator">
          <span className="arrow-down"><img src={down}></img></span>
        </div>
      </div>

      {/* How to Trade Section */}
      <div className="trade-instructions">
        <div className='instructions-text-container'>
          <div className="instructions-header">
            <h3 className="instructions-title">HOW TO TRADE</h3>
            <p className="instructions-subtitle">WITH ProfNITT Tools?
              <img src={right} class="rightArrow"></img>
            </p>
          </div>
          
          <p className="instructions-description">
            Using ProfNITT tools is simple and intuitive. Start by exploring or uploading your quant
            strategies, then customize parameters for testing. Run your strategies in live markets
            and analyze detailed performance reports. Refine and optimize based on insights to
            enhance your trading outcomes.
          </p>
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