const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema({
  crop: String,
  capacity: Number,
  used: Number,
  location: String
});

module.exports = mongoose.model("Storage", storageSchema);
