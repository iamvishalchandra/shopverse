import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import FormOptions from "../reUseable/FormOptions/FormOptions";
import OrderData from "../reUseable/OrderData/OrderData";
import "./OrderDetail.style.css";

const OrderDetail = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state?.orderDetails);

  //   const { address, city, contactNo, country, postalCode } = order?.shippingInfo;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);
  console.log(order);
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
          <h1 className="orderDetail__container__title">Order #{order?._id}</h1>
          <div className="orderDetail__container__info">
            <div className="orderDetail__container__info__shipping">
              <h4>Shipping Info</h4>
              <OrderData values={order?.user?.name} title="Name:" />
              <OrderData
                values={order?.shippingInfo?.contactNo}
                title="Phone:"
              />
              <OrderData
                values={`
            ${order?.shippingInfo?.address},
            ${order?.shippingInfo?.city},
            ${order?.shippingInfo?.country},
            `}
                title="Address:"
              />
              <OrderData
                values={order?.shippingInfo?.postalCode}
                title="PinCode:"
              />

              <hr />
            </div>
            <div>
              <h4>Payment Info</h4>

              <OrderData
                values={`₹${order?.totalPrice?.toFixed(2)}`}
                title="Amount:"
              />

              {order?.paymentInfo?.status === "succeeded" ? (
                <OrderData
                  values="PAID"
                  title="Status:"
                  styleValue={{ color: "#75f323", fontWeight: "bold" }}
                />
              ) : (
                <OrderData
                  values="NOT PAID"
                  title="Status:"
                  styleValue={{ color: "red", fontWeight: "bold" }}
                />
              )}
            </div>
            <div>
              <h4>Order Status</h4>
              <OrderData title="Ordered On:" values={order?.createdAt} />

              {String(order?.orderStatus)?.includes("Delivered") ? (
                <OrderData
                  values={order?.orderStatus}
                  title="Delivery:"
                  styleValue={{ color: "#75f323", fontWeight: "bold" }}
                />
              ) : (
                <OrderData
                  values={order?.orderStatus}
                  title="Delivery:"
                  styleValue={{ color: "red", fontWeight: "bold" }}
                />
              )}
            </div>
          </div>
          <div className="orderDetail__container__details">
            <h4>Order Items:</h4>
            <hr />
            <div>
              {order?.orderItems?.map((item) => (
                <OrderData item={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      <FormOptions
        setValues={() => history.push("/orders/me")}
        formItem="button"
        text="Back To Orders"
      />
    </div>
  );
};

export default OrderDetail;
