const MarketPrice = require("../models/MarketPrice");

exports.addOrUpdateMarketPrice = async (req, res) => {
  try {
    const { crop, market, pricePerQuintal, lastWeekPrice } = req.body;

    if (!crop || !market || !pricePerQuintal || !lastWeekPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const priceData = await MarketPrice.findOneAndUpdate(
      { crop, market },
      { pricePerQuintal, lastWeekPrice },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Market price saved",
      data: priceData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
