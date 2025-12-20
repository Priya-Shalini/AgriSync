const mongoose = require("mongoose");

const marketplaceItemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    seller: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarketplaceItem", marketplaceItemSchema);
