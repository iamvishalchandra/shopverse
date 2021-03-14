const UserModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");

// Register a User  =>  /api/v1/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "fsfsafsedfsdfsfsfssf/abcd",
      url: "ffffeffefsfesfsefsewfswaefsrfsrf/gsgsgsgfsfgsfsfsfedf/abcd",
    },
  });

  sendToken(user, 200, res);
});

// Login User => /api/v1/login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password  is entered by user

  if (!email && !password)
    return next(new ErrorHandler("Enter your email & password", 400));
  else if (!email) return next(new ErrorHandler("Enter your email", 400));
  else if (!password) return next(new ErrorHandler("Enter your password", 400));

  // Find User in database
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  // Check if password is correct or not

  const isPasswordMatched = await user.matchPassword(password);

  if (!isPasswordMatched) return next(new ErrorHandler("Wrong Password", 401));

  sendToken(user, 200, res);
});

// Logout => /api/v1/logout

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
