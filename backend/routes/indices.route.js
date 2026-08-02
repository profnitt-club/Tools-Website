const express = require("express");
const indicesController = require("../controllers/indices.controller");

const router = express.Router();

router.get('/', indicesController.getIndices);

module.exports = router;
