const mongoose = require("mongoose");

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("WARNING: DATABASE_URL / MONGODB_URI environment variable is missing!");
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully to MongoDB via Mongoose");
  } catch (err) {
    console.error("Mongoose connection failed:", err);
    throw err;
  }
}

module.exports = { connectToDatabase };
