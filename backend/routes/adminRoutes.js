const express = require("express");
const router = express.Router();

const protect = require("../src/middleware/authMiddleware");
const authorize = require("../src/middleware/roleMiddleware");

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin 👑",
      user: req.user,
    });
  }
);

module.exports = router;
