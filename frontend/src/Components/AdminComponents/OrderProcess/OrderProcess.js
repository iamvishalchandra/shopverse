import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../MetaData";
import Sidebar from "../Sidebar/Sidebar";
import "./OrderProcess.style.css";
const OrderProcess = ({ match, history }) => {
  const [status, setStatus] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    erderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = useSelector((state) => state.productDetails);

  const { error, isOrderUpdated } = useSelector((state) => state.updateOrder);

  const orderID = match.params.id;

  return (
    <div className="orderProcess">
      <MetaData title="Process Order" />
      <Sidebar />
      <div>
        <h1>Process Order</h1>
      </div>
    </div>
  );
};

export default OrderProcess;
