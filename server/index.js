require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes"); // Adjust the path as needed
const cors = require("cors"); // Import the CORS middleware

const app = express();
connectDB();

// Set up CORS
app.use(
  cors({
    origin: process.env.DEV_URL || process.env.CLIENT_URL, // You can specify allowed domains here or use '*' for all domains
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRoutes); // auth routes
app.use("/places", placeRoutes); // places routes
app.use("/bookings", bookingRoutes); // booking routes

// Serve files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use the upload routes
app.use("/uploads", uploadRoutes); // Prefixing routes with /api for better organization

// Error handling
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
