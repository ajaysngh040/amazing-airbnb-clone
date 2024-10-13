const Booking = require("../models/Booking");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const bookingData = { ...req.body, user: req.user.id };
    const booking = await Booking.create(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// Get Bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "place"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
