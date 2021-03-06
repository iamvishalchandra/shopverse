import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import MetaData from "../../reUseable/MetaData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearErrors, createOrder } from "../../../actions/orderActions";
import FormOptions from "../../reUseable/FormOptions/FormOptions";
import "./Payment.style.css";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import { amountFormatter } from "../../../helpers/useFullFunctions";

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
  const [disabled, setDisabled] = useState(false);

  const submitHandle = async (e) => {
    e.preventDefault();
    setDisabled(true);

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
        setDisabled(false);
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
      setDisabled(false);
      alert.error(error.response.data.message);
    }
  };

  return (
    <div className="payment">
      <MetaData title="Payment" />
      <CheckOutSteps shipping confirmOrder payment />
      <div className="payment__container">
        <h1 className="payment__container__title">Card Info</h1>
        <form onSubmit={submitHandle} className="payment__container__form">
          <div className="payment__container__form__details--cardNumber payment__container__form__details">
            <label
              className="payment__container__form__details__label--cardNumber payment__container__form__details__label"
              htmlFor="card_num_field"
            >
              Card Number
            </label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              options={options}
              className="payment__container__form__details__input--cardNumber payment__container__form__details__input"
            />
          </div>
          <div className="payment__container__form__details--cardExpiry payment__container__form__details">
            <label
              className="payment__container__form__details__label--cardExpiry payment__container__form__details__label"
              htmlFor="card_exp_field"
            >
              Card Expiry
            </label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              options={options}
              className="payment__container__form__input__details--cardExpiry payment__container__form__details__input"
            />
          </div>
          <div className="payment__container__form__details--cardCVC payment__container__form__details">
            <label
              className="payment__container__form__details__label--cardCVC payment__container__form__details__label"
              htmlFor="card_cvc_field"
            >
              Card CVC
            </label>
            <CardCvcElement
              className="payment__container__form__details__input--cardCVC payment__container__form__details__input"
              type="text"
              id="card_cvc_field"
              options={options}
            />
          </div>
          <div className="payment__container__form__details__submit">
            <FormOptions
              formItem="button"
              type="submit"
              text={`Pay ???${amountFormatter(orderInfo?.totalPrice)}`}
              setValues={submitHandle}
              disabled={disabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
