const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes

const products = require("./routes/product.routes");
const users = require("./routes/user.routes");
const orders = require("./routes/order.routes");
// const bodyParser = require("body-parser");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);

//Error handling Middleware
app.use(errorMiddleware);

module.exports = app;
