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
    const user = await User.findOne({ email }); // Create a user object without the password

    // const user = await User.findById(req.user.id).select("-password");

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true, // CHANGE THIS TO FALSE IN DEVELOPMENT
        secure: true,
        sameSite: "None", // SameSite None for cross-site in production
      })
      .json({
        message: "Login successful",
        user: { email: user.email, name: user.name },
      });
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
