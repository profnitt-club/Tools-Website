const express = require("express");
const pool = require("../db/pool");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

module.exports = router;
