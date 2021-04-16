import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getOrderDetails,
  updateOrderAction,
} from "../../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import Loader from "../../Loader/Loader";
import MetaData from "../../MetaData";
import OrderInfo from "../../reUseable/OrderInfo/OrderInfo";
import Sidebar from "../Sidebar/Sidebar";
import "./OrderProcess.style.css";
const OrderProcess = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, order } = useSelector((state) => state?.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = useSelector((state) => state.productDetails);

  const { error, isOrderUpdated } = useSelector((state) => state?.updateOrder);

  const [status, setStatus] = useState(order?.orderStatus);

  const orderId = match.params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isOrderUpdated) {
      alert.error(isOrderUpdated);
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isOrderUpdated, alert, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    console.log(status);
    formData.set("orderStatus", status);

    dispatch(updateOrderAction(id, formData));
  };

  const shippingAddress = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.postalCode}, ${shippingInfo?.country}`;
  const isPaid = paymentInfo?.status === "success" ? true : false;

  return (
    <div className="orderProcess">
      <MetaData title={`Process Order #${order?._id}`} />
      <Sidebar />
      <div>
        <h1>Process Order</h1>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {order && (
                <OrderInfo
                  order={order}
                  isAdmin
                  status={status}
                  setStatus={setStatus}
                  updateOrder={updateOrderHandler}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderProcess;
