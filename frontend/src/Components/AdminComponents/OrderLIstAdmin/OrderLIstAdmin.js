import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteOrderAction,
  getAllOrders,
} from "../../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import OrderInfo from "../../reUseable/OrderInfo/OrderInfo";
import Sidebar from "../Sidebar/Sidebar";
import "./OrderLIstAdmin.style.css";

const OrderLIstAdmin = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isOrderDeleted } = useSelector((state) => state.updateOrder);

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (isOrderDeleted) {
      alert.error("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isOrderDeleted, history]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderAction(id));
  };

  return (
    <div className="orderLIstAdmin">
      <MetaData title="All Orders" />
      <Sidebar />
      <div className="orderLIstAdmin__container">
        <h1 className="orderLIstAdmin__container__title">
          All User's Order List
        </h1>

        {loading ? (
          <Loader />
        ) : (
          orders?.map((order) => (
            <div key={order._id}>
              <OrderInfo
                order={order}
                isAdminList
                deleteOrder={deleteOrderHandler}
                keyId={order._id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderLIstAdmin;
