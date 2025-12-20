const express = require("express");
const router = express.Router();

// ✅ correct paths
const protect = require("../src/middleware/authMiddleware");
const authorize = require("../src/middleware/roleMiddleware");

const { addCrop } = require("../src/controllers/adminCropController");
const {
  addOrUpdateMarketPrice,
} = require("../src/controllers/adminMarketController");

// 👑 Admin only
router.post("/crop", protect, authorize("admin"), addCrop);
router.post("/market", protect, authorize("admin"), addOrUpdateMarketPrice);

module.exports = router;
