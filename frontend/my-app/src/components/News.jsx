import React, { useEffect, useState } from 'react';
import "../styles/news.css";
import logo from "../assets/logo.png";
import { FaSearchDollar } from "react-icons/fa";
import Footer from './Footer';
import { ArrowUp, ArrowDown } from "lucide-react";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [insightData, setInsightData] = useState([]);
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const NEWS_URL = `${import.meta.env.VITE_API_BASE}/api/news`;
  const INSIGHT_URL = `${import.meta.env.VITE_API_BASE}/api/insights`;
  const INDICES_URL = "https://news-insights-api-e9caasgqa7fje9ag.centralindia-01.azurewebsites.net/indices_price_data";

  useEffect(() => {
    // TEMPORARY STATIC DATA (External API is out of quota)
    setNewsData([
      { title: "Market hits new high", article: "The stock market hit a new all-time high today amid tech rally." },
      { title: "Federal Reserve holds rates", article: "The Fed announced it will keep interest rates steady for another month." },
      { title: "Oil prices surge", article: "Global oil prices saw a significant increase due to supply concerns." }
    ]);
    
    setInsightData([
      { stock_or_sector: "Technology", insight: "AI continues to drive massive growth in the tech sector.", sentiment: "positive" },
      { stock_or_sector: "Real Estate", insight: "High mortgage rates are slowing down residential real estate.", sentiment: "negative" },
      { stock_or_sector: "Energy", insight: "Renewables are gaining traction but traditional energy remains stable.", sentiment: "neutral" }
    ]);

    setIndicesData([
      { name: "NIFTY 50", price: "24,000.00", change: 150.5, percent_change: 0.63 },
      { name: "SENSEX", price: "79,000.00", change: 500.2, percent_change: 0.64 },
      { name: "BANKNIFTY", price: "52,000.00", change: -100.0, percent_change: -0.19 }
    ]);

    setLoading(false);
  }, []);

  return (
    <div className="news-main-container">
      {loading ? (
        <p className="news-loading">Loading...</p>
      ) : error ? (
        <p className="news-error">{error}</p>
      ) : (
        <>
          {/* 📊 Indices Section */}
          <section className="news-section">
            <div className="indices-card-grid">
              {indicesData.map((index, idx) => (
                <div key={idx} className="indices-card">
                  <h3 className="index-title">{index.name}</h3>
                  <p className="index-price">{index.price}</p>
                  <div className="change-container">
                    {index.change >= 0 ? (
                      <>
                        <ArrowUp className="up-icon" />
                        <span className="arrow-up">
                           {index.percent_change}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="down-icon" />
                        <span className="arrow-down">
                          {index.percent_change}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 📰 News Section */}
          <h1 className="news-heading">Market News</h1>
          <section className="news-section">
            <div className="news-card-grid">
              {newsData.map((item, idx) => (
                <div className="news-card" key={idx}>
                  <h3>{item.title}</h3>
                  <p className="news-card-text">{item.article}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 💡 Insights Section */}
          <h1 className="news-heading">Insights</h1>
          <section className="news-section">
            <div className="news-card-grid">
              {insightData.map((item, idx) => (
                <div className="news-card" key={idx}>
                  <h3>{item.stock_or_sector || "Insight"}</h3>
                  <p className="news-card-text">{item.insight}</p>
                  <p className="news-sentiments">
                    Sentiment:{" "}
                    <span
                      className={
                        item.sentiment === "positive"
                          ? "sentiment-positive"
                          : item.sentiment === "neutral"
                          ? "sentiment-neutral"
                          : "sentiment-negative"
                      }
                    >
                      {item.sentiment || "Neutral"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 📌 Disclaimer */}
      <div className="news-disclaimer-wrapper">
        <p className="disclaimer-text">Disclaimer</p>
        <p className="news-disclaimer">
          This news content is sourced from publicly available sites and rewritten using AI. 
          Insights are AI-generated and for informational purposes only, not financial or investment advice.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default News;
