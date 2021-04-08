import React from "react";
import CheckOutSteps from "../CheckOutSteps/CheckOutSteps";
import MetaData from "../MetaData";
import "./Payment.style.css";

const Payment = () => {
  return (
    <div className="payment">
      <MetaData title="Payment" />
      <CheckOutSteps payment />
    </div>
  );
};

export default Payment;
