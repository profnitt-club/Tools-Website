/**
 * Seed the original 3 hardcoded strategies as projects in the database.
 * Run once: node utils/seedProjects.js
 */
require('dotenv').config();
const { pool, initDB } = require('../config/db');

const projects = [
  {
    title: '5 Minutes XAUUSD Strategy',
    description: `This project implements and backtests an RSI-EMA-based trading strategy for the XAU/USD (Gold/USD) forex pair using the Backtesting.py library. The strategy is designed to identify optimal entry and exit points based on Relative Strength Index (RSI) and Exponential Moving Average (EMA) conditions. The backtesting process evaluates various parameter combinations to find the most profitable configuration.`,
    created_time: '10 Feb 2025',
    tags: ['RSI', 'MACD', 'EMA', 'FOREX', 'MarketNeutral', 'Directional', 'Bullish', 'Bearish'],
    trades: '846',
    drawdown: '-25%',
    min_capital: '₹30K',
    win_rate: '51%',
    returns: '708.77',
    monthly_fee: 'Free +5%',
    contributors: ['Shiwang Upadhyay', 'Siddhant Mishra', 'Pratyush Arya'],
    params: [{"Sharpe Ratio":"0.000469"},{"Win Rate":"51%"},{"Total Trades":"846"},{"Final Equity":"80877.85"},{"Return":"708.77"},{"Max Drawdown":"-91.82"},{"worst Trade %":"-0.114"},{"Best Trade %":"0.1183"}],
    video: '',
    gitlink: 'https://github.com/shiwangupadhyay/5_min_XAUUSD_strategy',
  },
  {
    title: 'RSI Screener',
    description: `This project is a Forex trading tool built using Streamlit that helps traders identify potential buy and sell opportunities by analyzing the Relative Strength Index (RSI) of various forex pairs across different timeframes (5 minutes, 15 minutes, 1 hour, 1 day). The app retrieves live forex data for over 25 currency pairs from Yahoo Finance and calculates their RSI values using a 14-period window.`,
    created_time: '23 Dec 2024',
    tags: ['FOREX', 'RSI', 'Volatility', 'ExpertTrade'],
    trades: '458 (₹9.2K)',
    drawdown: 'N/A',
    min_capital: 'N/A',
    win_rate: 'N/A',
    returns: 'N/A',
    monthly_fee: 'Free +5%',
    contributors: ['Shiwang Upadhyay', 'Siddhant Mishra', 'Pratyush Arya'],
    params: [],
    video: '',
    gitlink: 'https://github.com/shiwangupadhyay/RSI-Screener',
  },
  {
    title: 'IPO Breakout Strategy: A Data-Driven Approach',
    description: `This strategy successfully identifies IPO breakout patterns and predicts their sustainability. By leveraging data-driven breakout detection and machine learning, traders can make informed decisions and improve IPO trading success rates. Using this tool traders can automate their trading in IPO stocks.`,
    created_time: '1 Feb 2025',
    tags: ['SMA', 'ATR', 'RSI', 'IPO', 'Breakout', 'Volatility', 'DownTrend', 'Reversal'],
    trades: '234 (₹3.6K)',
    drawdown: '₹11.6K (5%)',
    min_capital: '₹10k',
    win_rate: '42%',
    returns: '431.32',
    monthly_fee: 'Free +5%',
    contributors: ['Ujjwal Sinha', 'Amey Munmane'],
    params: [{"Sharpe Ratio":"1.84"},{"Win Rate":"42%"},{"Total Trades":"150"},{"Total Winning Trades":"52%"},{"Total Loosing Trades":"18"},{"Max Drawdown":"2.5"}],
    video: '',
    gitlink: 'https://github.com/shiwangupadhyay/5_min_XAUUSD_strategy',
  },
];

async function seedProjects() {
  try {
    await initDB();

    for (const p of projects) {
      await pool.query(
        `INSERT INTO projects 
          (title, description, created_time, tags, trades, drawdown, 
           min_capital, win_rate, returns, monthly_fee, contributors, 
           params, video, gitlink, is_published)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, true)`,
        [
          p.title, p.description, p.created_time, p.tags, p.trades,
          p.drawdown, p.min_capital, p.win_rate, p.returns, p.monthly_fee,
          p.contributors, JSON.stringify(p.params), p.video, p.gitlink,
        ]
      );
      console.log(`✅ Seeded: ${p.title}`);
    }

    console.log('\n🎉 All projects seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding projects:', err.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedProjects();
