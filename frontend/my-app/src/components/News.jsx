import React, { useEffect, useState } from 'react';
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
    const fetchData = async () => {
      // 1. Fetch News
      try {
        const res = await fetch(NEWS_URL);
        const data = await res.json();
        if (data && data.length > 0) {
          setNewsData(data);
        } else {
          throw new Error("Empty news data");
        }
      } catch (err) {
        console.warn("Using static news data fallback:", err.message);
        setNewsData([
          { title: "Market hits new high", article: "The stock market hit a new all-time high today amid tech rally." },
          { title: "Federal Reserve holds rates", article: "The Fed announced it will keep interest rates steady for another month." },
          { title: "Oil prices surge", article: "Global oil prices saw a significant increase due to supply concerns." }
        ]);
      }

      // 2. Fetch Insights
      try {
        const res2 = await fetch(INSIGHT_URL);
        const data2 = await res2.json();
        if (data2 && data2.length > 0) {
          setInsightData(data2);
        } else {
          throw new Error("Empty insights data");
        }
      } catch (err) {
        console.warn("Using static insights data fallback:", err.message);
        setInsightData([
          { stock_or_sector: "Technology", insight: "AI continues to drive massive growth in the tech sector.", sentiment: "positive" },
          { stock_or_sector: "Real Estate", insight: "High mortgage rates are slowing down residential real estate.", sentiment: "negative" },
          { stock_or_sector: "Energy", insight: "Renewables are gaining traction but traditional energy remains stable.", sentiment: "neutral" }
        ]);
      }

      // 3. Fetch Indices
      try {
        const res3 = await fetch(INDICES_URL);
        if (!res3.ok) throw new Error("Indices API failed");
        const data3 = await res3.json();
        const formattedIndices = Object.entries(data3).map(([name, values]) => ({
          name,
          ...values,
        }));
        if (formattedIndices && formattedIndices.length > 0) {
          setIndicesData(formattedIndices);
        } else {
          throw new Error("Empty indices data");
        }
      } catch (err) {
        console.warn("Using static indices data fallback:", err.message);
        setIndicesData([
          { name: "NIFTY 50", price: "24,000.00", change: 150.5, percent_change: 0.63 },
          { name: "SENSEX", price: "79,000.00", change: 500.2, percent_change: 0.64 },
          { name: "BANKNIFTY", price: "52,000.00", change: -100.0, percent_change: -0.19 }
        ]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-[30px] bg-pn-bg w-full min-h-screen relative overflow-x-hidden pt-10">
      {loading ? (
        <p className="text-center text-[5rem] font-bold mt-[15%] min-h-screen text-pn-pink">Loading...</p>
      ) : error ? (
        <p className="text-center text-[5rem] font-bold mt-[15%] min-h-screen text-pn-pink">{error}</p>
      ) : (
        <>
          {/* 📊 Indices Section */}
          <section className="mx-[20px] md:mx-[50px] mt-2.5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-[20px] md:px-0">
              {indicesData.map((index, idx) => (
                <div key={idx} className="bg-black text-white py-[3px] px-[27px] rounded-[12px] flex items-center justify-between gap-[3px] font-sans">
                  <h3 className="font-semibold flex-1 text-left">{index.name}</h3>
                  <p className="text-lg font-bold flex-1 text-center mt-[30px]">{index.price}</p>
                  <div className="flex items-center gap-1 flex-1 justify-end">
                    {index.change >= 0 ? (
                      <>
                        <ArrowUp className="text-green-500 w-[14px] h-[14px] mt-[15px] scale-[1.7]" />
                        <span className="text-lg text-green-500 font-medium mt-[15px]">
                           {index.percent_change}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="text-red-500 w-[14px] h-[14px] mt-[15px] scale-[1.7]" />
                        <span className="text-lg text-red-500 font-medium mt-[15px]">
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
          <h1 className="bg-[#211e2b] self-center font-sans text-[2rem] md:text-[3rem] font-bold text-white border-2 border-[#DF53BB] shadow-[0_0_7px_#DF53BB] rounded-[30px] p-[15px] md:p-[20px] text-center w-[70%] md:w-[40%] max-w-[350px]">Market News</h1>
          <section className="mx-[20px] md:mx-[50px] mt-2.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-[20px] md:px-[40px] box-border">
              {newsData.map((item, idx) => (
                <div className="bg-pn-card rounded-[40px] p-[20px] md:p-[30px] mb-5 border-2 border-pn-purple shadow-[0_0_10px_#a18cd1] text-white transition-all duration-300 ease-in-out flex flex-col justify-between min-h-[250px] md:min-h-[280px] hover:-translate-y-1" key={idx}>
                  <h3 className="font-poppins text-[20px] md:text-[23px] font-bold text-white">{item.title}</h3>
                  <p className="font-sans text-[15px] md:text-[16px] leading-[1.6] text-[#e0e0e0] my-3 whitespace-pre-wrap tracking-[0.3px]">{item.article}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 💡 Insights Section */}
          <h1 className="bg-[#211e2b] self-center font-sans text-[2rem] md:text-[3rem] font-bold text-white border-2 border-[#DF53BB] shadow-[0_0_7px_#DF53BB] rounded-[30px] p-[15px] md:p-[20px] text-center w-[70%] md:w-[40%] max-w-[350px]">Insights</h1>
          <section className="mx-[20px] md:mx-[50px] mt-2.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-[20px] md:px-[40px] box-border">
              {insightData.map((item, idx) => (
                <div className="bg-pn-card rounded-[40px] p-[20px] md:p-[30px] mb-5 border-2 border-pn-purple shadow-[0_0_10px_#a18cd1] text-white transition-all duration-300 ease-in-out flex flex-col justify-between min-h-[250px] md:min-h-[280px] hover:-translate-y-1" key={idx}>
                  <h3 className="font-poppins text-[20px] md:text-[23px] font-bold text-white">{item.stock_or_sector || "Insight"}</h3>
                  <p className="font-sans text-[15px] md:text-[16px] leading-[1.6] text-[#e0e0e0] my-3 whitespace-pre-wrap tracking-[0.3px]">{item.insight}</p>
                  <p className="text-[1rem] md:text-[1.2rem] font-poppins font-bold mt-auto pt-2.5">
                    Sentiment:{" "}
                    <span
                      className={
                        item.sentiment === "positive"
                          ? "text-green-400"
                          : item.sentiment === "neutral"
                          ? "text-[#fffb03]"
                          : "text-red-600"
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
      <div className="w-full bg-[#211e2b] p-[15px] md:p-[20px] mt-[30px] border-t border-white/10 text-center -mb-[30px]">
        <p className="text-[1.2rem] md:text-[1.5rem] font-poppins font-bold text-[#ff69b4] mb-2.5">Disclaimer</p>
        <p className="text-[0.95em] md:text-[1em] text-[#cccccc] italic leading-[1.5] max-w-[900px] mx-auto px-[15px] md:px-0">
          This news content is sourced from publicly available sites and rewritten using AI. 
          Insights are AI-generated and for informational purposes only, not financial or investment advice.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default News;
