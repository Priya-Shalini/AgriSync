const Soil = require("../src/models/Soil");

const seedSoil = async () => {
  await Soil.deleteMany();

  await Soil.insertMany([
    {
      location: "Punjab",
      nitrogen: 45,
      phosphorus: 30,
      potassium: 25,
      ph: 6.8,
      moisture: 60,
    },
    {
      location: "Maharashtra",
      nitrogen: 50,
      phosphorus: 35,
      potassium: 40,
      ph: 7.2,
      moisture: 55,
    },
  ]);

  console.log("✅ Soil data seeded");
};

module.exports = seedSoil;
