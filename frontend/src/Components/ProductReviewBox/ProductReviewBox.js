import React, { useState } from "react";
import "./ProductReviewBox.style.css";

const ProductReviewBox = () => {
  const [popup, setPopup] = useState(false);
  // function reviewBox() {

  // }

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
            <ul className="productReviewBox__body__rating__stars">
              <li className="productReviewBox__body__rating__stars__icon productReviewBox__body__rating__stars__icon--1">
                <li className="fa">Star 1</li>
              </li>
              <li className="productReviewBox__body__rating__stars__icon productReviewBox__body__rating__stars__icon--2">
                <li className="fa">Star 2</li>
              </li>
              <li className="productReviewBox__body__rating__stars__icon productReviewBox__body__rating__stars__icon--3">
                <li className="fa">Star 3</li>
              </li>
              <li className="productReviewBox__body__rating__stars__icon productReviewBox__body__rating__stars__icon--4">
                <li className="fa">Star 4</li>
              </li>
              <li className="productReviewBox__body__rating__stars__icon productReviewBox__body__rating__stars__icon--5">
                <li className="fa">Star 5</li>
              </li>
            </ul>
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
