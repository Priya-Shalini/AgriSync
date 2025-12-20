const express = require("express");
const router = express.Router();

const {
  getMarketplaceItems,
} = require("../src/controllers/marketplaceController");

// 🛒 Public marketplace
router.get("/", getMarketplaceItems);

module.exports = router;
