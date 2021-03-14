const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  recoverPassword,
  logoutUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(recoverPassword);
router.route("/logout").get(logoutUser);

module.exports = router;
