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
  const resultsPerPage = 10;
  const productCount = await ProductModel.countDocuments(); //to be used with front-end

  const apiFeatures = new APIFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeatures.query;

  // setTimeout(() => {
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
  // }, 2000);
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

  res
    .status(200)
    .json({ success: true, message: "Product succesfully deleted" });
});

// Create new Review => /api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await ProductModel.findById(productId);

  const isReviewed = await product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.totalReviews = product.reviews.length;
  }

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

// Get Product Review => /api/v1/review
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.id);

  res.status(200).json({ success: true, reviews: product.reviews });
});

// Get Product Review => /api/v1/review
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productid);

  const reviews = await product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const totalReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await ProductModel.findByIdAndUpdate(
    req.query.productid,
    {
      reviews,
      ratings,
      totalReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true });
});
