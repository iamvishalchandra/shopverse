import React from "react";
import { Link } from "react-router-dom";
import { amountFormatter } from "../../../helpers/useFullFunctions";
import FormOptions from "../FormOptions/FormOptions";
import "./OrderData.style.css";

const OrderData = ({
  title,
  values,
  item,
  subTotal,
  setValues,
  styleText,
  styleValue,
}) => {
  return (
    <div className="orderData">
      {item ? (
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
      )}
    </div>
  );
};

export default OrderData;
