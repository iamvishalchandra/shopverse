const UserMoodel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Register a User  =>  /api/v1/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserMoodel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "fsfsafsedfsdfsfsfssf/abcd",
      url: "ffffeffefsfesfsefsewfswaefsrfsrf/gsgsgsgfsfgsfsfsfedf/abcd",
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
});
