import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Set up file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Default route
app.get("/", (req, res) => {
  res.send("🌱 AgriSync Node Backend Running!");
});

// Soil Prediction Endpoint (temporary mock)
app.post("/predict-soil", upload.single("image"), async (req, res) => {
  console.log("Received soil image:", req.file?.path);
  // Mock response — replace this with ML logic later
  res.json({
    success: true,
    soilType: "Loamy Soil",
    confidence: "92%",
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




