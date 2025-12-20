require("dotenv").config();
const connectDB = require("../src/config/db");

const seedCrops = require("./seedCrops");
const seedPlantDiseases = require("./seedPlantDiseases");
const seedMarketPrices = require("./seedMarketPrices");
const seedSoil = require("./seedSoil");
const seedWeather = require("./seedWeather");
const seedStorage = require("./seedStorage");
const seedMarketplace = require("./seedMarketplace");

(async () => {
  try {
    await connectDB();

    await seedCrops();
    await seedPlantDiseases();
    await seedMarketPrices();
    await seedSoil();
    await seedWeather();
    await seedStorage();
    await seedMarketplace();

    console.log("🎉 ALL DATA SEEDED SUCCESSFULLY");
    process.exit();
  } catch (err) {
    console.error("❌ SEED ERROR:", err);
    process.exit(1);
  }
})();
