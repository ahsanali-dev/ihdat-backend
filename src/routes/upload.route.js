const express = require("express");
const router = express.Router();
const { handleImageUpload } = require("../controllers/upload.controller");
const { verifyAdminToken } = require("../middlewares/auth.middleware");

// Admin-only upload endpoint
router.post("/", verifyAdminToken, handleImageUpload);

module.exports = router;
