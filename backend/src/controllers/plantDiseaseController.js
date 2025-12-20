const PlantDisease = require("../models/PlantDisease");

exports.getPlantDiseaseByCrop = async (req, res) => {
  try {
    const { crop } = req.query;

    if (!crop) {
      return res.status(400).json({
        message: "crop query parameter is required",
      });
    }

    const disease = await PlantDisease.findOne({
      crop: { $regex: new RegExp(crop, "i") },
    });

    if (!disease) {
      return res.status(404).json({
        message: "No disease data found for this crop",
      });
    }

    res.status(200).json(disease);
  } catch (error) {
    console.error("Plant disease error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
