const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Process Stripe Payments => /api/v1/payment/process
exports.processPayment = catchAsyncError(async (req, res, next) => {
  const amt = await req.body.amount;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

//Send Stripe Api => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
