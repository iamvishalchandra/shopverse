const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/userAuth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/detail/:id").get(isAuthenticatedUser, getSingleOrder);
// router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/:uid").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
