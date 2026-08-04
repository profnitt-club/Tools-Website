const { sql } = require("../config/db");

const getIndices = async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM indices`;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getIndices,
};
