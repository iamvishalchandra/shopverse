const express = require("express");
const router = express.Router();
const {
  sendStripeApi,
  processPayment,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middlewares/userAuth");

router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);
router.route("/payment/process").post(isAuthenticatedUser, processPayment);

module.exports = router;
