import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Payment.style.css";
import { clearErrors, createOrder } from "../../actions/orderActions";

const Payment = ({ history }) => {
  const options = {
    style: { fontSize: "16px" },
    invalid: { color: "#9e2146" },
  };
  const alert = useAlert();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, error]);

  const order = { orderItems: cartItems, shippingInfo };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemPrice;
    order.shippingPrice = orderInfo.shippingCharge;
    order.taxPrice = orderInfo.tax;
    order.totalPrice = orderInfo.totalPrice;
  }
  const paymentData = { amount: Math.round(orderInfo.totalPrice * 100) };

  const submitHandle = async (e) => {
    e.preventDefault();
    document.querySelector("#paybtn").disabled = true;
    let res;

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      res = await axios.post("/api/v1/payment/process", paymentData, config);

      const clientSecret = res.data.clientSecret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#paybtn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else alert.error("Unable to process...\nPls try again later");
      }
    } catch (error) {
      document.querySelector("#paybtn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <div className="payment">
      <MetaData title="Payment" />
      <CheckOutSteps shipping confirmOrder payment />
      <div>
        <form onSubmit={submitHandle}>
          <h1>Card Info</h1>
          <div>
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              options={options}
            />
          </div>
          <div>
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              options={options}
            />
          </div>
          <div>
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement type="text" id="card_cvc_field" options={options} />
          </div>
          <button type="submit" id="paybtn">
            Pay {orderInfo?.totalPrice}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
