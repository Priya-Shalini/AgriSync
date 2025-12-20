const PlantDisease = require("../src/models/PlantDisease");

const seedPlantDiseases = async () => {
  await PlantDisease.deleteMany();
  await PlantDisease.insertMany([
    {
      crop: "Potato",
      disease: "Late Blight",
      confidence: 0.92,
      status: "INFECTED",
      treatment: "Use fungicide containing chlorothalonil",
    },
    {
      crop: "Tomato",
      disease: "Healthy",
      confidence: 0.98,
      status: "HEALTHY",
      treatment: "No treatment required",
    },
  ]);

  console.log("✅ Plant diseases seeded");
};

module.exports = seedPlantDiseases;
