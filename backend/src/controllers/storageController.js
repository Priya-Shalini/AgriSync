const Storage = require("../models/Storage");

// 🏬 Get storage status
exports.getStorageStatus = async (req, res) => {
  try {
    const data = await Storage.find();

    const formatted = data.map((item) => ({
      crop: item.crop,
      location: item.location,
      capacity: item.capacity,
      used: item.used,
      available: item.capacity - item.used,
      lastUpdated: item.updatedAt,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
