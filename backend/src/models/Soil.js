const mongoose = require("mongoose");

const soilSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    ph: Number,
    moisture: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Soil", soilSchema);
