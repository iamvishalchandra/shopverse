import { useSelector } from "react-redux";
import Ratings from "../../reUseable/Ratings/Ratings";
// import Ratings from "../Ratings/Ratings";
import "./ProductReviews.style.css";

const ProductReviews = ({ totalRatings, reviews }) => {
  const { user } = useSelector((state) => state?.user);

  return (
    <div className="productReviews">
      <h1 className="productReviews__heading">Customer(s) Review</h1>
      <div className="productReviews__overallReviews">
        <Ratings ratings={totalRatings} />
        <p className="productReviews__overallReviews__customerRratings">
          {totalRatings} out of 5 (
          <span style={{ color: "red" }}>{reviews?.length} Customer(s)</span>)
        </p>
      </div>
      {reviews?.length > 0 && (
        <div className="productReviews__body">
          {reviews.map((review) => (
            <div className="productReviews__body__details" key={review._id}>
              <div className="productReviews__body__details__user">
                <img
                  className="productReviews__body__details__user__avatar"
                  src={"/photo/logo.png"}
                  alt=""
                />
                {user?._id === review.user ? (
                  <p className="productReviews__body__details__user__name">
                    You
                  </p>
                ) : (
                  <p className="productReviews__body__details__user__name">
                    {review.name}
                  </p>
                )}
                <Ratings ratings={review.rating} />
              </div>

              <p className="productReviews__body__details__comment">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
