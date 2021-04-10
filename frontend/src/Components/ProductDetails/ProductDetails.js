import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartActions";
import { clearErrors, getProductDetails } from "../../actions/productActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import ProductReviewBox from "../ProductReviewBox/ProductReviewBox";
import Ratings from "../Ratings/Ratings";
import "./ProductDetails.style.css";

const ProductDetails = ({ match }) => {
  const [stock, setStock] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
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
          <div className="productDetails__photos">
            <Carousel pause="hover">
              <img
                className="productDetails__photos__image"
                src="/photo/logo.png"
                alt={product.name}
              />
            </Carousel>
          </div>
          <div className="productDetails__details">
            <h3 className="productDetails__details__title">{product.name}</h3>
            <p className="productDetails__details__id">ID: {product._id}</p>

            <hr />
            <div className="productDetails__details__userInputs">
              <div className="productDetails__details__userInputs__rating">
                <Ratings ratings={product.rating} />
              </div>
              <span className="productDetails__details__userInputs__reviews">
                ({product.totalReviews} Reviews)
              </span>
            </div>

            <hr />
            <p className="productDetails__details__price">₹{product.price}</p>
            <div className="productDetails__details__cart">
              <span
                className="productDetails__details__cart__counter productDetails__details__cart__counter--decrease"
                onClick={() => stock > 1 && setStock(stock - 1)}
              >
                -
              </span>
              <input
                type="number"
                className="productDetails__details__cart__count"
                value={stock}
                readOnly
              />

              <span
                className="productDetails__details__cart__counter productDetails__details__cart__counter--increase"
                onClick={() => stock < product.stock && setStock(stock + 1)}
              >
                +
              </span>
              <button
                type="button"
                className="productDetails__details__cart__addBtn"
                disabled={product.stock <= 0}
                onClick={addToCart}
              >
                Add To Cart
              </button>
            </div>
            <hr />
            <p className="productDetails__details__stock">
              Status:{" "}
              {product.stock > 0 ? (
                <span className="productDetails__details__stock__status productDetails__details__stock__status--in">
                  In Stock
                </span>
              ) : (
                <span className="productDetails__details__stock__status productDetails__details__stock__status--out">
                  Out of Stock
                </span>
              )}
            </p>
            <hr />
            <div className="productDetails__details__description">
              <h4 className="productDetails__details__description__title">
                Description:
              </h4>
              <p className="productDetails__details__description__content">
                {product.description}
              </p>
            </div>

            <hr />
            <p className="productDetails__details__seller">
              Sold BY:{" "}
              <strong className="productDetails__details__seller__name">
                {product.seller}
              </strong>
            </p>

            <ProductReviewBox />

            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
