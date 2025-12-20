const Crop = require("../src/models/Crop");

const seedCrops = async () => {
  await Crop.deleteMany();

  await Crop.insertMany([
    {
      name: "Wheat",
      season: "Rabi",
      soilType: "Black",
      durationInDays: 120,
    },
    {
      name: "Rice",
      season: "Kharif",
      soilType: "Alluvial",
      durationInDays: 150,
    },
    {
      name: "Potato",
      season: "Rabi",
      soilType: "Loamy",
      durationInDays: 90,
    },
  ]);

  console.log("✅ Crops seeded");
};

module.exports = seedCrops;
