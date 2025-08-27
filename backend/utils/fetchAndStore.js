const axios = require('axios');
const pool = require('../db/pool');

const NEWS_API = process.env.NEWS_API_URL;
const INSIGHT_API = process.env.INSIGHTS_API_URL;
const INDICES_API=process.env.INDICES_API_URL;

async function fetchAndStoreData() {
  try {
    // Fetch news
    const newsRes = await axios.get(NEWS_API);
    const news = newsRes.data;

    // Clear existing news
    await pool.query("DELETE FROM news");

    // Insert news
    for (const item of news) {
      await pool.query(
        "INSERT INTO news (title, article, source) VALUES ($1, $2, $3)",
        [item.title, item.article, item.source]
      );
    }

    // Fetch insights
    const insightsRes = await axios.get(INSIGHT_API);
    const insights = insightsRes.data;

    // Clear existing insights
    await pool.query("DELETE FROM insights");

    // Insert insights
    for (const item of insights) {
      await pool.query(
        "INSERT INTO insights (stock_or_sector, insight, sentiment) VALUES ($1, $2, $3)",
        [item.stock_or_sector, item.insight, item.sentiment]
      );
    }

    const indicesRes = await axios.get(INDICES_API);
    const indices = indicesRes.data;

    // Clear existing records
    await pool.query("DELETE FROM indices");

    // Iterate over keys (like "NIFTY 50", "SENSEX", etc.)
    for (const [name, data] of Object.entries(indices)) {
      await pool.query(
        `INSERT INTO indices 
          (name, symbol, price, change, percent_change) 
         VALUES ($1, $2, $3, $4, $5)`,
        [name, data.symbol, data.price, data.change, data.percent_change]
      );
    }
  } catch (err) {
    console.error("Error in fetchAndStoreData:", err);
  }
}

module.exports = fetchAndStoreData;
