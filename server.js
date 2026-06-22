require("dotenv").config();
const app = require("./src/app");
const { connectToDatabase } = require("./src/config/db");

// Connect to MongoDB immediately at module load (Mongoose buffers queries automatically)
connectToDatabase().catch((err) => {
  console.error("Database connection failed on startup:", err);
});

const PORT = process.env.PORT || 5000;

// Only listen on port in development/local environments
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

module.exports = app;
