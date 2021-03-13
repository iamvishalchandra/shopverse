const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [40, "Name cannot exceed 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email  address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast 6 character long"],
    select: false,
  },

  avatar: {
    publi_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  creadetAt: {
    type: Date,
    defauult: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

// Encrypting Password before Saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
});

// compare user password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT Token

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
