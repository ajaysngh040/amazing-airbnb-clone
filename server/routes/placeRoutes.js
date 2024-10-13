const express = require("express");
const {
  createPlace,
  getPlaces,
  updatePlace,
  getPlace,
} = require("../controllers/placeController"); // Make sure these functions are correctly imported
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Define routes with proper callbacks
router.post("/create", verifyToken, createPlace);
router.get("/", getPlaces);
router.get("/:id?", getPlace);
router.put("/update", verifyToken, updatePlace);

module.exports = router;
