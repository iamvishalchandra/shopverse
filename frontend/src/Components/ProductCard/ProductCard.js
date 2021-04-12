import React from "react";
import { Link } from "react-router-dom";
import Ratings from "../Ratings/Ratings";
import "./ProductCard.style.css";

const ProductCard = ({ link, name, images, ratings, reviews, price }) => {
  return (
    <div className="productCard" id={link}>
      <img src={images} alt={images} className="productCard__photo" />
      <div className="productCard__title">
        <h5 className="productCard__title__text">
          <Link
            className="productCard__title__text__link"
            to={`/products/${link}`}
          >
            {name}
          </Link>
        </h5>
      </div>
      <div className="productCard__rating">
        <div className="productCard__rating__stars">
          <div className="productCard__rating__stars__icon">
            <Ratings ratings={ratings} />
          </div>
        </div>
        <span className="productCard__rating__reviews">
          ({reviews} Reviews)
        </span>
      </div>
      <p className="productCard__price">₹{price}</p>

      <Link to={`/product/${link}`} className="productCard__viewDetails">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
