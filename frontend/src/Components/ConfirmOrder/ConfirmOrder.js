import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import MetaData from "../MetaData";
import "./ConfirmOrder.style.css";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const itemPrice = cartItems.reduce(
    (acc, item) => item.price * item.quantity + acc,
    0
  );
  const shippingCharge = itemPrice > 499 ? 0 : 50;
  const tax = Number((0.1 * itemPrice).toFixed(2));
  const totalPrice = (itemPrice + shippingCharge + tax).toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemPrice: itemPrice.toFixed(2),
      shippingCharge,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };

  return (
    <div className="confirmOrder">
      <MetaData title="Confirm Order" />
      <CheckOutSteps shipping confirmOrder />
      <div>
        <h4>Shipping Info</h4>
        <p>
          <b>Name: </b>
          {user.name}
        </p>
        <p>
          <b>Phone: </b>
          {shippingInfo.phoneNo}
        </p>
        <p>
          <b>Address: </b> {shippingInfo.address}, {shippingInfo.city},{" "}
          {shippingInfo.postalCode}, {shippingInfo.country}
        </p>
        <hr />
        <h4>Your Cart Item:</h4>
        <hr />
        {cartItems.map((item) => (
          <div>
            <div>
              <div>
                <img src="" alt="" />
              </div>
              <Link>{item.name}</Link>
            </div>
            <div>
              <p>
                {item.quantity} x {item.price} ={" "}
                <b>{(item.quantity * item.price).toFixed(2)}</b>
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <div>
          <h4>Order Summary</h4>
          <hr />
          <p>
            Subtotal: <span>₹{itemPrice}</span>
          </p>
          <p>
            Shipping: <span>₹{shippingCharge}</span>
          </p>
          <p>
            GST: <span>₹{tax} ( CGST = 5%, SGST = 5% )</span>
          </p>
          <hr />
          <p>
            Total: <span>₹{totalPrice}</span>
          </p>
          <hr />

          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
