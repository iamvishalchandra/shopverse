import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, newReview } from "../../actions/productActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

import Ratings from "../Ratings/Ratings";
import "./ProductReviewBox.style.css";

const ProductReviewBox = ({ reviews, productId }) => {
  const { user } = useSelector((state) => state?.user);

  const { error, success } = useSelector((state) => state.newReview);
  const alert = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review posted successfully.");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, success]);

  let userReview;

  reviews?.map((review) =>
    review.user === user?._id
      ? (userReview = { rating: review.rating, comment: review.comment })
      : ""
  );

  const [popup, setPopup] = useState(false);
  const [comment, setComment] = useState(userReview?.comment);
  const [rating, setRating] = useState(userReview?.rating);
  const [hover, setHover] = useState(0);

  const submitHandle = (e) => {
    e.preventDefault();
    if (rating <= 0) return alert.error("Pls give rating before submitting");

    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);
    // console.log(rating, comment);
    // console.log("FormData-", formData);
    dispatch(newReview(formData));
    setRating(0);
    setComment("");

    setPopup(false);
  };

  return (
    <div className="productReviewBox">
      {user ? (
        <button
          onClick={() => setPopup(true)}
          className="productReviewBox__addReview"
        >
          Submit Your Review
        </button>
      ) : (
        <Link to="/login">
          <div className="productReviewBox__loginWarning">Login To Review</div>
        </Link>
      )}

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
            <Ratings
              rating={rating}
              setRating={setRating}
              hover={hover}
              setHover={setHover}
            />
          </div>

          <div className="productReviewBox__body__review">
            <textarea
              name="review"
              id="review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="productReviewBox__body__review__box"
            ></textarea>
          </div>
          <div className="productReviewBox__body__submit">
            <button
              className="productReviewBox__body__submit__button"
              data-dismiss="rating"
              // aria-label="close"
              onClick={submitHandle}
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
