const express = require("express");
const newsController = require("../controllers/news.controller");

const router = express.Router();

router.get("/", newsController.getNews);

module.exports = router;
