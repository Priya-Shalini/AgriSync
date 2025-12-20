const MarketPrice = require("../models/MarketPrice");

// 💰 Get market price recommendation
exports.getMarketRecommendation = async (req, res) => {
  try {
    const { crop, market } = req.query;

    if (!crop || !market) {
      return res.status(400).json({
        message: "crop and market are required",
      });
    }

    const data = await MarketPrice.findOne({
      crop: { $regex: new RegExp(crop, "i") },
      market: { $regex: new RegExp(market, "i") },
    });

    if (!data) {
      return res.status(404).json({
        message: "Market price data not found",
      });
    }

    let recommendation = "Stable";
    if (data.pricePerQuintal > data.lastWeekPrice) {
      recommendation = "Sell 📈";
    } else if (data.pricePerQuintal < data.lastWeekPrice) {
      recommendation = "Hold 📉";
    }

    res.json({
      crop: data.crop,
      market: data.market,
      currentPrice: data.pricePerQuintal,
      lastWeekPrice: data.lastWeekPrice,
      recommendation,
      lastUpdated: data.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
