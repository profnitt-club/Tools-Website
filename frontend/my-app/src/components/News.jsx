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
  const INDICES_URL =  `${import.meta.env.VITE_API_BASE}/api/indices`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(NEWS_URL);
        const data = await res.json();
        setNewsData(data || []);

        const res2 = await fetch(INSIGHT_URL);
        const data2 = await res2.json();
        setInsightData(data2);

        const res3 = await fetch(INDICES_URL);
        const data3 = await res3.json();
        setIndicesData(data3 || []);
        
        console.log("Indices Data:", data3);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch news/insights/indices.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="news-main-container">
      {loading ? (
        <p className="news-loading">Loading...</p>
      ) : error ? (
        <p className="news-error">{error}</p>
      ) : (
        <>
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
                        <span className="arrow-up">{index.change}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="down-icon" />
                        <span className="arrow-down">{index.change}%</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <h1 className='news-heading'> Market News</h1>
          <section className="news-section">
            <div className="news-card-grid">
              {newsData.map((item, idx) => (
                <div className="news-card" key={idx}>
                  <h3>{item.title}</h3>
                  <p className='news-card-text'>{item.article}</p>
                </div>
              ))}
            </div>
          </section>

          <h1 className='news-heading'> Insights</h1>
          <section className="news-section">
            <div className="news-card-grid">
              {insightData.map((item, idx) => (
                <div className="news-card" key={idx}>
                  <h3>{item.stock_or_sector || "Insight"}</h3>
                  <p className='news-card-text'>{item.insight}</p>
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
      <div className="news-disclaimer-wrapper">
        <p className='disclaimer-text'>Disclaimer </p>
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
