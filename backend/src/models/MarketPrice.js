const mongoose = require("mongoose");

const marketPriceSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    pricePerQuintal: {
      type: Number,
      required: true,
    },
    lastWeekPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarketPrice", marketPriceSchema);
