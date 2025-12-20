const Crop = require("../models/Crop");

// 👑 Admin: Add crop
exports.createCrop = async (req, res) => {
  try {
    const crop = await Crop.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Crop created successfully 🌱",
      crop,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 👨‍🌾 Farmer/Admin: Get all crops
exports.getAllCrops = async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
};

// 👨‍🌾 Farmer/Admin: Get single crop
exports.getCropById = async (req, res) => {
  const crop = await Crop.findById(req.params.id);

  if (!crop) {
    return res.status(404).json({ message: "Crop not found" });
  }

  res.json(crop);
};

// 👑 Admin: Update crop
exports.updateCrop = async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!crop) {
    return res.status(404).json({ message: "Crop not found" });
  }

  res.json({
    message: "Crop updated successfully",
    crop,
  });
};

// 👑 Admin: Delete crop
exports.deleteCrop = async (req, res) => {
  const crop = await Crop.findByIdAndDelete(req.params.id);

  if (!crop) {
    return res.status(404).json({ message: "Crop not found" });
  }

  res.json({ message: "Crop deleted successfully ❌" });
};

// 🌿 Dummy Plant Disease Detection (ML removed)
exports.detectPlantDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded",
      });
    }

    // 🔴 Dummy response (future ML yahin lagega)
    res.json({
      class: "Leaf Blight",
      confidence: 0.87,
      status: "DISEASED",
      treatment: "Use neem oil spray twice a week and remove infected leaves.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Plant disease detection failed",
    });
  }
};
