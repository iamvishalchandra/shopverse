import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../../actions/orderActions";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import "./ListOrders.style.css";
import OrderInfo from "../../reUseable/OrderInfo/OrderInfo";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  return (
    <div className="listOrders">
      <MetaData title="My Orders" />
      <h1 className="listOrders__title">Your Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {orders?.map((order) => (
            <div className="listOrders__orders" key={order._id}>
              <OrderInfo order={order} isUser />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ListOrders;
