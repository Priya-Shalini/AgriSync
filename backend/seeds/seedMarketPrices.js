const MarketPrice = require("../src/models/MarketPrice");

const seedMarketPrices = async () => {
  await MarketPrice.deleteMany();
  await MarketPrice.insertMany([
    {
      crop: "Wheat",
      market: "Delhi",
      pricePerQuintal: 2400,
      lastWeekPrice: 2200,
    },
    {
      crop: "Rice",
      market: "Mumbai",
      pricePerQuintal: 3200,
      lastWeekPrice: 3300,
    },
  ]);

  console.log("✅ Market prices seeded");
};

module.exports = seedMarketPrices;
