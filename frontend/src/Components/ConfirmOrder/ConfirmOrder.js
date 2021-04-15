import React from "react";
import { useSelector } from "react-redux";

import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import MetaData from "../MetaData";
import OrderData from "../reUseable/OrderData/OrderData";
import "./ConfirmOrder.style.css";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.user);
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
    <>
      <div className="confirmOrder">
        <CheckOutSteps shipping confirmOrder />
        <MetaData title="Confirm Order" />
        <div className="confirmOrder__body">
          <div className="confirmOrder__body__orderInfo">
            <h1 className="confirmOrder__body__orderInfo__title confirmOrder__title">
              Shipping Info
            </h1>
            <div>
              <OrderData title="Name:" values={user?.name} />
              <OrderData title="Phone:" values={shippingInfo?.contactNo} />
              <OrderData
                title="Address:"
                values={`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.postalCode}, ${shippingInfo?.country}`}
              />
            </div>
            <div>
              <hr />
              <h4 className="confirmOrder__title">Your Cart Item:</h4>
              <hr />
              {cartItems.map((item) => (
                <OrderData item={item} />
              ))}
            </div>
          </div>

          <div className="confirmOrder__body__subTotal">
            <h1 className="confirmOrder__body__subTotal__title confirmOrder__title">
              Order Summary
            </h1>
            <hr />
            <OrderData
              subTotal={{ itemPrice, shippingCharge, tax, totalPrice }}
              setValues={proceedToPayment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
