import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Payment from "../Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";

const PaymentRoute = ({ history }) => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    const getstripeApiKey = async () => {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    };
    getstripeApiKey();
  }, []);

  return (
    <>
      <h1>Payment</h1>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment history={history} />
        </Elements>
      )}
    </>
  );
};

export default PaymentRoute;
