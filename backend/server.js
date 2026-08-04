require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });
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
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/projects", require("./routes/projects.route"));
app.use("/api/contacts", require("./routes/contacts.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/insights", require("./routes/insights.route"));
app.use("/api/indices", require("./routes/indices.route"));

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Maintenance: trigger fetchAndStoreData (useful for Vercel Cron)
app.post('/api/refresh', async (req, res) => {
    try {
        // If REFRESH_SECRET is configured, require it in header `x-refresh-secret`.
        if (process.env.REFRESH_SECRET) {
            const secret = req.headers['x-refresh-secret'] || req.headers['x-refresh-token'];
            if (!secret || secret !== process.env.REFRESH_SECRET) {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }

        await fetchAndStoreData();
        res.json({ status: 'ok', message: 'Refresh started' });
    } catch (err) {
        console.error('Refresh error:', err);
        res.status(500).json({ error: 'Refresh failed' });
    }
});

// Initialize DB tables and start server (or export app for serverless platforms)
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

// Vercel (and some other serverless platforms) expect the entry file to export
// a handler or the Express app rather than calling `listen()` directly.
if (process.env.VERCEL) {
    // For serverless deployments (Vercel) we export the app and do NOT run
    // blocking initialization/migrations automatically. Run migrations
    // separately via the `scripts/init-db.js` helper when needed.
    module.exports = app;
} else {
    startServer();
}
