import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartActions";

import CartItems from "../CartItems/CartItems";
import MetaData from "../MetaData";
import "./Cart.style.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty < 1) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const removeItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  // const subTotal = cartItems.reduce((acc, item) => console.log(acc?.price));
  // console.log(subTotal);
  return (
    <div className="cart">
      <MetaData title="Your Shopverse Cart" />
      {cartItems.length === 0 ? (
        <h1>Your Cart Is empty</h1>
      ) : (
        <div className="temp">
          <h1>
            Your Cart: <b>{cartItems.length} Item(s)</b>
          </h1>
          <div className="temp2">
            <div className="items">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <CartItems
                    item={item}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    key={item.product}
                    removeItem={removeItem}
                  />
                  <hr />
                </>
              ))}
            </div>

            <div>
              <div>
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span>
                    {cartItems?.reduce((acc, item) => item?.quantity + acc, 0)}{" "}
                    Unit(s)
                  </span>
                </p>
                <p>
                  Total Amount:{" "}
                  <span>
                    ₹
                    {cartItems
                      ?.reduce(
                        (acc, item) => item.price * item.quantity + acc,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <hr />
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
