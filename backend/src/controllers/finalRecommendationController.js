const Crop = require("../models/Crop");
const MarketPrice = require("../models/MarketPrice");

exports.getFinalRecommendation = async (req, res) => {
  try {
    const { soilType, season, market } = req.query;

    if (!soilType || !season || !market) {
      return res.status(400).json({
        message: "soilType, season and market are required",
      });
    }

    // 1️⃣ Find crops suitable for soil + season
    const crops = await Crop.find({
      soilType: { $regex: new RegExp(soilType, "i") },
      season,
    });

    if (crops.length === 0) {
      return res.json({
        message: "No suitable crops found",
        recommendations: [],
      });
    }

    // 2️⃣ Get market prices for those crops
    const cropNames = crops.map((c) => c.name);

    const prices = await MarketPrice.find({
      crop: { $in: cropNames },
      market: { $regex: new RegExp(market, "i") },
    });

    if (prices.length === 0) {
      return res.json({
        message: "No market data available for recommended crops",
      });
    }

    // 3️⃣ Pick best crop (highest profit)
    let best = prices[0];

    prices.forEach((p) => {
      if (p.pricePerQuintal > best.pricePerQuintal) {
        best = p;
      }
    });

    res.json({
      soilType,
      season,
      market,
      bestCropToSell: best.crop,
      pricePerQuintal: best.pricePerQuintal,
      lastWeekPrice: best.lastWeekPrice,
      advice:
        best.pricePerQuintal > best.lastWeekPrice
          ? "Sell now 📈"
          : "Hold for better price 📉",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

