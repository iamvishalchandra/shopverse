import React from "react";
import { Link } from "react-router-dom";
import "./CheckOutSteps.style.css";

const CheckOutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="checkOutSteps">
      {shipping ? (
        <Link
          to="/shipping"
          className="checkOutSteps__links checkOutSteps__links__shipping"
        >
          <div className="checkOutSteps__links__triangle__back--active"></div>
          <div className="checkOutSteps__links__step checkOutSteps__links__step--active">
            Shipping
          </div>
          <div className="checkOutSteps__links__triangle__front--active"></div>
        </Link>
      ) : (
        <Link disabled>
          <div className="checkOutSteps__links__triangle__back--incomplete"></div>
          <div className="checkOutSteps__links__step checkOutSteps__links__step--incomplete">
            Shipping
          </div>
          <div className="checkOutSteps__links__triangle__front--incomplete"></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link
          to="/confirm"
          className="checkOutSteps__links checkOutSteps__links__confirmOrder"
        >
          <div className="checkOutSteps__links__triangle__back--active"></div>
          <div className="checkOutSteps__links__step checkOutSteps__links__step--active">
            Confirm Order
          </div>
          <div className="checkOutSteps__links__triangle__front--active"></div>
        </Link>
      ) : (
        <Link disabled>
          <div className="checkOutSteps__links__triangle__back--incomplete"></div>
          <div className="checkOutSteps__links__step checkOutSteps__links__step--incomplete">
            Confirm Order
          </div>
          <div className="checkOutSteps__links__triangle__front--incomplete"></div>
        </Link>
      )}

      {payment ? (
        <Link
          to="/payment"
          className="checkOutSteps__links checkOutSteps__links__confirmOrder"
        >
          <div className="checkOutSteps__links__triangle__back--active"></div>
          <div className="checkOutSteps__links__step checkOutSteps__links__step--active">
            Payment
          </div>
          <div className="checkOutSteps__links__triangle__front--active"></div>
        </Link>
      ) : (
        <Link disabled>
          <div className="checkOutSteps__links__triangle__back--incomplete"></div>
          <div className="checkOutSteps__links__step checkOutSteps__links__step--incomplete">
            Payment
          </div>
          <div className="checkOutSteps__links__triangle__front--incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckOutSteps;
