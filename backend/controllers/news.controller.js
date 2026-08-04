const { sql } = require("../config/db");

const getNews = async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM news`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

module.exports = {
  getNews,
};
