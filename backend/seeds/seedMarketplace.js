const MarketplaceItem = require("../src/models/MarketplaceItem");

const seedMarketplace = async () => {
  await MarketplaceItem.deleteMany();
  await MarketplaceItem.insertMany([
    {
      name: "Organic Fertilizer",
      price: 1200,
      category: "Fertilizer",
      seller: "AgroStore",
    },
    {
      name: "Hybrid Seeds",
      price: 800,
      category: "Seeds",
      seller: "KrishiMart",
    },
  ]);

  console.log("✅ Marketplace data seeded");
};

module.exports = seedMarketplace;
