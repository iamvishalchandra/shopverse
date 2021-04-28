import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../actions/cartActions";

import { amountFormatter } from "../../../helpers/useFullFunctions";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import MetaData from "../../reUseable/MetaData";
import CartItems from "../CartItems/CartItems";
import "./Cart.style.css";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const inStockItems = [];

  cartItems.map((items) => items.stock > 0 && inStockItems.push(items));
  const totalAmount = inStockItems?.reduce(
    (acc, item) => item.price * item.quantity + acc,
    0
  );

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

  return (
    <div className="cart">
      <MetaData title="Your Shopverse Cart" />
      {cartItems.length === 0 ? (
        <h1 className="cart__title">Your Cart Is empty</h1>
      ) : (
        <div className="cart__container">
          <h1 className="cart__title">
            Your Cart: <b>{cartItems.length} Item(s)</b>
          </h1>
          <div className="cart__container__products">
            <div className="cart__container__products__items">
              {cartItems.map((item) => (
                <div key={item.product}>
                  <hr />

                  <CartItems
                    item={item}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                    removeItem={removeItem}
                  />
                </div>
              ))}
              <hr />
            </div>

            <div className="cart__container__products__summary">
              <h4 className="cart__container__products__summary__title">
                Order Summary
              </h4>

              <div className="cart__container__products__summary__quantities">
                <div
                  style={{ display: "flex", flexWrap: "wrap" }}
                  className="cart__container__products__summary__quantities__data"
                >
                  <p className="cart__container__products__summary__quantities__data__subtotal cart__container__products__summary__quantities__data__name">
                    Subtotal:{" "}
                    <span className="cart__container__products__summary__quantities__data__subtotal__units cart__container__products__summary__quantities__data__name__value">
                      {inStockItems?.reduce(
                        (acc, item) => item?.quantity + acc,
                        0
                      )}{" "}
                    </span>
                    Unit(s)
                  </p>
                  <p className="cart__container__products__summary__quantities__data__subtotal cart__container__products__summary__quantities__data__name">
                    Shipping Cost:
                    <span className="cart__container__products__summary__quantities__data__subtotal__units cart__container__products__summary__quantities__data__name__value">
                      {inStockItems?.reduce(
                        (acc, item) => item.price * item.quantity + acc,
                        0
                      ) < 500 ? (
                        inStockItems?.reduce(
                          (acc, item) => item.price * item.quantity + acc,
                          0
                        ) > 0 ? (
                          <>
                            <span style={{ color: "black" }}> ₹</span>50
                          </>
                        ) : (
                          0
                        )
                      ) : (
                        " Free"
                      )}{" "}
                    </span>
                  </p>
                  <p className="cart__container__products__summary__quantities__data__name">
                    Total Amount: ₹
                    <span className="cart__container__products__summary__quantities__data__name__value">
                      {amountFormatter(totalAmount)}
                    </span>
                  </p>
                </div>

                <FormOptions
                  disabled={totalAmount < 1}
                  formItem="button"
                  text={user ? "CheckOut" : "Login to Checkout"}
                  setValues={() =>
                    history?.push(user ? "/login?redirect=shipping" : "/login")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
