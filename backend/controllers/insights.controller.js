const { pool } = require("../config/db");

const getInsights = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM insights ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getInsights,
};
