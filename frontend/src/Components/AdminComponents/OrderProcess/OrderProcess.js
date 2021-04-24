import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getOrderDetails,
  updateOrderAction,
} from "../../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import OrderInfo from "../../reUseable/OrderInfo/OrderInfo";
import Sidebar from "../Sidebar/Sidebar";
import "./OrderProcess.style.css";
const OrderProcess = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order } = useSelector((state) => state?.orderDetails);

  const { error, isOrderUpdated } = useSelector((state) => state?.updateOrder);

  const [status, setStatus] = useState("Processing");
  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isOrderUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isOrderUpdated, alert, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("orderStatus", status);
    dispatch(updateOrderAction(id, formData));
  };

  return (
    <div className="orderProcess">
      <MetaData title={`Process Order #${order?._id}`} />
      <Sidebar />
      <div className="orderProcess__container">
        <h1 className="orderProcess__container__title">Process Order</h1>
        <div className="orderProcess__container__data">
          {loading ? (
            <Loader />
          ) : (
            order && (
              <OrderInfo
                order={order}
                isAdmin
                status={status}
                setStatus={setStatus}
                updateOrder={updateOrderHandler}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderProcess;
