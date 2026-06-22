const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");
const uploadRoutes = require("./routes/upload.route");
const authRoutes = require("./routes/auth.route");
const contactRoutes = require("./routes/contact.route");

const app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Increase body payload limits to support large base64 image uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Mount API routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: err.message || "Something went wrong on the server!" });
});

module.exports = app;
