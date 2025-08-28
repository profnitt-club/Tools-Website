require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetchAndStoreData = require("./utils/fetchAndStore");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(express.json());

fetchAndStoreData();

app.use("/api/news", require("./routes/news"));
app.use("/api/insights", require("./routes/insights"));
app.use("/api/indices", require("./routes/indices"));


cron.schedule("0 6,18 * * *", fetchAndStoreData);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
