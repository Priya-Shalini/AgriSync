const express = require("express");
const router = express.Router();

const Weather = require("../src/models/Weather");

// GET all weather data
router.get("/", async (req, res) => {
  try {
    const data = await Weather.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
});

module.exports = router;
