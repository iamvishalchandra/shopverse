const app = require("./app");
const dotenv = require("dotenv");
const db = require("./config/database");

// setting up config file

dotenv.config({ path: "backend/config/config.env" });

try {
  // Connection to database
  db();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server Running at ${PORT} in the ${process.env.NODE_ENV} mode.`
    );
  });
} catch {
  (error) => console.log(error);
}
