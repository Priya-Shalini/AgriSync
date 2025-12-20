const Crop = require("../models/Crop");

exports.addCrop = async (req, res) => {
  try {
    const { name, season, soilType, durationInDays } = req.body;

    if (!name || !season || !soilType || !durationInDays) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Crop.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Crop already exists" });
    }

    const crop = await Crop.create({
      name,
      season,
      soilType,
      durationInDays,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Crop added successfully",
      crop,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
