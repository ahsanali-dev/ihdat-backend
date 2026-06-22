const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { verifyAdminToken } = require("../middlewares/auth.middleware");

router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only endpoints
router.post("/", verifyAdminToken, createProduct);
router.put("/:id", verifyAdminToken, updateProduct);
router.delete("/:id", verifyAdminToken, deleteProduct);

module.exports = router;
