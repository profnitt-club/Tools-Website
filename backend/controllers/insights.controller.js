const { sql } = require("../config/db");

const getInsights = async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM insights ORDER BY created_at DESC`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getInsights,
};
