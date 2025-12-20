const express = require("express");
const router = express.Router();

const protect = require("../src/middleware/authMiddleware");
const {
  getMarketRecommendation,
} = require("../src/controllers/marketController");

// 👨‍🌾 Farmer + Admin
router.get("/recommend", protect, getMarketRecommendation);

module.exports = router;
