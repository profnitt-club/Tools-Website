import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StrategiesTools.css";

const strategiesData = [
  {
    id: "momentum",
    badge: "Trend Following",
    category: "Forex & Crypto",
    title: "RSI-EMA Momentum Strategy",
    description:
      "Captures directional market momentum by coupling Relative Strength Index (RSI) momentum filters with Exponential Moving Average (EMA) crossovers for high-probability entries.",
    tools: ["Backtesting.py", "Python", "TA-Lib"],
    icon: "📈",
  },
  {
    id: "screener",
    badge: "Market Scanner",
    category: "Forex",
    title: "Multi-Timeframe RSI Screener",
    description:
      "Scans dozens of currency pairs in real time across multiple time horizons, isolating overbought and oversold divergences to flag impending price reversals.",
    tools: ["Streamlit", "yfinance", "Plotly"],
    icon: "🔍",
  },
  {
    id: "breakout",
    badge: "Machine Learning",
    category: "Equities",
    title: "IPO Breakout & Volume Profile",
    description:
      "Detects aggressive price and volume expansion patterns in early listing phases, utilizing supervised machine learning to forecast breakout sustainability.",
    tools: ["Pandas", "Scikit-learn", "NumPy"],
    icon: "🚀",
  },
  {
    id: "stat-arb",
    badge: "Market Neutral",
    category: "Statistical",
    title: "Statistical Arbitrage & Pairs",
    description:
      "Identifies cointegrated asset pairs and models mean-reverting spread divergences, capturing alpha while hedging out broad directional market exposure.",
    tools: ["VectorBT", "Statsmodels", "Matplotlib"],
    icon: "⚖️",
  },
];

const StrategiesTools = () => {
  const navigate = useNavigate();

  const handleExplore = (targetPath) => {
    navigate(targetPath || "/strategies");
  };

  return (
    <section id="strategies-tools" className="strat-tools-section">
      <div className="strat-tools-container">
        {/* Section Header */}
        <div className="strat-tools-header">
          <span className="strat-tools-tag">QUANTITATIVE FRAMEWORKS</span>
          <h2 className="strat-tools-title">
            Strategies <span className="highlight-cherry">&</span> Tools
          </h2>
          <p className="strat-tools-subtitle">
            Explore battle-tested algorithmic trading methodologies paired with the industry-standard
            computational tools and libraries powering their implementation.
          </p>
        </div>

        {/* Card Grid */}
        <div className="strat-tools-grid">
          {strategiesData.map((item) => (
            <div key={item.id} className="strat-card">
              <div className="strat-card-top">
                <div className="strat-card-icon">{item.icon}</div>
                <span className="strat-badge">{item.badge}</span>
              </div>

              <div className="strat-category">{item.category}</div>
              <h3 className="strat-card-title">{item.title}</h3>
              <p className="strat-card-desc">{item.description}</p>

              <div className="strat-tools-used">
                <div className="strat-tools-label">Tools & Stack:</div>
                <div className="strat-tools-tags">
                  {item.tools.map((tool, idx) => (
                    <span key={idx} className="strat-tool-pill">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="strat-card-btn"
                onClick={() => handleExplore(item.id === "screener" ? "/tools" : "/strategies")}
              >
                {item.id === "screener" ? "Explore Tool" : "Explore Strategy"} <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default StrategiesTools;
