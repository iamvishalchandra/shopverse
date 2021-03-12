const app = require("./app");
const dotenv = require("dotenv");
const db = require("./config/database");

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
