const Place = require("../models/Place");

// Create a Place
exports.createPlace = async (req, res) => {
  try {
    const placeData = { ...req.body, owner: req.user.id };
    const place = await Place.create(placeData);
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ error: "Failed to create place" });
  }
};

// Get all places (Cards)
exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch places" });
  }
};

// Update a Place
exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.body.id);
    if (place.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    Object.assign(place, req.body);
    await place.save();
    res.json({ message: "Place updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update place" });
  }
};

// Combined route for fetching all places or a single place by ID

exports.getPlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};
