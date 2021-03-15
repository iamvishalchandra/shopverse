const ProductModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

// create new ProductModel => /api/v1/admin/products/new
exports.newProductModel = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await ProductModel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products => /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resultsPerPage = 4;
  const productCount = await ProductModel.countDocuments(); //to be used with front-end

  const apiFeatures = new APIFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});

// Get single product's details => /api/v1/products/:id

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product doesn't exist", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

// Update product => /api/v1/admin/products/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product doesn't exist", 404));

  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product => /api/v1/admin/products/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product doesn't exist", 404));

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product succesfully deleted",
  });
});
