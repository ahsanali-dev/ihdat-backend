const mongoose = require("mongoose");

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("WARNING: DATABASE_URL / MONGODB_URI environment variable is missing!");
}

let cachedConnection = null;

async function connectToDatabase() {
  // If connection is already established, return it immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is currently connecting, await it
  if (mongoose.connection.readyState === 2) {
    return new Promise((resolve, reject) => {
      mongoose.connection.once("connected", () => resolve(mongoose.connection));
      mongoose.connection.once("error", (err) => reject(err));
    });
  }

  try {
    console.log("Initializing new database connection pool...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30s
    });
    console.log("Connected successfully to MongoDB via Mongoose");
    return mongoose.connection;
  } catch (err) {
    console.error("Mongoose connection failed:", err);
    throw err;
  }
}

module.exports = { connectToDatabase };
