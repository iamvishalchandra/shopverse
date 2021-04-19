const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  //   Development Mode Error Handler

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  //   Production Mode Error Handler

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    // Wrong Mongoose Object id Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation Error

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Duplicate Key Error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wron JWT Token
    if (err.name === "JasonWebTokenError") {
      const message = "Jason Web Token is invalid, Try again";
      error = new ErrorHandler(message, 400);
    }

    // Handling Expires JWT Token
    if (err.name === "TokenExpiredError") {
      const message = "Jason Web Token is expired, Try again";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || err.message || "Internal Server Error",
    });
  }
};
