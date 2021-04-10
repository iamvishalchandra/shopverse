import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import "./OrderDetail.style.css";

const OrderDetail = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state?.orderDetails);

  console.log(order);

  //   const { address, city, contactNo, country, postalCode } = order?.shippingInfo;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
    if (error) {
      console.log(error);
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
        <div>
          <h1>Order #{order?._id}</h1>
          <h4>Shipping Info</h4>
          <p>
            <b>Name: </b>
            {order?.user?.name}
          </p>
          <p>
            <b>Phone: </b>
            {order?.shippingInfo?.contactNo}
          </p>
          <p>
            <b>Address: </b> {order?.shippingInfo?.address}
          </p>
          <p>
            <b>City: </b> {order?.shippingInfo?.city}
          </p>
          <p>
            <b>Postal Code: </b> {order?.shippingInfo?.postalCode}
          </p>
          <p>
            <b>Country: </b> {order?.shippingInfo?.country}
          </p>
          <p>
            <b>Amount: </b> ₹{order?.totalPrice}
          </p>
          <hr />

          <h4>Payment Info</h4>

          {order?.paymentInfo?.status === "succeeded" ? (
            <p>
              <b style={{ color: "#75f323" }}>PAID </b>
            </p>
          ) : (
            <p>
              <b style={{ color: "red" }}>NOT PAID </b>
            </p>
          )}
          <h4>Order Status:</h4>
          <p>
            {String(order?.orderStatus)?.includes("Delivered") ? (
              <b style={{ color: "#75f323" }}>{order.orderStatus}</b>
            ) : (
              <b style={{ color: "red" }}>{order.orderStatus}</b>
            )}
          </p>
          <h4>Order Items:</h4>
          <hr />
          <div>
            {order?.orderItems?.map((item) => (
              <div>
                <div>
                  <img src="" alt={item.name} />
                </div>
                <div>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                <div>
                  <p>₹{item.price}</p>
                </div>
                <div>
                  <p>{item.quantity} Unit(s)</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
