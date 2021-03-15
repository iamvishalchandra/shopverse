const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  recoverPassword,
  resetPassword,
  logoutUser,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDeatails,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/userAuth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(recoverPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDeatails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
