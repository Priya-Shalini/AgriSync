const express = require("express");
const router = express.Router();

const protect = require("../src/middleware/authMiddleware");
const {
  getSoilRecommendations,
} = require("../src/controllers/soilController");

// 👨‍🌾 Farmer + Admin
router.get("/recommend", protect, getSoilRecommendations);

module.exports = router;
