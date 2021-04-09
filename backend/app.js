const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes

const products = require("./routes/product.routes");
const users = require("./routes/user.routes");
const orders = require("./routes/order.routes");
const payments = require("./routes/payment.routes");

app.use("/api/v1", payments);
app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);

//Error handling Middleware
app.use(errorMiddleware);

module.exports = app;
