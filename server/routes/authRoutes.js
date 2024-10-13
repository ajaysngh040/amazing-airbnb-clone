const express = require("express");
const {
  register,
  login,
  getProfile,
  logout,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);
router.post("/logout", logout);

module.exports = router;
