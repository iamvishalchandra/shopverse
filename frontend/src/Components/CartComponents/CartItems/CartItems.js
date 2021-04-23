import React from "react";
import { Link } from "react-router-dom";
import { amountFormatter } from "../../../helpers/useFullFunctions";
import "./CartItems.style.css";
const CartItems = ({ item, increaseQty, decreaseQty, removeItem }) => {
  return (
    <div className="cartItems" key={item?.product}>
      <div className="cartItems__product">
        <img
          className="cartItems__product__image"
          src={item.image}
          alt={item.name}
        />
        <p className="cartItems__product__price">
          ₹{amountFormatter(item.price)}
        </p>
      </div>
      <div className="cartItems__details">
        <Link
          className="cartItems__details__name"
          to={`/product/${item.product}`}
        >
          {item.name}
        </Link>
        <div className="cartItems__details__value">
          <div className="cartItems__details__value__options">
            {item.stock > 0 ? (
              <div className="cartItems__details__value__options__quantity">
                <span
                  className="cartItems__details__value__options__quantity__count--decrease cartItems__details__value__options__quantity__count"
                  onClick={() => decreaseQty(item.product, item.quantity)}
                >
                  -
                </span>
                <input
                  className="cartItems__details__value__options__quantity__value"
                  type="number"
                  value={item.quantity}
                  readOnly
                />
                <span
                  className="cartItems__details__value__options__quantity__count--increase cartItems__details__value__options__quantity__count"
                  onClick={() =>
                    increaseQty(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </span>
              </div>
            ) : (
              <p className="cartItems__details__value__offstock">
                Currently Out Of Stock
              </p>
            )}

            <div className="cartItems__details__value__options__delete">
              <img
                className="cartItems__details__value__options__delete__icon"
                onClick={() => removeItem(item.product)}
                src="/photo/delete-512.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
