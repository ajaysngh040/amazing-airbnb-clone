const express = require("express");
const {
  uploadByLink,
  uploadImage,
} = require("../controllers/uploadController");
const upload = require("../middleware/imageUploader"); // Importing multer configuration

// Initialize the router
const router = express.Router();

// Route for single file upload
router.post("/uploadImage", upload.single("file"), uploadImage);

// Route for uploading via link (assuming this doesn’t need multer)
router.post("/uploadByLink", upload.single("file"), uploadByLink);

// Export the router for use in other parts of the app
module.exports = router;
