import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  amountFormatter,
  dateFormatter,
} from "../../../helpers/useFullFunctions";
import FormOptions from "../FormOptions/FormOptions";
import "./OrderData.style.css";

const OrderData = ({ order, link }) => {
  const history = useHistory();
  return (
    <div className="orderData">
      <h1 className="orderData__orderNo">Order #{order?._id}</h1>
      <div className="orderData__container">
        <div className="orderData__container__info">
          <div className="orderData__container__info__shipping">
            <h4 className="orderData__container__info__title">Shipping Info</h4>
            <p>
              Name: <b>{order?.user?.name}</b>
            </p>
            <p>
              Address:{" "}
              <b>{`${order?.shippingInfo?.address},
            ${order?.shippingInfo?.city},
            ${order?.shippingInfo?.country}`}</b>
            </p>
            <p>
              Pincode: <b>{order?.shippingInfo?.postalCode}</b>
            </p>
            <p>
              Phone: <b>{order?.shippingInfo?.contactNo}</b>
            </p>
          </div>
          <div className="orderData__container__info__payment">
            <h4 className="orderData__container__info__title">Payment Info</h4>
            <p>
              Amount: <b>₹{amountFormatter(order?.totalPrice)}</b>
            </p>
            <p>
              Status:{" "}
              {order?.paymentInfo?.status === "succeeded" ? (
                <b style={{ color: "rgb(117, 243, 35)" }}>PAID</b>
              ) : (
                <b style={{ color: "red" }}>NOT PAID</b>
              )}
            </p>
          </div>
          <div>
            <h4 className="orderData__container__info__title">Order Status</h4>
            <p>
              Order Date: <b>{dateFormatter(order?.createdAt)}</b>
            </p>
            <p>
              Delivery:
              {String(order?.orderStatus)?.includes("Delivered") ? (
                <b style={{ color: "#75f323", fontWeight: "bold" }}>
                  {order?.orderStatus}
                </b>
              ) : (
                <b style={{ color: "red", fontWeight: "bold" }}>
                  {order?.orderStatus}
                </b>
              )}
            </p>
          </div>
        </div>
        <div className="orderData__container__items">
          {order?.orderItems?.map((item) => (
            <>
              <div className="orderData__container__items__body">
                <img
                  className="orderData__container__items__body__image"
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100px" }}
                />

                <div className="orderData__container__items__body__detail">
                  <Link to={`/product/${item.product}`}>{item?.name}</Link>
                  <div className="orderData__container__items__body__cost">
                    <p className="orderData__container__items__body__cost__units">
                      {item.quantity} x ₹{amountFormatter(item.price)} =
                      <b className="orderData__container__items__body__cost__price">
                        {" "}
                        ₹{amountFormatter(item.quantity * item.price)}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormOptions
            setValues={() => history.push(link)}
            formItem="button"
            text="Back To Orders"
          />
        </div>
      </div>

      {/* {item ? (
        <>
          <div className="orderData__cartItems">
            <div className="orderData__cartItems__image">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100px" }}
              />
            </div>
            <div className="orderData__cartItems__name">
              <Link to={`/product/${item.product}`}>
                {item?.name?.substr(0, 20) + "..."}
              </Link>
            </div>
            <div className="orderData__cartItems__cost">
              <p className="orderData__cartItems__cost__units">
                {item.quantity} x ₹{amountFormatter(item.price)}
              </p>
              =
              <b className="orderData__cartItems__cost__price">
                ₹{amountFormatter(item.quantity * item.price)}
              </b>
            </div>
          </div>
          <hr />
        </>
      ) : subTotal ? (
        <div className="orderData__orderTotal">
          <p className="orderData__orderTotal__data">
            Subtotal:
            <span className="orderData__orderTotal__data__span">
              ₹{amountFormatter(subTotal.itemPrice)}
            </span>
          </p>
          <p className="orderData__orderTotal__data">
            Shipping:
            <span className="orderData__orderTotal__data__span">
              ₹{amountFormatter(subTotal.shippingCharge)}
            </span>
          </p>
          <p className="orderData__orderTotal__data">
            GST:
            <span className="orderData__orderTotal__data__span">
              ₹{amountFormatter(subTotal.tax)}
            </span>
          </p>
          <p className="orderData__orderTotal__data">
            CGST (5%):
            <span className="orderData__orderTotal__data__span">
              ₹{amountFormatter(subTotal.tax / 2)}
            </span>
          </p>
          <p className="orderData__orderTotal__data">
            SGST (5%):
            <span className="orderData__orderTotal__data__span">
              ₹{amountFormatter(subTotal.tax / 2)}
            </span>
          </p>

          <hr />
          <p className="orderData__orderTotal__data">
            Total:
            <span className="orderData__orderTotal__data__span">
              ₹{amountFormatter(subTotal.totalPrice)}
            </span>
          </p>
          <hr />
          <FormOptions
            formItem="button"
            text="Proceed To Payment"
            setValues={setValues}
          />
        </div>
      ) : (
        <div className="orderData__shippingAddress">
          <b
            className="orderData__shippingAddress__text"
            style={styleText ? styleText : {}}
          >
            {title}
          </b>
          <p
            className="orderData__shippingAddress__value"
            style={styleValue ? styleValue : {}}
          >
            {values}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default OrderData;
