const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProductModel,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReviews,
} = require("../controllers/productController");

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/userAuth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProductModel);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
