import React, { useState } from "react";
import "./Ratings.style.css";

const Ratings = ({ ratings }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="ratings">
      {[...Array(5)].map((stars, i) => {
        const ratingValue = i + 1;
        return ratings ? (
          <div
            className="ratings__label__star ratings__label__star__displayOnly"
            style={
              ratingValue <= ratings
                ? { background: "gold" }
                : { background: "rgb(170, 166, 166)" }
            }
          >
            <div
              className="ratings__label__star__displayOnly__innerDiv"
              style={
                ratingValue > ratings && 1 - (ratingValue - ratings) > 0
                  ? {
                      backgroundColor: "gold",
                      width: `${(1 - (ratingValue - ratings)) * 100}%`,
                    }
                  : { backgroundColor: "transparent" }
              }
            ></div>
          </div>
        ) : (
          <label className="ratings__label">
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
                  ? { background: "gold" }
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
