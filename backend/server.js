const app = require("./app");
const dotenv = require("dotenv");

// setting up config file

dotenv.config({ path: "backend/config/config.env" });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT} in the ${process.env.NODE_ENV} mode.`);
});
