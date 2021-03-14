const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  recoverPassword,
  resetPassword,
  logoutUser,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(recoverPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);

module.exports = router;
