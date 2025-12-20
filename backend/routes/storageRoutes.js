const express = require("express");
const router = express.Router();

const { getStorageStatus } = require("../src/controllers/storageController");

// 🌾 PUBLIC (read-only)
router.get("/", getStorageStatus);

module.exports = router;
