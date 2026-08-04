const axios = require('axios');
const { sql } = require('../config/db');

const NEWS_API = process.env.NEWS_API_URL;
const INSIGHT_API = process.env.INSIGHTS_API_URL;
const INDICES_API = process.env.INDICES_API_URL;

async function fetchAndStoreData() {
  try {
    // Fetch news
    const newsRes = await axios.get(NEWS_API);
    const news = newsRes.data;

    // Clear existing news
    await sql`DELETE FROM news`;

    // Insert news
    for (const item of news) {
      await sql`INSERT INTO news (title, article, source) VALUES (${item.title}, ${item.article}, ${item.source})`;
    }

    // Fetch insights
    const insightsRes = await axios.get(INSIGHT_API);
    const insights = insightsRes.data;

    // Clear existing insights
    await sql`DELETE FROM insights`;

    // Insert insights
    for (const item of insights) {
      await sql`INSERT INTO insights (stock_or_sector, insight, sentiment) VALUES (${item.stock_or_sector}, ${item.insight}, ${item.sentiment})`;
    }

    const indicesRes = await axios.get(INDICES_API);
    const indices = indicesRes.data;

    // Clear existing records
    await sql`DELETE FROM indices`;

    // Iterate over keys (like "NIFTY 50", "SENSEX", etc.)
    for (const [name, data] of Object.entries(indices)) {
      await sql`INSERT INTO indices (name, symbol, price, change, percent_change) VALUES (${name}, ${data.symbol}, ${data.price}, ${data.change}, ${data.percent_change})`;
    }

    console.log('✅ External data fetched and stored successfully.');
  } catch (err) {
    if (err.response) {
      console.error("❌ External API Error in fetchAndStoreData:", err.response.status, err.response.data?.message || err.message);
    } else {
      console.error("❌ Error in fetchAndStoreData:", err.message);
    }
  }
}

module.exports = fetchAndStoreData;
