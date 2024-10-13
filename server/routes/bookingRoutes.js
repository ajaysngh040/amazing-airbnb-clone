const express = require("express");
const {
  createBooking,
  getBookings,
} = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Booking routes
router.post("/create", verifyToken, createBooking);
router.get("/", verifyToken, getBookings);

module.exports = router;
