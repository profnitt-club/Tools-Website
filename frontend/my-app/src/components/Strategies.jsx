import React, { useState, useEffect } from 'react';
import Card from './Card';
import logo from "../assets/logo.png";
import { FaSearchDollar } from "react-icons/fa";
import Footer from './Footer';

const API_BASE = import.meta.env.VITE_API_BASE || '';

const Strategies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load strategies.');
        // Fallback to hardcoded data if API fails
        setCards([
          {
            id: 1,
            createdTime: "10 Feb 2025",
            title: "5 Minutes XAUUSD Strategy",
            description: `This project implements and backtests an RSI-EMA-based trading strategy for the XAU/USD (Gold/USD) forex pair using the Backtesting.py library. The strategy is designed to identify optimal entry and exit points based on Relative Strength Index (RSI) and Exponential Moving Average (EMA) conditions.`,
            tags: ["RSI", "MACD","EMA","FOREX", "MarketNeutral", "Directional", "Bullish", "Bearish"],
            trades: "846",
            drawdown: "-25%",
            minCapital: "₹30K",
            winRate: "51%",
            returns: "708.77",
            monthlyFee: "Free +5%",
            contributors: ["Shiwang Upadhyay", "Siddhant Mishra", "Pratyush Arya"],
            params: [{"Sharpe Ratio":"0.000469"},{"Win Rate":"51%"},{"Total Trades":"846"},
              {"Final Equity":"80877.85"}, {"Return":"708.77"}, {"Max Drawdown":"-91.82"},{"worst Trade %":"-0.114"},
              {"Best Trade %":0.1183}
            ],
            video:"",
            gitlink:"https://github.com/shiwangupadhyay/5_min_XAUUSD_strategy",
          },
          {
            id: 2,
            createdTime: "23 Dec 2024",
            title: "RSI Screener",
            description: `This project is a Forex trading tool built using Streamlit that helps traders identify potential buy and sell opportunities by analyzing the Relative Strength Index (RSI) of various forex pairs across different timeframes.`,
            tags: ["FOREX", "RSI", "Volatility", "ExpertTrade"],
            trades: "458 (₹9.2K)",
            drawdown: "N/A",
            minCapital: "N/A",
            winRate: "N/A",
            returns: "N/A",
            monthlyFee: "Free +5%",
            contributors: ["Shiwang Upadhyay", "Siddhant Mishra", "Pratyush Arya"],
            params: [],
            video:"",
            gitlink:"https://github.com/shiwangupadhyay/RSI-Screener",
          },
          {
            id: 3,
            createdTime: "1 Feb 2025",
            title: "IPO Breakout Strategy: A Data-Driven Approach",
            description: `This strategy successfully identifies IPO breakout patterns and predicts their sustainability. By leveraging data-driven breakout detection and machine learning, traders can make informed decisions.`,
            tags: ["SMA","ATR","RSI","IPO", "Breakout", "Volatility", "DownTrend","Reversal"],
            trades: "234 (₹3.6K)",
            drawdown: "₹11.6K (5%)",
            minCapital: "₹10k",
            winRate: "42%",
            monthlyFee: "Free +5%",
            returns: "431.32",
            contributors: ["Ujjwal Sinha","Amey Munmane"],
            params: [{"Sharpe Ratio":"1.84"},{"Win Rate":"42%"},{"Total Trades":"150"},
              {"Total Winning Trades":"52%"}, {"Total Loosing Trades":"18"}, {"Max Drawdown":"2.5"}
            ],
            video:"",
            gitlink:"https://github.com/shiwangupadhyay/5_min_XAUUSD_strategy",
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter cards based on search query
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (card.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-[70px] bg-pn-bg w-full min-h-screen relative overflow-y-auto overflow-x-hidden">
      {/* Search Bar */}
      <div className="w-[75%] flex items-center justify-center mx-auto relative">
        <input
          type="text"
          className="mt-[50px] -mb-[30px] py-2 px-5 w-full outline-none border-[3px] border-pn-pink shadow-[0_0_5px_#e84d9a] rounded-[50px] bg-pn-card text-[#f0f8ff] text-lg font-bold capitalize"
          placeholder="Search Strategies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="w-full">
        {loading ? (
          <div className="text-center p-[50px] text-pn-pink text-[2rem]">
            Loading strategies...
          </div>
        ) : (
          <div className="w-[80%] mx-auto flex flex-col gap-5 pb-10">
            {filteredCards.map((card, index) => (
              <Card key={card.id || index} {...card} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-auto">
        <Footer/>
      </div>
    </div>
  );
};

export default Strategies;
