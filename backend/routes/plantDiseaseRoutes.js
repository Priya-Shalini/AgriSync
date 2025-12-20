const express = require("express");
const router = express.Router();

const {
  getPlantDiseaseByCrop,
} = require("../src/controllers/plantDiseaseController");

// URL: /api/plant/disease?crop=Potato
router.get("/disease", getPlantDiseaseByCrop);

module.exports = router;
