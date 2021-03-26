const app = require("./app");
const dotenv = require("dotenv");
const db = require("./config/database");
const cloudinary = require("cloudinary");

// Handling Uncaught Exceptions (Keep it on top to work)

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down due to "Uncaught Exception"`);
  process.exit(1);
});

// setting up config file

dotenv.config({ path: "backend/config/config.env" });

// try {
// Connection to database
db();

// Cloudinary Configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server Running at ${PORT} in the ${process.env.NODE_ENV} mode.`);
});

// Handling Unhandled Rejections

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server due to "Unhandled Promise Rejection"`);
  server.close(() => {
    process.exit(1);
  });
});
// } catch {
//   (error) => console.log(error);
// }
