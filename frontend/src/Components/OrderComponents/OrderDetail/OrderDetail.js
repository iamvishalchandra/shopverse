import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrderDetails } from "../../../actions/orderActions";
import Loader from "../../reUseable/Loader/Loader";
import MetaData from "../../reUseable/MetaData";
import OrderData from "../../reUseable/OrderData/OrderData";
import "./OrderDetail.style.css";

const OrderDetail = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state?.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  return (
    <div className="orderDetail">
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        <div className="orderDetail__container">
          <h3 className="orderDetail__container__orderNo">
            Order Number #<b>{order._id}</b>
          </h3>
          <OrderData
            order={order}
            setValues={() => history.push("/orders/me")}
          />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
