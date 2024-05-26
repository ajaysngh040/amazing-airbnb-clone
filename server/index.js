// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import models
const User = require("./models/User");
const Place = require("./models/Places");
const Booking = require("./models/Booking");

// Create an Express application
const app = express();
const bcryptSalt = bcrypt.genSaltSync(12);

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.APP_URL }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("No token provided");
    }

    const userData = jwt.verify(token, process.env.JWT_SECRET);
    return userData;
  } catch (error) {
    console.error("Error in getUserDataFromReq:", error);
    throw new Error("Auth error");
  }
}

// User registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashsync(password, bcryptSalt);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(422).json({ error: "Unable to register" });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user profile
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token found" });
  }
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, _id } = await User.findById(userData.id);
    res.json({ name, email, _id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// Upload image by link
app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = `Photo${Date.now()}.jpg`;
    await imageDownloader.image({
      url: link,
      dest: `${__dirname}/uploads/${newName}`,
    });
    res.json(newName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

// Upload images using multer
const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  try {
    const uploadedFiles = req.files.map((file) => {
      const parts = file.originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = `${file.path}.${ext}`;
      fs.renameSync(file.path, newPath);
      return newPath.replace("uploads/", "");
    });
    res.json(uploadedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload files" });
  }
});

// Add a new place
app.post("/places", async (req, res) => {
  try {
    const { token } = req.cookies;
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const placeData = { ...req.body, owner: userData.id };
    const placeDoc = await Place.create(placeData);
    res.status(201).json(placeDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create place" });
  }
});

// Get places owned by the user
app.get("/user-places", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  } catch (error) {
    console.error("Error in user-places api", error);
    res.status(500).json({ error: "Failed to fetch user places" });
  }
});

// Get place by ID
app.get("/places/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch place" });
  }
});

// Update a place
app.put("/places", async (req, res) => {
  try {
    const { token } = req.cookies;
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    const placeDoc = await Place.findById(req.body.id);
    if (placeDoc.owner.toString() !== userData.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    Object.assign(placeDoc, req.body);
    await placeDoc.save();
    res.json("ok");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update place" });
  }
});

// Get all places
app.get("/places", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// Create a booking
app.post("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const bookingData = { ...req.body, user: userData.id };
    const bookingDoc = await Booking.create(bookingData);
    res.status(201).json(bookingDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Get user bookings
app.get("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    if (!userData) {
      return res.status(403).json({ error: "Invalid token or user not found" });
    }
    console.log("User Data:", userData); // Log user data for debugging
    const bookings = await Booking.find({ user: userData.id }).populate(
      "place"
    );
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in /bookings route:", error.response.data); // Detailed error logging
    res.status(500).json({ error: error.toString() });
  }
});

app.delete("/places/:id", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const placeId = req.params.id;

    // Find the place and ensure it belongs to the current user
    const place = await Place.findById(placeId);
    if (!place || place.owner.toString() !== userData.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this place." });
    }

    await Place.findByIdAndDelete(placeId);
    res.status(200).json({ message: "Place deleted successfully." });
  } catch (error) {
    console.error("Error deleting place:", error);
    res.status(500).json({ error: "Failed to delete place." });
  }
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.APP_URL}:${PORT}`);
});
