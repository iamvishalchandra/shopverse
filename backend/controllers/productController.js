const ProductModel = require("../models/productModel");

// create new ProductModel => /api/v1/admin/products/new
exports.newProductModel = async (req, res, next) => {
  const product = await ProductModel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// Get All Products => /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await ProductModel.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

// Get single product's details => /api/v1/products/:id

exports.getSingleProduct = async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product)
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });

  res.status(200).json({
    success: true,
    product,
  });
};

// Update product => /api/v1/admin/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete product => /api/v1/admin/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product succesfully deleted",
    });
  } catch (err) {
    console.log(err);
  }
};
