import React, { useState } from "react";
import Ratings from "../Ratings/Ratings";
import "./ProductReviewBox.style.css";

const ProductReviewBox = () => {
  const [popup, setPopup] = useState(false);

  return (
    <div className="productReviewBox">
      <button
        onClick={() => setPopup(true)}
        className="productReviewBox__addReview"
      >
        Submit Your Review
      </button>
      {popup && (
        <div className="productReviewBox__body">
          <div className="productReviewBox__body__top">
            <h5 className="productReviewBox__body__top__title">
              Submit Review
            </h5>
            <button
              type="button"
              onClick={() => setPopup(false)}
              className="productReviewBox__body__top__closebtn"
            >
              <span>&times;</span>
            </button>
          </div>
          <hr />
          <div className="productReviewBox__body__rating">
            <Ratings />
          </div>
          <hr />
          <div className="productReviewBox__body__review">
            <textarea
              name="review"
              id="review"
              className="productReviewBox__body__review__box"
            ></textarea>
          </div>
          <div className="productReviewBox__body__submit">
            <button
              className="productReviewBox__body__submit__button"
              data-dismiss="rating"
              aria-label="close"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviewBox;
