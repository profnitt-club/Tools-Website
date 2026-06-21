require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");

const { initDB } = require("./config/db");
const fetchAndStoreData = require("./utils/fetchAndStore");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/news", require("./routes/news"));
app.use("/api/insights", require("./routes/insights"));
app.use("/api/indices", require("./routes/indices"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Initialize DB tables and start server
const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await initDB();

    // Fetch external data (news, insights, indices) on startup
    // Only run if the API URLs are configured
    if (process.env.NEWS_API_URL && process.env.INSIGHTS_API_URL && process.env.INDICES_API_URL) {
      fetchAndStoreData();
      // Schedule cron job to refresh external data every 12 hours
      cron.schedule("0 6,18 * * *", fetchAndStoreData);
    } else {
      console.log("⚠️  External API URLs not configured — skipping news/insights/indices fetch.");
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
