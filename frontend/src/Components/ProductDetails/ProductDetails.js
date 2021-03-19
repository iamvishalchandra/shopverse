import React from "react";
import "./ProductDetails.style.css";

const ProductDetails = () => {
  return (
    <div className="productDetails">
      <div className="productDetails__photos">
        <img
          className="productDetails__photos__image"
          src="/photo/logo.png"
          alt=""
        />
      </div>
      <div className="productDetails__details">
        <h3 className="productDetails__details__title"></h3>
        <p className="productDetails__details_id">Product ID</p>

        <hr />

        <div className="productDetails__details__rating">SSSS</div>
        <span className="productDetails__details__reviews">(100 Reviews)</span>

        <hr />
        <p className="productDetails__details__price">RS. 1000</p>
        <div className="productDetails__details__cart">
          <span className="productDetails__details__cart__increase">-</span>
          <input
            type="number"
            className="productDetails__details__cart__count"
            value="1"
            readOnly
          />

          <span className="productDetails__details__cart__decrease">+</span>
          <button type="button" className="productDetails__details__cart__add">
            ADD TO CART
          </button>
          <hr />
          <p className="productDetails__details__cart__stock">
            Status:{" "}
            <span className="productDetails__details__cart__status"></span>{" "}
          </p>
          <hr />
          <h4 className="productDetails__details__cart__description__title">
            Description:
          </h4>
          <p className="productDetails__details__cart__description__text">
            gpjg[ps'gm;djgpwhdpiauqwgdoue;shgoiwfhpuoiaghfouafae
          </p>

          <hr />
          <p className="productDetails__details__cart__seller">
            Sold BY:{" "}
            <strong className="productDetails__details__cart__seller__name">
              AMAZON
            </strong>
          </p>

          <button
            className="productDetails__details__cart__addReview"
            type="submit"
          >
            SUBMIT YOUR REVIEW
          </button>

          <div>
            <div className="rating">
              <div
                className="rating__model"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="rating__modelLabel"
                aria-hidden="true"
              >
                <div className="model__dialog" role="document">
                  <div className="model__content">
                    <div className="model__header">
                      <h5 className="model__title">Submit Review</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="rating"
                        aria-label="close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="rating-body">
                      <ul className="stars">
                        <li className="star">
                          <li className="fa"></li>
                        </li>
                        <li className="star">
                          <li className="fa"></li>
                        </li>
                        <li className="star">
                          <li className="fa"></li>
                        </li>
                        <li className="star">
                          <li className="fa"></li>
                        </li>
                      </ul>
                      <textarea
                        name="review"
                        id="review"
                        className="form-control"
                      ></textarea>

                      <button
                        className="review"
                        data-dismiss="rating"
                        aria-label="close"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
