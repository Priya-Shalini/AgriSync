const express = require("express");
const router = express.Router();

const protect = require("../src/middleware/authMiddleware");
const {
  getFinalRecommendation,
} = require("../src/controllers/finalRecommendationController");

router.get("/final", protect, getFinalRecommendation);

module.exports = router;
