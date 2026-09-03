import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import "../styles/Strategies.css";
import Footer from './Footer';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://tools-website-m58b.vercel.app';

// Helper to identify if an item is a strategy
export const isStrategyProject = (project) => {
  if (!project) return false;
  if (project.type === 'strategy') return true;
  if (project.type === 'tool') return false;
  const title = (project.title || '').toLowerCase();
  return title.includes('xauusd') || title.includes('ipo breakout strategy');
};

const Strategies = ({ defaultType }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from prop or current pathname
  const initialTab =
    defaultType || (location.pathname.includes('/tools') ? 'tools' : 'strategies');
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync active tab with route
  useEffect(() => {
    if (location.pathname.includes('/tools')) {
      setActiveTab('tools');
    } else if (location.pathname.includes('/strategies')) {
      setActiveTab('strategies');
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'tools' ? '/tools' : '/strategies');
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
        // Fallback data if API fails
        setCards([
          {
            id: 1,
            type: "strategy",
            createdTime: "10 Feb 2025",
            title: "5 Minutes XAUUSD Strategy",
            description: `This project implements and backtests an RSI-EMA-based trading strategy for the XAU/USD (Gold/USD) forex pair using the Backtesting.py library. The strategy is designed to identify optimal entry and exit points based on Relative Strength Index (RSI) and Exponential Moving Average (EMA) conditions.`,
            tags: ["RSI", "MACD", "EMA", "FOREX", "MarketNeutral", "Directional", "Bullish", "Bearish"],
            trades: "846",
            drawdown: "-25%",
            minCapital: "₹30K",
            winRate: "51%",
            returns: "708.77",
            monthlyFee: "Free +5%",
            contributors: ["Shiwang Upadhyay", "Siddhant Mishra", "Pratyush Arya"],
            params: [{"Sharpe Ratio":"0.000469"},{"Win Rate":"51%"},{"Total Trades":"846"}],
            video: "",
            gitlink: "https://github.com/shiwangupadhyay/5_min_XAUUSD_strategy",
          },
          {
            id: 3,
            type: "strategy",
            createdTime: "1 Feb 2025",
            title: "IPO Breakout Strategy: A Data-Driven Approach",
            description: `This strategy successfully identifies IPO breakout patterns and predicts their sustainability. By leveraging data-driven breakout detection and machine learning, traders can make informed decisions.`,
            tags: ["SMA", "ATR", "RSI", "IPO", "Breakout", "Volatility", "DownTrend", "Reversal"],
            trades: "234 (₹3.6K)",
            drawdown: "₹11.6K (5%)",
            minCapital: "₹10k",
            winRate: "42%",
            monthlyFee: "Free +5%",
            returns: "431.32",
            contributors: ["Ujjwal Sinha", "Amey Munmane"],
            params: [{"Sharpe Ratio":"1.84"},{"Win Rate":"42%"},{"Total Trades":"150"}],
            video: "",
            gitlink: "https://github.com/shiwangupadhyay/5_min_XAUUSD_strategy",
          },
          {
            id: 2,
            type: "tool",
            createdTime: "23 Dec 2024",
            title: "RSI Screener",
            description: `This project is a Forex trading tool built using Streamlit that helps traders identify potential buy and sell opportunities by analyzing the Relative Strength Index (RSI) of various forex pairs across different timeframes.`,
            tags: ["FOREX", "RSI", "Volatility", "ExpertTrade"],
            trades: "",
            drawdown: "",
            minCapital: "",
            winRate: "",
            returns: "",
            monthlyFee: "Free +5%",
            contributors: ["Shiwang Upadhyay", "Siddhant Mishra", "Pratyush Arya"],
            params: [],
            video: "",
            gitlink: "https://github.com/shiwangupadhyay/RSI-Screener",
          },
          {
            id: 10,
            type: "tool",
            createdTime: "5 Aug 2026",
            title: "Sentra",
            description: "AI-driven financial analysis platform designed to transform complex market data into actionable insights.",
            tags: ["AI", "ETL", "Sentiment", "Quant Hub"],
            trades: "",
            drawdown: "",
            minCapital: "",
            winRate: "",
            returns: "",
            contributors: ["ProfNITT"],
            params: [],
            gitlink: "",
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter cards: first by activeTab (Strategies vs Tools), then by searchQuery
  const tabCards = cards.filter((card) => {
    const isStrat = isStrategyProject(card);
    return activeTab === 'strategies' ? isStrat : !isStrat;
  });

  const filteredCards = tabCards.filter((card) =>
    (card.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (card.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (card.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="main-container">
      {/* Page Header */}
      <div className="profnitt-view-header">
        <h1 className="profnitt-view-title">
          {activeTab === 'strategies' ? (
            <>Quantitative <span className="highlight-cherry">Strategies</span></>
          ) : (
            <>Trading & Analytics <span className="highlight-cherry">Tools</span></>
          )}
        </h1>
        <p className="profnitt-view-subtitle">
          {activeTab === 'strategies'
            ? "Battle-tested quantitative trading strategies with performance metrics and execution insights."
            : "Analytical screeners, portfolio optimizers, and automated data pipelines designed for modern quant finance."}
        </p>
      </div>

      {/* Tab Switcher & Search Bar */}
      <div className="search-and-tabs-wrapper">
        <div className="category-tabs">
          <button
            className={`tab-btn ${activeTab === 'strategies' ? 'active-tab' : ''}`}
            onClick={() => handleTabChange('strategies')}
          >
            Strategies ({cards.filter(isStrategyProject).length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'tools' ? 'active-tab' : ''}`}
            onClick={() => handleTabChange('tools')}
          >
            Tools ({cards.filter(c => !isStrategyProject(c)).length})
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search"
            placeholder={activeTab === 'strategies' ? "Search Strategies by name, tag..." : "Search Tools by name, tag..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Cards List */}
      <div className="strategy-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#e84d9a', fontSize: '1.5rem', fontFamily: 'Poppins' }}>
            Loading {activeTab === 'strategies' ? 'strategies' : 'tools'}...
          </div>
        ) : filteredCards.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8', fontSize: '1.1rem', fontFamily: 'Poppins' }}>
            No {activeTab === 'strategies' ? 'strategies' : 'tools'} found matching "{searchQuery}".
          </div>
        ) : (
          <div className="card-list">
            {filteredCards.map((card, index) => (
              <Card key={card.id || index} {...card} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Strategies;

