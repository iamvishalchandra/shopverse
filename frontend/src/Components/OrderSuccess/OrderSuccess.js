import { Link } from "react-router-dom";
import MetaData from "../MetaData";
import "./OrderSuccess.style.css";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <MetaData title={`Order Success`} />
      <div className="orderSuccess__body">
        <img
          src="/photo/orderSuccess.png"
          alt="Order Success"
          className="orderSuccess__body__image"
        />
        <h2 className="orderSuccess__body__message">Order Successfull!</h2>
        <Link to="/orders/me" className="orderSuccess__body__orders">
          Go to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
