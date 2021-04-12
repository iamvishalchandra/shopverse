import React from "react";
import "./Ratings.style.css";

const Ratings = ({ ratings, rating, setRating, hover, setHover }) => {
  // const [rating, setRating] = useState(null);
  // const [hover, setHover] = useState(null);

  return (
    <div className="ratings">
      {[...Array(5)].map((stars, i) => {
        const ratingValue = i + 1;
        return ratings ? (
          <div
            key={ratingValue}
            className="ratings__label__star ratings__label__star__displayOnly"
            style={
              ratingValue <= ratings
                ? { background: "orange" }
                : { background: "rgb(170, 166, 166)" }
            }
          >
            <div
              className="ratings__label__star__displayOnly__innerDiv"
              style={
                ratingValue > ratings && 1 - (ratingValue - ratings) > 0
                  ? {
                      backgroundColor: "orange",
                      width: `${(1 - (ratingValue - ratings)) * 100}%`,
                    }
                  : { backgroundColor: "transparent" }
              }
            ></div>
          </div>
        ) : (
          <label className="ratings__label" key={ratingValue}>
            <input
              className="ratings__label__input"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />

            <div
              className="ratings__label__star"
              style={
                ratingValue <= (hover || rating)
                  ? hover
                    ? { background: "gold" }
                    : { background: "orange" }
                  : { background: "rgb(170, 166, 166)" }
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            ></div>
          </label>
        );
      })}
    </div>
  );
};

export default Ratings;
