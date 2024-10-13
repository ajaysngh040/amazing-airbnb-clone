const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const bcryptSalt = bcrypt.genSaltSync(12);

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const user = await User.create({ name, email, password: hashedPassword });
    res
      .status(200)
      .json({ message: "Registration successful", user: { name, email } });
  } catch (error) {
    res.status(422).json({ error: "Unable to register" });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true, // Prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Enable HTTPS only in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Set SameSite None in production
        domain:
          process.env.NODE_ENV === "production"
            ? "https://amazing-airbnb-clone.vercel.app"
            : undefined, // Domain only for production
      })
      .json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};
