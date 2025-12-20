const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  humidity: Number,
  rainfall: String,
  advisory: String
});

module.exports = mongoose.model("Weather", weatherSchema);
