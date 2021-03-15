const UserModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

// Get Reset Token
exports.recoverPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user)
    return next(new ErrorHandler(`User don't exit with this email`, 404));

  // Get reset Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset password URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `To change your Shopverse password go to: ${resetUrl}\n\nPlease ignore if already did or if it's not you.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery Shopverse",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// ResetPassword => /api/v1/password/reset
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Password reset token is either invalid or expired.",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Password doesn't match.", 400));

  // setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Currently Loged In User => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update/Change Current User Password => /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select("+password");

  // Check User's Old Password
  const isPasswordMatched = await user.matchPassword(req.body.oldPassword);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Old Password don't match", 400));

  user.password = req.body.newPassword;
  await user.save();
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
