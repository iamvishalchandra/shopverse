// Check whether user is authenticated/not
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(new ErrorHandler("Authorize yourself to get token value", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decoded.id);
  next();
});
