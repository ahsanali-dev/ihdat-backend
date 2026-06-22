const jwt = require("jsonwebtoken");

function verifyAdminToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "No authorization token provided or invalid format (Use Bearer token)"
      });
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET || "supersecretkey";

    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: "Access denied. Admin role required."
      });
    }

    req.admin = decoded; // attach admin info to request
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: "Invalid or expired authorization token.",
      error: error.message
    });
  }
}

module.exports = {
  verifyAdminToken,
};
