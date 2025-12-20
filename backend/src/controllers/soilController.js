const Crop = require("../models/Crop");

/**
 * 🌱 Soil-based Crop Recommendation
 * @route   GET /api/soil/recommend
 * @access  Protected (Farmer + Admin)
 * @query   soilType, season
 */
exports.getSoilRecommendations = async (req, res) => {
  try {
    const { soilType, season } = req.query;

    // 🔎 Validation
    if (!soilType || !season) {
      return res.status(400).json({
        message: "soilType and season are required",
        example: "/api/soil/recommend?soilType=Black&season=Kharif",
      });
    }

    // 🔍 Find crops matching soil + season (case-insensitive soil)
    const crops = await Crop.find({
      soilType: { $regex: new RegExp(soilType, "i") },
      season,
    }).select("-__v");

    // ❌ No crops found
    if (!crops || crops.length === 0) {
      return res.status(404).json({
        message: "No crops found for this soil type and season",
        soilType,
        season,
        recommendations: [],
      });
    }

    // ✅ Success
    res.status(200).json({
      message: "Soil-based crop recommendations",
      soilType,
      season,
      totalCrops: crops.length,
      recommendations: crops,
    });
  } catch (error) {
    console.error("Soil recommendation error:", error);
    res.status(500).json({
      message: "Server error while fetching soil recommendations",
    });
  }
};
