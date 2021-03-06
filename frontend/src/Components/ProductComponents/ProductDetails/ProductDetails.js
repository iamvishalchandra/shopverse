import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../../actions/cartActions";
import {
  clearErrors,
  getProductDetails,
} from "../../../actions/productActions";
// import Loader from "../reUseable/Loader/Loader";
// import MetaData from "../reUseable/MetaData";
import ProductImages from "../ProductImages/ProductImages";
import ProductReviewBox from "../ProductReviewBox/ProductReviewBox";
import ProductReviews from "../ProductReviews/ProductReviews";
// import Ratings from "../Ratings/Ratings";
import { amountFormatter } from "../../../helpers/useFullFunctions";
import "./ProductDetails.style.css";
import Ratings from "../../reUseable/Ratings/Ratings";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";

const ProductDetails = ({ match }) => {
  const [stock, setStock] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state?.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, error, match.params.id]);

  const addToCart = () => {
    dispatch(addItemsToCart(match.params.id, stock));
    alert.success("Added to cart.");
  };

  return (
    <div className="productDetails">
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <div className="productDetails__body">
            <div className="productDetails__body__photos">
              <ProductImages images={product?.images} />
            </div>
            <div className="productDetails__body__details">
              <h3 className="productDetails__body__details__title">
                {product.name}
              </h3>
              <p className="productDetails__body__details__id">
                ID: {product._id}
              </p>

              <hr />
              <div className="productDetails__body__details__userInputs">
                <div className="productDetails__body__details__userInputs__rating">
                  <Ratings ratings={product.rating} />
                </div>
                <span className="productDetails__body__details__userInputs__reviews">
                  ({product.totalReviews} Reviews)
                </span>
              </div>

              <hr />
              <p className="productDetails__body__details__price">
                ???{amountFormatter(product.price)}
              </p>
              <div
                className="productDetails__body__details__cart"
                style={{ display: product.stock < 1 ? "none" : null }}
              >
                <span
                  className="productDetails__body__details__cart__counter productDetails__body__details__cart__counter--decrease"
                  onClick={() => stock > 1 && setStock(stock - 1)}
                >
                  -
                </span>
                <input
                  type="number"
                  className="productDetails__body__details__cart__count"
                  value={stock}
                  readOnly
                />

                <span
                  className="productDetails__body__details__cart__counter productDetails__body__details__cart__counter--increase"
                  onClick={() => stock < product.stock && setStock(stock + 1)}
                >
                  +
                </span>
                <button
                  type="button"
                  className="productDetails__body__details__cart__addBtn"
                  disabled={product.stock <= 0}
                  onClick={addToCart}
                >
                  Add To Cart
                </button>
              </div>
              <hr />
              <p className="productDetails__body__details__stock">
                Status:{" "}
                {product.stock > 0 ? (
                  <span className="productDetails__body__details__stock__status productDetails__body__details__stock__status--in">
                    In Stock
                  </span>
                ) : (
                  <span className="productDetails__body__details__stock__status productDetails__body__details__stock__status--out">
                    Out of Stock
                  </span>
                )}
              </p>
              <hr />
              <div className="productDetails__body__details__description">
                <h4 className="productDetails__body__details__description__title">
                  Description:
                </h4>
                <p className="productDetails__body__details__description__content">
                  {product.description}
                </p>
              </div>

              <hr />
              <p className="productDetails__body__details__seller">
                Sold BY:{" "}
                <strong className="productDetails__body__details__seller__name">
                  {product.seller}
                </strong>
              </p>

              <ProductReviewBox
                reviews={product?.reviews}
                productId={match.params.id}
              />
            </div>
          </div>
          <ProductReviews
            totalRatings={product.rating}
            reviews={product?.reviews}
          />
        </>
      )}
    </div>
  );
};

export default ProductDetails;
