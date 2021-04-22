import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrderDetails } from "../../../actions/orderActions";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import OrderData from "../../reUseable/OrderData/OrderData";
import "./OrderDetail.style.css";

const OrderDetail = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state?.orderDetails);

  //   const { address, city, contactNo, country, postalCode } = order?.shippingInfo;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  //   const {
  //     shippingInfo,
  //     orderItems,
  //     paymentInfo,
  //     user,
  //     totalPrice ,
  //     orderStatus,
  //   } = order;

  return (
    <div className="orderDetail">
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetail__container">
          <OrderData order={order} link="/orders/me" />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
