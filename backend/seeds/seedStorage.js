const Storage = require("../src/models/Storage");

const seedStorage = async () => {
  await Storage.deleteMany();

  await Storage.insertMany([
    {
      crop: "Potato",
      capacity: 500,   // ✅ Number only
      used: 200,       // ✅ optional but valid
      location: "Punjab",
    },
    {
      crop: "Wheat",
      capacity: 1000,  // ✅ Number only
      used: 750,
      location: "Haryana",
    },
  ]);

  console.log("✅ Storage data seeded");
};

module.exports = seedStorage;
