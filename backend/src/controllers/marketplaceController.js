const MarketplaceItem = require("../models/MarketplaceItem");

// 🛒 Get all marketplace items
exports.getMarketplaceItems = async (req, res) => {
  try {
    const items = await MarketplaceItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
