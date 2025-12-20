const express = require("express");
const router = express.Router();
const multer = require("multer");

const protect = require("../src/middleware/authMiddleware");
const authorize = require("../src/middleware/roleMiddleware");

const {
  createCrop,
  getAllCrops,
  getCropById,
  updateCrop,
  deleteCrop,
  detectPlantDisease,
} = require("../src/controllers/cropController");

// Multer setup (image upload)
const upload = multer({ dest: "uploads/" });

// 👨‍🌾 Farmer + Admin
router.get("/", protect, getAllCrops);
router.get("/:id", protect, getCropById);

// 👑 Admin only
router.post("/", protect, authorize("admin"), createCrop);
router.put("/:id", protect, authorize("admin"), updateCrop);
router.delete("/:id", protect, authorize("admin"), deleteCrop);

// 🌿 Plant Disease Detection
router.post(
  "/disease-detect",
  upload.single("image"),
  detectPlantDisease
);

module.exports = router;
