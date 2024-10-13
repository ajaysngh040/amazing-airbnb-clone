const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This will add the user object (including the user id) to req
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
