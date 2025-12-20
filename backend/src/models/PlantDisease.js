const mongoose = require("mongoose");

const plantDiseaseSchema = new mongoose.Schema({
  crop: String,
  disease: String,
  confidence: Number,
  status: String,
  treatment: String
});

module.exports = mongoose.model("PlantDisease", plantDiseaseSchema);
