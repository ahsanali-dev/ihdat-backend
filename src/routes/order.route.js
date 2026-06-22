const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrderStatus,
  trackOrder,
} = require("../controllers/order.controller");
const { verifyAdminToken } = require("../middlewares/auth.middleware");

router.post("/", createOrder); // Public endpoint for customers placing orders
router.get("/track/:id", trackOrder); // Public endpoint to track a single order

// Admin-only endpoints
router.get("/", verifyAdminToken, getOrders);
router.put("/:id", verifyAdminToken, updateOrderStatus);

module.exports = router;
