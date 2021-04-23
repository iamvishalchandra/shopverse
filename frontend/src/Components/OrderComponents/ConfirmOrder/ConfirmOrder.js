import React from "react";
import { useSelector } from "react-redux";
import { amountFormatter } from "../../../helpers/useFullFunctions";
import MetaData from "../../reUseable/MetaData";
import OrderData from "../../reUseable/OrderData/OrderData";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import "./ConfirmOrder.style.css";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.user);
  const orderItems = [];
  cartItems?.map((item) => item.stock > 0 && orderItems.push(item));

  const itemPrice = orderItems.reduce(
    (acc, item) => item.price * item.quantity + acc,
    0
  );
  const shippingCharge = itemPrice > 499 ? 0 : 50;

  const tax = 0.1 * itemPrice;

  const totalPrice = (itemPrice + shippingCharge + tax).toFixed(2);

  const proceedToPayment = () => {
    const data = {
      itemPrice: itemPrice.toFixed(2),
      shippingCharge: shippingCharge,
      tax: tax.toFixed(2),
      totalPrice: totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };
  const order = {
    shippingInfo,
    orderItems,
    user,
    totalPrice,
    shippingPrice: shippingCharge,
    taxPrice: tax,
  };
  return (
    <>
      <div className="confirmOrder">
        <CheckOutSteps shipping confirmOrder />
        <MetaData title="Confirm Order" />
        <div className="confirmOrder__body">
          <OrderData
            order={order}
            isConfirmOrder
            setValues={proceedToPayment}
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
