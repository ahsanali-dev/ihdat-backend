const jwt = require("jsonwebtoken");

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "admin@ihdat.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";
    const jwtSecret = process.env.JWT_SECRET || "supersecretkey";

    if (email === adminEmail && password === adminPassword) {
      // Create a JWT token valid for 24 hours
      const token = jwt.sign(
        { role: "admin", email: adminEmail },
        jwtSecret,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "Logged in successfully as Administrator",
        token: token
      });
    } else {
      res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Invalid administrator email or password."
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal server error during login",
      error: error.message
    });
  }
}

module.exports = {
  adminLogin,
};
