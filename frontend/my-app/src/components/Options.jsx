import React from 'react'
import "../styles/options.css"
import liveMarket from "../assets/liveMarket.png"
import metrics from "../assets/metrics.png"
import capital from "../assets/capital.png"
import userFriendly from "../assets/user-friendly.png"

const Options = () => {
    const features = [
        {
          title: "Live Market Testing",
          description:
            "Experiment with advanced quant strategies directly on live markets to see real-time results.",
          image: liveMarket,
        },
        {
          title: "Capital Insights",
          description:
            "Understand the capital needed for each strategy, tailored for smarter financial planning.",
          image: capital,
        },
        {
          title: "Performance Metrics",
          description:
            "Access comprehensive reports to evaluate strategy performance and optimize outcomes.",
          image: metrics,
        },
        {
          title: "User-Friendly Interface",
          description:
            "Enjoy a seamless, intuitive platform designed for both beginners and experts in finance.",
          image: userFriendly,
        },
      ];
    
      return (
        <div id="services" className="profnitt-features-container">
          <div className="profnitt-content-wrapper">
            <div className="profnitt-header-section">
              <h1 className="profnitt-main-title">What You Get With</h1>
              <h2 className="profnitt-sub-title">ProfNITT Tools?</h2>
              <p className="profnitt-description">
                With ProfNITT tools, you gain access to powerful quantitative finance strategies that
                you can test on live markets. Our platform provides detailed insights, including
                performance metrics and capital requirements, helping you make informed decisions.
                Whether you're an aspiring quant or a seasoned investor, ProfNITT tools empower you to
                explore, analyze, and optimize trading strategies with ease.
              </p>
            </div>
    
            <div className="profnitt-features-grid">
              {features.map((feature, index) => (
                <div key={index} className="profnitt-feature-card">
                  <div className="profnitt-image-container">
                    <img src={feature.image} alt={feature.title} className="profnitt-feature-image" />
                  </div>
                  <h3 className="profnitt-feature-title">{feature.title}</h3>
                  <p className="profnitt-feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="profnitt-cta-button">TRY IT NOW</button>
        </div>
      );
}

export default Options