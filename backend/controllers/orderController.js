const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Create New Order => /api/v1/order/new

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await OrderModel.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Single Order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) return next(new ErrorHandler("No such order exist", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

// Get Orders of Logged User => /api/v1/orders/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Orders - ADMIN => /api/v1/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find();

  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update/Process Order - ADMIN => /api/v1/admin/orders/:id

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("This Order is already delivered", 404));

  order.orderItems.forEach(
    async (item) => await updateStock(item.product, item.quantity)
  );

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({ success: true });
});

async function updateStock(id, quantity) {
  const product = await ProductModel.findById(id);

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete Order - ADMIN => /api/v1/admin/orders/:id

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) return next(new ErrorHandler("No such Order exist.", 404));

  await order.remove();

  res.status(200).json({ success: true });
});
