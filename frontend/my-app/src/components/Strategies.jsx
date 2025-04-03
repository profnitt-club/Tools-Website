import React, { useState } from 'react';
import Card from './Card';
import "../styles/Strategies.css";
import logo from "../assets/logo.png";
import { FaSearchDollar } from "react-icons/fa";

const Strategies = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const cards = [
    {
      createdTime: "10 Feb 2025",
      title: "5 Minutes XAUUSD Strategy",
      description: `This project implements and backtests an RSI-EMA-based trading strategy for the XAU/USD (Gold/USD) 
      forex pair using the Backtesting.py library. The strategy is designed to identify optimal entry and exit points 
      based on Relative Strength Index (RSI) and Exponential Moving Average (EMA) conditions. The backtesting process 
      evaluates various parameter combinations to find the most profitable configuration.`,
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
      createdTime: "23 Dec 2024",
      title: "RSI Screener",
      description: `This project is a Forex trading tool built using Streamlit that helps traders identify potential buy and sell opportunities by analyzing the Relative Strength Index (RSI) of various forex pairs across different timeframes (5 minutes, 15 minutes, 1 hour, 1 day). The app 
      retrieves live forex data for over 25 currency pairs from Yahoo Finance and calculates their RSI values using a 14-period 
      window.`,
      tags: ["FOREX", "RSI", "Volatility", "ExpertTrade"],
      trades: "458 (₹9.2K)",
      drawdown: "N/A",
      minCapital: "N/A",
      winRate: "N/A",
      returns: "N/A",
      monthlyFee: "Free +5%",
      contributors: ["Shiwang Upadhyay", "Siddhant Mishra", "Pratyush Arya"],
      params: [{"Sharpe Ratio":"3.85"},{"Win Rate":"72%"},{"Total Trades":"100"},
        {"Total Winning Trades":"72%"}, {"Total Loosing Trades":"28"}, {"Max Drawdown":"3.5"}
      ],
      video:"",
      gitlink:"https://github.com/shiwangupadhyay/RSI-Screener",
    },
    {
      createdTime: "1 Feb 2025",
      title: "IPO Breakout Strategy: A Data-Driven Approach",
      description: `This strategy successfully identifies IPO breakout patterns and predicts their sustainability. 
      By leveraging data-driven breakout detection and machine learning, traders can make informed decisions and improve
      IPO trading success rates. Using this tool traders can automate their trading in IPO stocks.`,
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
  ];

  // Filter cards based on search query
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="main-container">
      {/* Search Bar */}
      <div className="search-bar">
  <input
    type="text"
    className="search"
    placeholder="Search Strategies..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

      {/* Cards */}
      <div className="strategy-container">
        <div className="card-list">
          {filteredCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Strategies;
