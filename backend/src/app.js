const express = require("express");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const adminRoutes = require("../routes/adminRoutes");
const cropRoutes = require("../routes/cropRoutes");
const soilRoutes = require("../routes/soilRoutes");
const marketRoutes = require("../routes/marketRoutes");
const finalRecommendationRoutes = require("../routes/finalRecommendationRoutes");
const adminDataRoutes = require("../routes/adminDataRoutes");
const plantDiseaseRoutes = require("../routes/plantDiseaseRoutes");
const weatherRoutes = require("../routes/weatherRoutes");
const storageRoutes = require("../routes/storageRoutes");
const marketplaceRoutes = require("../routes/marketplaceRoutes");




const app = express(); // ✅ app FIRST

console.log("Routes loaded");

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("AgriSync API is running...");
});

// Auth routes (register, login)
app.use("/api/auth", authRoutes);
app.use("/api/storage", storageRoutes);

// User routes (protected)
app.use("/api/users", userRoutes);

// Admin routes (admin-only)
app.use("/api/admin", adminRoutes);
app.use("/api/soil", soilRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/marketplace", marketplaceRoutes);

app.use("/api/recommendation", finalRecommendationRoutes);
app.use("/api/plant", plantDiseaseRoutes);

app.use("/api/admin/data", adminDataRoutes);
app.use("/api/weather", weatherRoutes);

module.exports = app;
