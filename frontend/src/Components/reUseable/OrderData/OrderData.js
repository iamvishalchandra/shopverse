import React from "react";
import { Link } from "react-router-dom";
import {
  amountFormatter,
  dateFormatter,
} from "../../../helpers/useFullFunctions";
import FormOptions from "../FormOptions/FormOptions";
import "./OrderData.style.css";

const OrderData = ({ order, isConfirmOrder, setValues }) => {
  return (
    <div className="orderData">
      <div className="orderData__container">
        <div className="orderData__container__info">
          <div className="orderData__container__info__shippingInfo">
            <h1 className="orderData__container__title">Shipping Info</h1>
            <p>
              Name: <b>{order?.user?.name}</b>
            </p>
            <p>
              Address:{" "}
              <b>
                {`${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.country}`}
              </b>
            </p>
            <p>
              Pincode:
              <b> {order?.shippingInfo?.postalCode}</b>
            </p>
            <p>
              Contact:
              <b> {order?.shippingInfo?.contactNo}</b>
            </p>
          </div>
          {!isConfirmOrder && (
            <div className="orderData__container__info__paymentInfo">
              <h1 className="orderData__container__title">Order Info</h1>
              <p>
                Ordered On: <b>{dateFormatter(order.createdAt)} </b>
              </p>
              <p>
                Payment Status:{" "}
                {order?.paymentInfo?.status === "succeeded" ? (
                  <b style={{ color: "rgb(117, 243, 35)" }}>PAID</b>
                ) : (
                  <b style={{ color: "red" }}>NOT PAID</b>
                )}
              </p>
              <p>
                Delivery:{" "}
                {String(order?.orderStatus)?.includes("Delivered") ? (
                  <b style={{ color: "rgb(117, 243, 35)" }}>
                    {order?.orderStatus}
                  </b>
                ) : (
                  <b style={{ color: "red" }}>{order?.orderStatus}</b>
                )}
              </p>
            </div>
          )}
        </div>

        <hr />
        <div className="orderData__container__orderItems">
          <h4 className="orderData__container__title">Your Cart Item(s):</h4>
          <hr />
          {order?.orderItems?.map((item) => (
            <div key={item._id || item.product}>
              <div className="orderData__container__orderItems__product">
                <img
                  className="orderData__container__orderItems__product__image"
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100px" }}
                />

                <div className="orderData__container__orderItems__product__data">
                  <Link to={`/product/${item.product}`}>{item?.name}</Link>
                  <div className="orderData__container__orderItems__product__data__cost">
                    <p className="orderData__container__orderItems__product__data__cost__units">
                      {item.quantity} x ₹{amountFormatter(item.price)} =
                      <b className="orderData__container__orderItems__product__data__cost__price">
                        {" "}
                        ₹{amountFormatter(item.quantity * item.price)}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <hr style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </div>

      <div className="orderData__summary">
        <div className="orderData__summary__body">
          <h1 className="orderData__summary__title">Order Summary</h1>
          <hr />
          <div className="orderData__summary__body__info">
            <p className="orderData__summary__body__info__amount">
              Subtotal:
              <b>₹{amountFormatter(order?.totalPrice - order?.taxPrice)}</b>
            </p>
            <p className="orderData__summary__body__info__amount">
              Shipping:
              <b>₹{amountFormatter(order?.shippingPrice)}</b>
            </p>

            <p className="orderData__summary__body__info__amount">
              CGST (5%):
              <b>₹{amountFormatter(order?.taxPrice / 2)}</b>
            </p>
            <p className="orderData__summary__body__info__amount">
              SGST (5%):
              <b>₹{amountFormatter(order?.taxPrice / 2)}</b>
            </p>

            <hr />
            <p className="orderData__summary__body__info__amount">
              Total:
              <b>₹{amountFormatter(order?.totalPrice)}</b>
            </p>
            <hr />
            <FormOptions
              formItem="button"
              text={isConfirmOrder ? "Proceed To Payment" : "Back To Order"}
              setValues={setValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderData;
