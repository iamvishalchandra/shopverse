import React from "react";
import { Link } from "react-router-dom";
import "./CartItems.style.css";
const CartItems = ({ item, increaseQty, decreaseQty, removeItem }) => {
  return (
    <div className="cartItems" key={item.product}>
      <img className="cartItems__image" src="/photo/logo.png" alt={item.name} />

      <Link className="cartItems__name" to={`/product/${item.product}`}>
        {item.name}
      </Link>

      <div className="cartItems__price">
        <p className="cartItems__price__value">₹{item.price} </p>
      </div>

      <div className="cartItems__quantity">
        <span
          className="cartItems__quantity__count--decrease cartItems__quantity__count"
          onClick={() => decreaseQty(item.product, item.quantity)}
        >
          -
        </span>
        <input
          className="cartItems__quantity__value"
          type="number"
          value={item.quantity}
          readOnly
        />
        <span
          className="cartItems__quantity__count--increase cartItems__quantity__count"
          onClick={() => increaseQty(item.product, item.quantity, item.stock)}
        >
          +
        </span>
      </div>

      <div className="cartItems__delete">
        <i
          className="cartItems__delete__icon"
          onClick={() => removeItem(item.product)}
        >
          Delete
        </i>
      </div>
    </div>
  );
};

export default CartItems;
