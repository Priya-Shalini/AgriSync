const Weather = require("../src/models/Weather");

const seedWeather = async () => {
  await Weather.deleteMany();
  await Weather.insertMany([
    {
      location: "Delhi",
      temperature: 32,
      humidity: 60,
      condition: "Sunny",
    },
    {
      location: "Mumbai",
      temperature: 29,
      humidity: 75,
      condition: "Cloudy",
    },
  ]);

  console.log("✅ Weather data seeded");
};

module.exports = seedWeather;
