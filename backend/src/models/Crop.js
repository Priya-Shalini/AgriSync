const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    season: {
      type: String,
      required: true,
      enum: ["Kharif", "Rabi", "Zaid"],
    },
    soilType: {
      type: String,
      required: true,
    },
    durationInDays: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);
